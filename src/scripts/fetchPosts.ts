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
  let totalPostsProcessed = 0;
  let totalNewPosts = 0;
  let totalUpdatedPosts = 0;

  let after: string | undefined = undefined;
  const batchSize = 100;
  const maxPosts = 1000;

  const modeLabel = mode === 'search' ? `search "${searchQuery}"` : mode;
  console.log(
    `Fetching posts (mode: ${modeLabel}, timeframe: ${timeframe})...`
  );

  while (totalPostsProcessed < maxPosts) {
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

    console.log(`\nFetched ${posts.length} posts, processing batch...`);

    // Process this batch immediately
    const externalIds = posts.map((p) => p.id as string);
    const existingPosts = await prisma.post.findMany({
      where: { externalId: { in: externalIds } },
      select: { externalId: true, id: true },
    });

    const existingExternalIds = new Set(
      existingPosts.map((p) => p.externalId)
    );

    // Separate posts into new and existing
    const newPosts = [];
    const existingPostUpdates = [];

    for (const post of posts) {
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

    // Batch create new posts
    if (newPosts.length > 0) {
      await prisma.post.createMany({
        data: newPosts,
        skipDuplicates: true,
      });
      totalNewPosts += newPosts.length;
    }

    // Batch update existing posts
    if (existingPostUpdates.length > 0) {
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
      totalUpdatedPosts += existingPostUpdates.length;
    }

    // Fetch post IDs for this batch
    const batchDbPosts = await prisma.post.findMany({
      where: { externalId: { in: externalIds } },
      select: { id: true, externalId: true },
    });

    const postIdMap = new Map(
      batchDbPosts.map((p) => [p.externalId, p.id])
    );

    // Process media files for this batch
    // First, collect all media file data
    const allMediaFiles: Array<{
      postId: number;
      fileUrl: string;
      fileType: string;
      metadata: any;
    }> = [];

    for (const post of posts) {
      const dbPostId = postIdMap.get(post.id as string);
      if (!dbPostId) continue;

      const postMediaUrls = extractMediaUrls(post);
      for (const media of postMediaUrls) {
        allMediaFiles.push({
          postId: dbPostId,
          fileUrl: media.url,
          fileType: media.type,
          metadata: media.metadata,
        });
      }
    }

    // Check which media files already exist
    if (allMediaFiles.length > 0) {
      const mediaFileKeys = allMediaFiles.map((m) => ({
        postId: m.postId,
        fileUrl: m.fileUrl,
      }));

      const existingMediaFiles = await prisma.file.findMany({
        where: {
          OR: mediaFileKeys,
        },
        select: { postId: true, fileUrl: true },
      });

      const existingMediaSet = new Set(
        existingMediaFiles.map((m) => `${m.postId}:${m.fileUrl}`)
      );

      const newMediaFiles = [];
      const existingMediaUpdates = [];

      for (const media of allMediaFiles) {
        const key = `${media.postId}:${media.fileUrl}`;
        if (existingMediaSet.has(key)) {
          existingMediaUpdates.push(media);
        } else {
          newMediaFiles.push(media);
        }
      }

      // Batch create new media files
      if (newMediaFiles.length > 0) {
        await prisma.file.createMany({
          data: newMediaFiles,
          skipDuplicates: true,
        });
      }

      // Batch update existing media files
      if (existingMediaUpdates.length > 0) {
        await Promise.all(
          existingMediaUpdates.map((media) =>
            prisma.file.update({
              where: {
                postId_fileUrl: {
                  postId: media.postId,
                  fileUrl: media.fileUrl,
                },
              },
              data: {
                fileType: media.fileType,
                metadata: media.metadata,
              },
            })
          )
        );
      }
    }

    totalPostsProcessed += posts.length;
    console.log(
      `✅ Batch complete: ${newPosts.length} new, ${existingPostUpdates.length} updated, ${allMediaFiles.length} media files (total: ${totalPostsProcessed})`
    );

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

  console.log(
    `\n✅ Processed ${totalPostsProcessed} posts (${totalNewPosts} new, ${totalUpdatedPosts} updated)`
  );

  await prisma.scrapingSession.update({
    where: { id: session.id },
    data: {
      lastPostId: latestPostId,
      lastPostTimestamp: latestPostTimestamp,
      postsScraped: totalPostsProcessed,
      completed: true,
    },
  });

  console.log(
    `\n✅ Completed: ${totalPostsProcessed} posts scraped (comments marked for later scraping)`
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
