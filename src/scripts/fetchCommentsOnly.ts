import dotenv from '@dotenvx/dotenvx';
dotenv.config();

import { Comment } from 'snoowrap';
import { PrismaClient } from '@prisma/client';
import {
  createRedditClient,
  extractMediaFromCommentBody,
} from '../utils/reddit';

const prisma = new PrismaClient();
const r = createRedditClient();

interface FetchOptions {
  subredditName?: string;
  batchSize?: number;
  scrapingSessionId?: number;
}

async function fetchCommentsOnly(options: FetchOptions = {}) {
  const {
    subredditName = 'FoodLosAngeles',
    batchSize = 10,
    scrapingSessionId,
  } = options;

  // Find posts that need comment scraping
  const postsNeedingComments = await prisma.post.findMany({
    where: {
      commentsFullyScraped: false,
      ...(subredditName && { subreddit: subredditName }),
      ...(scrapingSessionId && { scrapingSessionId }),
    },
    orderBy: { createdUtc: 'desc' },
    take: batchSize,
  });

  if (postsNeedingComments.length === 0) {
    console.log(
      `✅ No posts found that need comment scraping${subredditName ? ` in r/${subredditName}` : ''}`
    );
    return;
  }

  console.log(
    `\nFetching comments for ${postsNeedingComments.length} posts...\n`
  );

  let totalCommentsScraped = 0;
  let postsCompleted = 0;

  for (const dbPost of postsNeedingComments) {
    console.log(
      `\n[${postsCompleted + 1}/${postsNeedingComments.length}] Processing post: ${dbPost.externalId}`
    );
    console.log(`   Title: ${dbPost.title}`);
    console.log(`   Expected comments: ${dbPost.numComments}`);

    let postCommentsScraped = 0;

    try {
      const submission = await r.getSubmission(dbPost.externalId);
      const topLevelComments = await submission.comments.fetchAll();

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

      console.log(`   Collected ${allComments.length} comments, processing in batches...`);

      // Check which comments already exist (1 query)
      const commentExternalIds = allComments.map((c) => c.id as string);
      const existingComments = await prisma.comment.findMany({
        where: { externalId: { in: commentExternalIds } },
        select: { externalId: true, id: true },
      });

      const existingExternalIds = new Set(existingComments.map((c) => c.externalId));

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
          scrapingSessionId: dbPost.scrapingSessionId,
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
        console.log(`   Created ${newComments.length} new comments`);
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
        console.log(`   Updated ${existingCommentUpdates.length} existing comments`);
      }

      postCommentsScraped = allComments.length;
      totalCommentsScraped += allComments.length;

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

      await prisma.post.update({
        where: { id: dbPost.id },
        data: {
          commentsLastScrapedAt: new Date(),
          commentsFullyScraped: true,
        },
      });

      postsCompleted++;
      console.log(
        `   ✅ Scraped ${postCommentsScraped} comments (total: ${totalCommentsScraped})`
      );

      // Note: fetchCommentsOnly doesn't update ScrapingSession
      // ScrapingSession only tracks post scraping
      // Comment progress is tracked via Post.commentsFullyScraped
    } catch (error) {
      console.error(`   ❌ Error processing post ${dbPost.externalId}:`, error);
      continue;
    }
  }

  console.log(
    `\n✅ Completed: ${postsCompleted} posts, ${totalCommentsScraped} comments scraped`
  );
}

const args = process.argv.slice(2);
const subredditName = args[0] || 'FoodLosAngeles';
const batchSize = parseInt(args[1]) || 10;
const scrapingSessionId = args[2] ? parseInt(args[2]) : undefined;

fetchCommentsOnly({
  subredditName,
  batchSize,
  scrapingSessionId,
})
  .catch(console.error)
  .finally(() => prisma.$disconnect());
