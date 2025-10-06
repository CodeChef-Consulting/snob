import dotenv from '@dotenvx/dotenvx';
dotenv.config();

import snoowrap, { Comment, Submission } from 'snoowrap';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const r = new snoowrap({
  userAgent: process.env.REDDIT_USER_AGENT!,
  clientId: process.env.REDDIT_CLIENT_ID!,
  clientSecret: process.env.REDDIT_CLIENT_SECRET!,
  username: process.env.REDDIT_USERNAME!,
  password: process.env.REDDIT_PASSWORD!,
});

interface MediaFile {
  url: string;
  type: string;
  metadata?: any;
}

function extractMediaUrls(post: Submission): MediaFile[] {
  const mediaFiles: MediaFile[] = [];

  // Handle direct image URLs
  if (post.url && /\.(jpg|jpeg|png|gif|webp)$/i.test(post.url)) {
    mediaFiles.push({
      url: post.url,
      type: 'image',
      metadata: { source: 'post_url' },
    });
  }

  // Handle Reddit video
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

  // Handle preview images
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

function extractMediaFromCommentBody(body: string): MediaFile[] {
  const mediaFiles: MediaFile[] = [];
  const urlRegex = /(https?:\/\/[^\s]+\.(jpg|jpeg|png|gif|webp|mp4|webm))/gi;
  const matches = body.match(urlRegex);

  if (matches) {
    matches.forEach((url) => {
      const type = /\.(mp4|webm)$/i.test(url) ? 'video' : 'image';
      mediaFiles.push({
        url,
        type,
        metadata: { source: 'comment_body' },
      });
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

async function fetchComments(options: FetchOptions = {}) {
  const {
    subredditName = 'FoodLosAngeles',
    mode = 'new',
    searchQuery = '',
    timeframe = 'all',
  } = options;

  // Only 'new' mode doesn't use timeframe
  const effectiveTimeframe = mode === 'new' ? null : timeframe;

  // Check if we already have a completed session for this exact query
  const existingSession = await prisma.scrapingSession.findFirst({
    where: {
      subreddit: subredditName,
      mode,
      timeframe: effectiveTimeframe,
      searchQuery: mode === 'search' ? searchQuery : null,
      completed: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  if (existingSession) {
    const timeframeLabel = effectiveTimeframe ? ` (${effectiveTimeframe})` : '';
    console.log(`✅ Already scraped ${mode}${timeframeLabel} posts${mode === 'search' ? ` for "${searchQuery}"` : ''}`);
    console.log(`   Last run: ${existingSession.createdAt.toISOString()}`);
    console.log(`   Posts: ${existingSession.postsScraped}, Comments: ${existingSession.commentsScraped}`);
    console.log(`\n   Skipping to avoid duplicate API calls. Delete this session to re-scrape.\n`);
    return;
  }

  // Create new session
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
  let commentsUpdated = 0;

  // Fetch up to 1000 posts using pagination
  let allPosts: Submission[] = [];
  let after: string | undefined = undefined;
  const batchSize = 100;
  const maxPosts = 1000;

  const modeLabel = mode === 'search' ? `search "${searchQuery}"` : mode;
  console.log(`Fetching posts (mode: ${modeLabel}, timeframe: ${timeframe})...`);

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
          posts = await subreddit.getControversial({ ...options, time: timeframe });
          break;
        case 'search':
          if (!searchQuery) {
            throw new Error('searchQuery is required for search mode');
          }
          posts = await subreddit.search({
            query: searchQuery,
            ...options,
            time: timeframe,
            sort: 'relevance'
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

    // @ts-ignore - accessing internal property for pagination
    after = posts._query.after;
    if (!after) {
      break;
    }

    // Small delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  console.log(`\nProcessing ${allPosts.length} posts with comments...\n`);

  for (const post of allPosts) {
    const postCreatedAt = new Date(post.created_utc * 1000);

    // Track latest post
    if (!latestPostTimestamp || postCreatedAt > latestPostTimestamp) {
      latestPostId = post.id;
      latestPostTimestamp = postCreatedAt;
    }

    // Upsert post with current data
    const dbPost = await prisma.post.upsert({
      where: { externalId: post.id },
      update: {
        title: post.title,
        body: post.selftext || null,
        score: post.score,
        upvoteRatio: post.upvote_ratio,
        numComments: post.num_comments,
        url: post.url,
        author: post.author.name,
        subreddit: subredditName,
        createdUtc: postCreatedAt,
        updatedAt: new Date(),
      },
      create: {
        externalId: post.id,
        title: post.title,
        body: post.selftext || null,
        score: post.score,
        upvoteRatio: post.upvote_ratio,
        numComments: post.num_comments,
        url: post.url,
        author: post.author.name,
        subreddit: subredditName,
        createdUtc: postCreatedAt,
      },
    });
    postsUpdated++;

    // Update post media
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

    // Fetch and update all comments
    //@ts-ignore
    const comments = await post.expandReplies({ limit: 1000, depth: 1 });

    for (const comment of comments.comments as Comment[]) {
      let parentDbCommentId: number | null = null;
      if (comment.parent_id.startsWith('t1_')) {
        const parentExternalId = comment.parent_id.replace('t1_', '');
        const parentComment = await prisma.comment.findUnique({
          where: { externalId: parentExternalId },
          select: { id: true },
        });
        parentDbCommentId = parentComment?.id || null;
      }

      const dbComment = await prisma.comment.upsert({
        where: { externalId: comment.id },
        update: {
          body: comment.body,
          score: comment.score,
          author: comment.author.name,
          createdUtc: new Date(comment.created_utc * 1000),
          updatedAt: new Date(),
        },
        create: {
          externalId: comment.id,
          postId: dbPost.id,
          parentCommentId: parentDbCommentId,
          body: comment.body,
          score: comment.score,
          author: comment.author.name,
          createdUtc: new Date(comment.created_utc * 1000),
        },
      });
      commentsUpdated++;

      const commentMediaUrls = extractMediaFromCommentBody(comment.body);
      for (const media of commentMediaUrls) {
        await prisma.file.upsert({
          where: {
            commentId_fileUrl: {
              commentId: dbComment.id,
              fileUrl: media.url,
            },
          },
          update: {
            fileType: media.type,
            metadata: media.metadata,
          },
          create: {
            commentId: dbComment.id,
            fileUrl: media.url,
            fileType: media.type,
            metadata: media.metadata,
          },
        });
      }
    }

    console.log(
      `[${postsUpdated}/${allPosts.length}] Post ${post.id} (${postCreatedAt.toISOString()}): ${comments.comments.length} comments`
    );
  }

  // Mark session as completed
  await prisma.scrapingSession.update({
    where: { id: session.id },
    data: {
      lastPostId: latestPostId,
      lastPostTimestamp: latestPostTimestamp,
      postsScraped: postsUpdated,
      commentsScraped: commentsUpdated,
      completed: true,
    },
  });

  console.log(
    `\n✅ Completed: ${postsUpdated} posts, ${commentsUpdated} comments (last: ${latestPostId})`
  );
}

// Parse CLI arguments
const args = process.argv.slice(2);
const mode = (args[0] || 'new') as FetchMode;
const searchQuery = args[1] || '';
const timeframe = (args[2] || 'all') as FetchOptions['timeframe'];

fetchComments({
  mode,
  searchQuery: mode === 'search' ? searchQuery : undefined,
  timeframe,
})
  .catch(console.error)
  .finally(() => prisma.$disconnect());
