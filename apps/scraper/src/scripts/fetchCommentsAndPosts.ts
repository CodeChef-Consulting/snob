import { config } from '@dotenvx/dotenvx';
config({ path: ['../../.env'] });

import { Comment, Submission } from 'snoowrap';
import { PrismaClient } from '@repo/db';
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
  createOnly?: boolean;
}

async function fetchComments(options: FetchOptions = {}) {
  const {
    subredditName = 'FoodLosAngeles',
    mode = 'new',
    searchQuery = '',
    timeframe = 'all',
    createOnly = false,
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

  if (existingSession && existingSession.mode !== 'new') {
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
  const maxPosts = mode === 'new' ? 1000 : 1000;

  const modeLabel = mode === 'search' ? `search "${searchQuery}"` : mode;
  const createOnlyLabel = createOnly ? ' [CREATE ONLY - skipping updates]' : '';
  console.log(
    `Fetching posts (mode: ${modeLabel}, timeframe: ${timeframe})${createOnlyLabel}...`
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

  // If createOnly mode, fetch all existing post IDs upfront for fast lookup
  let existingPostIds = new Set<string>();
  if (createOnly) {
    const postExternalIds = allPosts.map((p) => p.id as string);
    const existingPosts = await prisma.post.findMany({
      where: { externalId: { in: postExternalIds } },
      select: { externalId: true },
    });
    existingPostIds = new Set(existingPosts.map((p) => p.externalId));
    console.log(
      `Found ${existingPostIds.size} existing posts (will skip in createOnly mode)\n`
    );
  }

  for (const post of allPosts) {
    const postCreatedAt = new Date((post.created_utc as number) * 1000);

    // Track latest post
    if (!latestPostTimestamp || postCreatedAt > latestPostTimestamp) {
      latestPostId = post.id as string;
      latestPostTimestamp = postCreatedAt;
    }

    // If createOnly mode, skip posts that already exist
    if (createOnly && existingPostIds.has(post.id as string)) {
      console.log(
        `[${postsUpdated + 1}/${allPosts.length}] Post ${post.id} already exists, skipping (createOnly mode)`
      );
      continue;
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

    // Update post media - batch operations
    const postMediaUrls = extractMediaUrls(post);
    if (postMediaUrls.length > 0) {
      const existingPostMedia = await prisma.file.findMany({
        where: {
          postId: dbPost.id,
          fileUrl: { in: postMediaUrls.map((m) => m.url) },
        },
        select: { fileUrl: true },
      });

      const existingPostMediaUrls = new Set(
        existingPostMedia.map((m) => m.fileUrl)
      );

      const newPostMedia = postMediaUrls
        .filter((m) => !existingPostMediaUrls.has(m.url))
        .map((m) => ({
          postId: dbPost.id,
          fileUrl: m.url,
          fileType: m.type,
          metadata: m.metadata,
        }));

      const existingPostMediaUpdates = postMediaUrls
        .filter((m) => existingPostMediaUrls.has(m.url))
        .map((m) => ({
          postId: dbPost.id,
          fileUrl: m.url,
          fileType: m.type,
          metadata: m.metadata,
        }));

      if (newPostMedia.length > 0) {
        await prisma.file.createMany({
          data: newPostMedia,
          skipDuplicates: true,
        });
      }

      if (existingPostMediaUpdates.length > 0) {
        await Promise.all(
          existingPostMediaUpdates.map((media) =>
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

    // Fetch top-level comments first (1 API call per post)
    const topLevelComments = await post.comments.fetchAll();

    // Collect all comments first (breadth-first traversal)
    const allComments: Comment[] = [];
    const collectComments = async (comment: Comment) => {
      allComments.push(comment);
      if (comment.replies && comment.replies.length > 0) {
        const expandedReplies = await comment.replies.fetchAll();
        for (const reply of expandedReplies as Comment[]) {
          await collectComments(reply);
        }
      }
    };

    for (const comment of topLevelComments as Comment[]) {
      await collectComments(comment);
    }

    // Check which comments already exist (1 query)
    const commentExternalIds = allComments.map((c) => c.id as string);
    const existingComments = await prisma.comment.findMany({
      where: { externalId: { in: commentExternalIds } },
      select: { externalId: true, id: true },
    });

    const existingExternalIds = new Set(
      existingComments.map((c) => c.externalId)
    );

    // Separate new vs existing comments
    const newComments = [];
    const existingCommentUpdates = [];

    for (const comment of allComments) {
      // Find parent comment ID if exists
      let parentDbCommentId: number | null = null;
      const parentId = comment.parent_id as string;
      if (parentId.startsWith('t1_')) {
        const parentExternalId = parentId.replace('t1_', '');
        const parentComment = existingComments.find(
          (c) => c.externalId === parentExternalId
        );
        parentDbCommentId = parentComment?.id || null;
      }

      const commentData = {
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
      };

      if (existingExternalIds.has(comment.id as string)) {
        existingCommentUpdates.push(commentData);
      } else {
        newComments.push(commentData);
      }
    }

    // Batch create new comments (single query!)
    if (newComments.length > 0) {
      await prisma.comment.createMany({
        data: newComments,
        skipDuplicates: true,
      });
    }

    // Batch update existing comments (parallel execution)
    if (existingCommentUpdates.length > 0) {
      await Promise.all(
        existingCommentUpdates.map((commentData) =>
          prisma.comment.update({
            where: { externalId: commentData.externalId },
            data: {
              body: commentData.body,
              score: commentData.score,
              ups: commentData.ups,
              depth: commentData.depth,
              controversiality: commentData.controversiality,
              isSubmitter: commentData.isSubmitter,
              scoreHidden: commentData.scoreHidden,
              permalink: commentData.permalink,
              author: commentData.author,
              createdUtc: commentData.createdUtc,
              scrapingSessionId: commentData.scrapingSessionId,
              updatedAt: new Date(),
            },
          })
        )
      );
    }

    commentsUpdated += allComments.length;

    // Fetch all comment IDs for media file association
    const allDbComments = await prisma.comment.findMany({
      where: { externalId: { in: commentExternalIds } },
      select: { id: true, externalId: true },
    });

    const commentIdMap = new Map(
      allDbComments.map((c) => [c.externalId, c.id])
    );

    // Process media files - collect all media first
    const allMediaFiles: Array<{
      commentId: number;
      fileUrl: string;
      fileType: string;
      metadata: any;
    }> = [];

    for (const comment of allComments) {
      const dbCommentId = commentIdMap.get(comment.id as string);
      if (!dbCommentId) continue;

      const commentMediaUrls = extractMediaFromCommentBody(
        comment.body as string
      );
      for (const media of commentMediaUrls) {
        allMediaFiles.push({
          commentId: dbCommentId,
          fileUrl: media.url,
          fileType: media.type,
          metadata: media.metadata,
        });
      }
    }

    // Check which media files already exist
    if (allMediaFiles.length > 0) {
      const mediaFileKeys = allMediaFiles.map((m) => ({
        commentId: m.commentId,
        fileUrl: m.fileUrl,
      }));

      const existingMediaFiles = await prisma.file.findMany({
        where: {
          OR: mediaFileKeys,
        },
        select: { commentId: true, fileUrl: true },
      });

      const existingMediaSet = new Set(
        existingMediaFiles.map((m) => `${m.commentId}:${m.fileUrl}`)
      );

      const newMediaFiles = [];
      const existingMediaUpdates = [];

      for (const media of allMediaFiles) {
        const key = `${media.commentId}:${media.fileUrl}`;
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
                commentId_fileUrl: {
                  commentId: media.commentId,
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

    console.log(
      `[${postsUpdated}/${allPosts.length}] Post ${post.id} (${postCreatedAt.toISOString()}): ${allComments.length} comments processed`
    );

    // Update session progress after each post completes
    await prisma.scrapingSession.update({
      where: { id: session.id },
      data: {
        lastPostId: post.id as string,
        lastPostTimestamp: postCreatedAt,
        postsScraped: postsUpdated,
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
const createOnly = args[3] === 'true';

fetchComments({
  mode,
  searchQuery: mode === 'search' ? searchQuery : undefined,
  timeframe,
  createOnly,
})
  .catch(console.error)
  .finally(() => prisma.$disconnect());
