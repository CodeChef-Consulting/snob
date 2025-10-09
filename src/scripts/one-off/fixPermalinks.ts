import dotenv from '@dotenvx/dotenvx';
dotenv.config();

import { PrismaClient } from '@prisma/client';
import {
  createRedditClient,
  extractMediaUrls,
  extractMediaFromCommentBody,
} from '../../utils/reddit';

const prisma = new PrismaClient();
const r = createRedditClient();

async function fixPermalinks() {
  console.log('🔧 Fixing permalinks...\n');

  // 1. Fix posts with incorrect permalinks (should start with /r/, not https://)
  const badPosts = await prisma.post.findMany({
    where: {
      OR: [
        { permalink: { startsWith: 'https://' } },
        { permalink: { startsWith: 'http://' } },
      ],
    },
  });

  console.log(`Found ${badPosts.length} posts with incorrect permalinks\n`);

  let postsFixed = 0;
  for (const post of badPosts) {
    try {
      console.log(`Refetching post ${post.externalId}...`);
      const submission = await r.getSubmission(post.externalId).fetch();

      const postData = {
        externalId: post.externalId,
        title: submission.title as string,
        body: (submission.selftext as string) || null,
        score: submission.score as number,
        ups: submission.ups as number,
        downs: submission.downs as number,
        upvoteRatio: submission.upvote_ratio as number,
        numComments: submission.num_comments as number,
        gilded: submission.gilded as number,
        permalink: submission.permalink as string,
        author: submission.author.name as string,
        subreddit: post.subreddit,
        createdUtc: new Date((submission.created_utc as number) * 1000),
        scrapingSessionId: post.scrapingSessionId,
        commentsFullyScraped: post.commentsFullyScraped,
      };

      await prisma.post.update({
        where: { id: post.id },
        data: {
          ...postData,
          updatedAt: new Date(),
        },
      });

      // Update media files
      const postMediaUrls = extractMediaUrls(submission);
      if (postMediaUrls.length > 0) {
        // Delete existing media
        await prisma.file.deleteMany({
          where: { postId: post.id },
        });

        // Create new media
        await prisma.file.createMany({
          data: postMediaUrls.map((media) => ({
            postId: post.id,
            fileUrl: media.url,
            fileType: media.type,
            metadata: media.metadata,
          })),
          skipDuplicates: true,
        });
      }

      postsFixed++;
      console.log(
        `✅ Fixed post ${post.externalId} (${postsFixed}/${badPosts.length})`
      );

      // Rate limiting delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error: any) {
      if (error.message?.toLowerCase().includes('ratelimit')) {
        console.error('🚨 RATE LIMIT - waiting 60 seconds...');
        await new Promise((resolve) => setTimeout(resolve, 60000));
        continue;
      }
      console.error(`❌ Error fixing post ${post.externalId}:`, error.message);
    }
  }

  // 2. Fix comments with null permalink
  const badComments = await prisma.comment.findMany({
    where: {
      //null or undefined or ""
      OR: [{ permalink: null }, { permalink: undefined }, { permalink: '' }],
    },
    include: {
      post: true,
    },
  });

  console.log(`\nFound ${badComments.length} comments with null permalinks\n`);

  let commentsFixed = 0;
  for (const comment of badComments) {
    try {
      console.log(`Refetching comment ${comment.externalId}...`);

      // Fetch the full submission to get all comments
      const submission = await r.getSubmission(comment.post.externalId);
      const allComments = await submission.comments.fetchAll();

      // Find this specific comment
      const findComment = (comments: any[]): any => {
        for (const c of comments) {
          if (c.id === comment.externalId) {
            return c;
          }
          if (c.replies && c.replies.length > 0) {
            const found = findComment(c.replies);
            if (found) return found;
          }
        }
        return null;
      };

      const redditComment = findComment(allComments);
      if (!redditComment) {
        console.log(`⚠️  Comment ${comment.externalId} not found in post`);
        continue;
      }

      // Find parent comment ID if exists
      let parentDbCommentId: number | null = null;
      const parentId = redditComment.parent_id as string;
      if (parentId.startsWith('t1_')) {
        const parentExternalId = parentId.replace('t1_', '');
        const parentComment = await prisma.comment.findUnique({
          where: { externalId: parentExternalId },
          select: { id: true },
        });
        parentDbCommentId = parentComment?.id || null;
      }

      const commentData = {
        body: (redditComment.body as string) || '',
        score: redditComment.score as number,
        ups: redditComment.ups as number,
        depth: redditComment.depth as number,
        controversiality: redditComment.controversiality as number,
        isSubmitter: redditComment.is_submitter as boolean,
        scoreHidden: redditComment.score_hidden as boolean,
        permalink: redditComment.permalink as string,
        author: redditComment.author.name as string,
        createdUtc: new Date((redditComment.created_utc as number) * 1000),
        parentCommentId: parentDbCommentId,
      };

      await prisma.comment.update({
        where: { id: comment.id },
        data: {
          ...commentData,
          updatedAt: new Date(),
        },
      });

      // Update media files
      const commentMediaUrls = extractMediaFromCommentBody(
        redditComment.body as string
      );
      if (commentMediaUrls.length > 0) {
        // Delete existing media
        await prisma.file.deleteMany({
          where: { commentId: comment.id },
        });

        // Create new media
        await prisma.file.createMany({
          data: commentMediaUrls.map((media) => ({
            commentId: comment.id,
            fileUrl: media.url,
            fileType: media.type,
            metadata: media.metadata,
          })),
          skipDuplicates: true,
        });
      }

      commentsFixed++;
      console.log(
        `✅ Fixed comment ${comment.externalId} (${commentsFixed}/${badComments.length})`
      );

      // Rate limiting delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error: any) {
      if (error.message?.toLowerCase().includes('ratelimit')) {
        console.error('🚨 RATE LIMIT - waiting 60 seconds...');
        await new Promise((resolve) => setTimeout(resolve, 60000));
        continue;
      }
      console.error(
        `❌ Error fixing comment ${comment.externalId}:`,
        error.message
      );
    }
  }

  console.log(
    `\n✅ Complete! Fixed ${postsFixed} posts and ${commentsFixed} comments`
  );
}

fixPermalinks()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
