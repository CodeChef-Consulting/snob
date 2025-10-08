import dotenv from '@dotenvx/dotenvx';
dotenv.config();

import { Submission } from 'snoowrap';
import { PrismaClient } from '@prisma/client';
import { createRedditClient, extractMediaUrls } from '../utils/reddit';

const prisma = new PrismaClient();
const r = createRedditClient();

type FetchMode = 'new' | 'top' | 'controversial' | 'search';

interface FetchOptions {
  subredditName?: string;
  mode?: FetchMode;
  searchQuery?: string;
  timeframe?: 'hour' | 'day' | 'week' | 'month' | 'year' | 'all';
}

async function fetchPosts(options: FetchOptions = {}) {
  const {
    subredditName = 'FoodLosAngeles',
    mode = 'new',
    searchQuery = '',
    timeframe = 'all',
  } = options;

  const effectiveTimeframe = mode === 'new' ? null : timeframe;

  // Only check for sessions created after 2025-01-07 (schema change date)
  const schemaChangeDate = new Date('2025-01-07T00:00:00Z');
  const existingSession = await prisma.scrapingSession.findFirst({
    where: {
      subreddit: subredditName,
      mode,
      timeframe: effectiveTimeframe,
      searchQuery: mode === 'search' ? searchQuery : null,
      completed: true,
      createdAt: {
        gte: schemaChangeDate,
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  if (existingSession) {
    const timeframeLabel = effectiveTimeframe ? ` (${effectiveTimeframe})` : '';
    console.log(
      `✅ Already scraped ${mode}${timeframeLabel} posts${mode === 'search' ? ` for "${searchQuery}"` : ''}`
    );
    console.log(`   Last run: ${existingSession.createdAt.toISOString()}`);
    console.log(`   Posts: ${existingSession.postsScraped}`);
    console.log(
      `\n   Skipping to avoid duplicate API calls. Delete this session to re-scrape.\n`
    );
    return;
  }

  const session = await prisma.scrapingSession.create({
    data: {
      subreddit: subredditName,
      mode,
      timeframe: effectiveTimeframe,
      searchQuery: mode === 'search' ? searchQuery : null,
    },
  });

  let latestPostId: string | null = null;
  let latestPostTimestamp: Date | null = null;
  let postsUpdated = 0;

  let allPosts: Submission[] = [];
  let after: string | undefined = undefined;
  const batchSize = 100;
  const maxPosts = 1000;

  const modeLabel = mode === 'search' ? `search "${searchQuery}"` : mode;
  console.log(
    `Fetching posts (mode: ${modeLabel}, timeframe: ${timeframe})...`
  );

  while (allPosts.length < maxPosts) {
    const options: any = { limit: batchSize };
    if (after) {
      options.after = after;
    }

    let posts: Submission[] = [];
    const subreddit = r.getSubreddit(subredditName);

    try {
      switch (mode) {
        case 'new':
          posts = await subreddit.getNew(options);
          break;
        case 'top':
          posts = await subreddit.getTop({ ...options, time: timeframe });
          break;
        case 'controversial':
          posts = await subreddit.getControversial({
            ...options,
            time: timeframe,
          });
          break;
        case 'search':
          if (!searchQuery) {
            throw new Error('searchQuery is required for search mode');
          }
          posts = await subreddit.search({
            query: searchQuery,
            ...options,
            time: timeframe,
            sort: 'relevance',
          });
          break;
      }
    } catch (error) {
      console.error(`Error fetching posts:`, error);
      break;
    }

    if (posts.length === 0) {
      console.log('No more posts available');
      break;
    }

    allPosts = allPosts.concat(posts);
    console.log(`Fetched ${posts.length} posts (total: ${allPosts.length})`);

    if (posts.length < batchSize) {
      break;
    }

    // @ts-ignore
    after = posts._query.after;
    if (!after) {
      break;
    }

    // Reduced delay between API batches
    await new Promise((resolve) => setTimeout(resolve, 200));
  }

  console.log(`\nProcessing ${allPosts.length} posts (metadata only)...\n`);

  // Check which posts already exist in DB (1 query for all posts)
  const externalIds = allPosts.map((p) => p.id as string);
  const existingPosts = await prisma.post.findMany({
    where: { externalId: { in: externalIds } },
    select: { externalId: true, id: true },
  });

  const existingExternalIds = new Set(existingPosts.map((p) => p.externalId));
  const existingPostMap = new Map(
    existingPosts.map((p) => [p.externalId, p.id])
  );

  // Separate posts into new and existing
  const newPosts = [];
  const existingPostUpdates = [];

  for (const post of allPosts) {
    const postCreatedAt = new Date((post.created_utc as number) * 1000);

    if (!latestPostTimestamp || postCreatedAt > latestPostTimestamp) {
      latestPostId = post.id as string;
      latestPostTimestamp = postCreatedAt;
    }

    const postData = {
      externalId: post.id as string,
      title: post.title as string,
      body: (post.selftext as string) || null,
      score: post.score as number,
      ups: post.ups as number,
      downs: post.downs as number,
      upvoteRatio: post.upvote_ratio as number,
      numComments: post.num_comments as number,
      gilded: post.gilded as number,
      permalink: post.permalink as string,
      author: post.author.name as string,
      subreddit: subredditName,
      createdUtc: postCreatedAt,
      scrapingSessionId: session.id,
      commentsFullyScraped: false,
    };

    if (existingExternalIds.has(post.id as string)) {
      existingPostUpdates.push(postData);
    } else {
      newPosts.push(postData);
    }
  }

  // Batch create new posts (single query!)
  if (newPosts.length > 0) {
    console.log(`Creating ${newPosts.length} new posts...`);
    await prisma.post.createMany({
      data: newPosts,
      skipDuplicates: true,
    });
  }

  // Batch update existing posts (much faster than individual upserts)
  if (existingPostUpdates.length > 0) {
    console.log(`Updating ${existingPostUpdates.length} existing posts...`);
    // Update in batches since updateMany doesn't support per-record data
    for (const postData of existingPostUpdates) {
      await prisma.post.update({
        where: { externalId: postData.externalId },
        data: {
          title: postData.title,
          body: postData.body,
          score: postData.score,
          ups: postData.ups,
          downs: postData.downs,
          upvoteRatio: postData.upvoteRatio,
          numComments: postData.numComments,
          gilded: postData.gilded,
          permalink: postData.permalink,
          author: postData.author,
          subreddit: postData.subreddit,
          createdUtc: postData.createdUtc,
          scrapingSessionId: postData.scrapingSessionId,
          commentsFullyScraped: postData.commentsFullyScraped,
          updatedAt: new Date(),
        },
      });
    }
  }

  postsUpdated = allPosts.length;

  // Fetch all post IDs for media file association
  const allDbPosts = await prisma.post.findMany({
    where: { externalId: { in: externalIds } },
    select: { id: true, externalId: true },
  });

  const postIdMap = new Map(allDbPosts.map((p) => [p.externalId, p.id]));

  // Process media files in batches
  console.log(`Processing media files...`);
  const mediaUpserts = [];
  for (const post of allPosts) {
    const dbPostId = postIdMap.get(post.id as string);
    if (!dbPostId) continue;

    const postMediaUrls = extractMediaUrls(post);
    for (const media of postMediaUrls) {
      mediaUpserts.push(
        prisma.file.upsert({
          where: {
            postId_fileUrl: {
              postId: dbPostId,
              fileUrl: media.url,
            },
          },
          update: {
            fileType: media.type,
            metadata: media.metadata,
          },
          create: {
            postId: dbPostId,
            fileUrl: media.url,
            fileType: media.type,
            metadata: media.metadata,
          },
        })
      );
    }
  }

  if (mediaUpserts.length > 0) {
    await Promise.all(mediaUpserts);
  }

  console.log(
    `✅ Processed ${postsUpdated} posts (${newPosts.length} new, ${existingPostUpdates.length} updated)`
  );

  await prisma.scrapingSession.update({
    where: { id: session.id },
    data: {
      lastPostId: latestPostId,
      lastPostTimestamp: latestPostTimestamp,
      postsScraped: postsUpdated,
      completed: true,
    },
  });

  console.log(
    `\n✅ Completed: ${postsUpdated} posts scraped (comments marked for later scraping)`
  );
}

const args = process.argv.slice(2);
const mode = (args[0] || 'new') as FetchMode;
const searchQuery = args[1] || '';
const timeframe = (args[2] || 'all') as FetchOptions['timeframe'];

fetchPosts({
  mode,
  searchQuery: mode === 'search' ? searchQuery : undefined,
  timeframe,
})
  .catch(console.error)
  .finally(() => prisma.$disconnect());
