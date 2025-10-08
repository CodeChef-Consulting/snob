import dotenv from '@dotenvx/dotenvx';
dotenv.config();

import snoowrap, { Submission } from 'snoowrap';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const r = new snoowrap({
  userAgent: process.env.REDDIT_USER_AGENT!,
  clientId: process.env.REDDIT_CLIENT_ID!,
  clientSecret: process.env.REDDIT_CLIENT_SECRET!,
  username: process.env.REDDIT_USERNAME!,
  password: process.env.REDDIT_PASSWORD!,
});

r.config({ requestDelay: 100, continueAfterRatelimitError: false });

interface MediaFile {
  url: string;
  type: string;
  metadata?: any;
}

function extractMediaUrls(post: Submission): MediaFile[] {
  const mediaFiles: MediaFile[] = [];

  if (post.url && /\.(jpg|jpeg|png|gif|webp)$/i.test(post.url)) {
    mediaFiles.push({
      url: post.url,
      type: 'image',
      metadata: { source: 'post_url' },
    });
  }

  if (post.is_video && post.media?.reddit_video?.fallback_url) {
    mediaFiles.push({
      url: post.media.reddit_video.fallback_url,
      type: 'video',
      metadata: {
        source: 'reddit_video',
        duration: post.media.reddit_video.duration,
        is_gif: post.media.reddit_video.is_gif,
      },
    });
  }

  if (post.preview?.images) {
    post.preview.images.forEach((image) => {
      if (image.source?.url) {
        const url = image.source.url.replace(/&amp;/g, '&');
        if (!mediaFiles.some((f) => f.url === url)) {
          mediaFiles.push({
            url,
            type: 'image',
            metadata: {
              source: 'preview',
              width: image.source.width,
              height: image.source.height,
            },
          });
        }
      }
    });
  }

  return mediaFiles;
}

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

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  console.log(`\nProcessing ${allPosts.length} posts (metadata only)...\n`);

  for (const post of allPosts) {
    const postCreatedAt = new Date((post.created_utc as number) * 1000);

    if (!latestPostTimestamp || postCreatedAt > latestPostTimestamp) {
      latestPostId = post.id as string;
      latestPostTimestamp = postCreatedAt;
    }

    const dbPost = await prisma.post.upsert({
      where: { externalId: post.id as string },
      update: {
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
        updatedAt: new Date(),
      },
      create: {
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
      },
    });
    postsUpdated++;

    const postMediaUrls = extractMediaUrls(post);
    for (const media of postMediaUrls) {
      await prisma.file.upsert({
        where: {
          postId_fileUrl: {
            postId: dbPost.id,
            fileUrl: media.url,
          },
        },
        update: {
          fileType: media.type,
          metadata: media.metadata,
        },
        create: {
          postId: dbPost.id,
          fileUrl: media.url,
          fileType: media.type,
          metadata: media.metadata,
        },
      });
    }

    console.log(
      `[${postsUpdated}/${allPosts.length}] Post ${post.id} (${postCreatedAt.toISOString()}): ${post.num_comments} comments to scrape later`
    );

    await prisma.scrapingSession.update({
      where: { id: session.id },
      data: {
        lastPostId: post.id as string,
        lastPostTimestamp: postCreatedAt,
        postsScraped: postsUpdated,
      },
    });

    if (postsUpdated < allPosts.length) {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }

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
