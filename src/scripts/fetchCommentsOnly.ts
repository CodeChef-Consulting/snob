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

r.config({ requestDelay: 100, continueAfterRatelimitError: false });

interface MediaFile {
  url: string;
  type: string;
  metadata?: any;
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
            scrapingSessionId: dbPost.scrapingSessionId,
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
            scrapingSessionId: dbPost.scrapingSessionId,
          },
        });
        postCommentsScraped++;
        totalCommentsScraped++;

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

        if (comment.replies && comment.replies.length > 0) {
          const expandedReplies = await comment.replies.fetchAll();
          for (const reply of expandedReplies as Comment[]) {
            await processComment(reply);
          }
        }
      }

      for (const comment of topLevelComments as Comment[]) {
        await processComment(comment);
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

      if (postsCompleted < postsNeedingComments.length) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
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
