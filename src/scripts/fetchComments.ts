import dotenv from '@dotenvx/dotenvx';
dotenv.config();

import { Comment, Submission } from 'snoowrap';
import { PrismaClient } from '@prisma/client';
import {
  createRedditClient,
  extractMediaUrls,
  extractMediaFromCommentBody,
} from '../utils/reddit';

const prisma = new PrismaClient();
const r = createRedditClient();

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
    const postCreatedAt = new Date((post.created_utc as number) * 1000);

    // Track latest post
    if (!latestPostTimestamp || postCreatedAt > latestPostTimestamp) {
      latestPostId = post.id as string;
      latestPostTimestamp = postCreatedAt;
    }

    // Upsert post with current data and mark comments as scraped
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
        commentsLastScrapedAt: new Date(),
        commentsFullyScraped: true,
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
        commentsLastScrapedAt: new Date(),
        commentsFullyScraped: true,
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

    // Fetch top-level comments first (1 API call per post)
    const topLevelComments = await post.comments.fetchAll();

    // Recursively process all comments and their nested replies
    async function processComment(comment: Comment) {
      let parentDbCommentId: number | null = null;
      const parentId = comment.parent_id as string;
      if (parentId.startsWith('t1_')) {
        const parentExternalId = parentId.replace('t1_', '');
        const parentComment = await prisma.comment.findUnique({
          where: { externalId: parentExternalId },
          select: { id: true },
        });
        parentDbCommentId = parentComment?.id || null;
      }

      const dbComment = await prisma.comment.upsert({
        where: { externalId: comment.id as string },
        update: {
          body: (comment.body as string) || '',
          score: comment.score as number,
          ups: comment.ups as number,
          depth: comment.depth as number,
          controversiality: comment.controversiality as number,
          isSubmitter: comment.is_submitter as boolean,
          scoreHidden: comment.score_hidden as boolean,
          permalink: comment.permalink as string,
          author: comment.author.name as string,
          createdUtc: new Date((comment.created_utc as number) * 1000),
          scrapingSessionId: session.id,
          updatedAt: new Date(),
        },
        create: {
          externalId: comment.id as string,
          postId: dbPost.id,
          parentCommentId: parentDbCommentId,
          body: (comment.body as string) || '',
          score: comment.score as number,
          ups: comment.ups as number,
          depth: comment.depth as number,
          controversiality: comment.controversiality as number,
          isSubmitter: comment.is_submitter as boolean,
          scoreHidden: comment.score_hidden as boolean,
          permalink: comment.permalink as string,
          author: comment.author.name as string,
          createdUtc: new Date((comment.created_utc as number) * 1000),
          scrapingSessionId: session.id,
        },
      });
      commentsUpdated++;

      const commentMediaUrls = extractMediaFromCommentBody(
        comment.body as string
      );
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

      // Fetch and process nested replies if they exist
      if (comment.replies && comment.replies.length > 0) {
        // Expand replies for this comment thread
        const expandedReplies = await comment.replies.fetchAll();
        for (const reply of expandedReplies as Comment[]) {
          await processComment(reply);
        }
      }
    }

    // Process all top-level comments and their nested replies
    for (const comment of topLevelComments as Comment[]) {
      await processComment(comment);
    }

    console.log(
      `[${postsUpdated}/${allPosts.length}] Post ${post.id} (${postCreatedAt.toISOString()}): ${commentsUpdated} total comments processed`
    );

    // Update session progress after each post completes
    await prisma.scrapingSession.update({
      where: { id: session.id },
      data: {
        lastPostId: post.id as string,
        lastPostTimestamp: postCreatedAt,
        postsScraped: postsUpdated,
        commentsScraped: commentsUpdated,
      },
    });

    // Add delay to avoid rate limiting (2 seconds between posts)
    if (postsUpdated < allPosts.length) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  // Mark session as completed (all posts scraped)
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
