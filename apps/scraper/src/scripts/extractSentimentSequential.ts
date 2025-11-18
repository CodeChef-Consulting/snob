import { config } from '@dotenvx/dotenvx';
config({ path: ['../../.env'] });

import { PrismaClient } from '@repo/db';
import {
  BatchConfig,
  parseCliArgs,
  printHelp,
  printSummary,
  processBatch,
  waitForRateLimit,
} from '../utils/batchProcessor';
import {
  CommentSentimentInput,
  PostSentimentInput,
  SentimentResult,
  evaluateComment,
  evaluatePost,
} from '../utils/gemini';

const prisma = new PrismaClient();

const GEMINI_MODEL = 'gemini-2.5-flash-lite';
const isFreeTier = true;

// Configuration
const BATCH_SIZE = isFreeTier ? 15 : 4000;
const batchConfig: BatchConfig = {
  batchSize: BATCH_SIZE,
  minBatchDurationMs: 60000,
  staggerDelayMs: 60,
};

interface Config {
  processPosts?: boolean;
  processComments?: boolean;
  limit?: number;
  skipExisting?: boolean;
}

/**
 * Batch save sentiment results to database
 */
async function batchSaveSentiments(
  results: Array<SentimentResult & { postId?: number; commentId?: number }>,
  model: string
) {
  const now = new Date();
  const postResults = results.filter((r) => r.postId);
  const commentResults = results.filter((r) => r.commentId);

  // Get existing sentiment IDs
  const [existingPostIds, existingCommentIds] = await Promise.all([
    postResults.length > 0
      ? prisma.sentimentExtraction.findMany({
          where: { postId: { in: postResults.map((r) => r.postId!) } },
          select: { postId: true },
        })
      : Promise.resolve([]),
    commentResults.length > 0
      ? prisma.sentimentExtraction.findMany({
          where: { commentId: { in: commentResults.map((r) => r.commentId!) } },
          select: { commentId: true },
        })
      : Promise.resolve([]),
  ]);

  const existingPostIdSet = new Set(existingPostIds.map((e) => e.postId));
  const existingCommentIdSet = new Set(
    existingCommentIds.map((e) => e.commentId)
  );

  // Separate creates and updates
  const postCreates = postResults.filter(
    (r) => !existingPostIdSet.has(r.postId!)
  );
  const postUpdates = postResults.filter((r) =>
    existingPostIdSet.has(r.postId!)
  );
  const commentCreates = commentResults.filter(
    (r) => !existingCommentIdSet.has(r.commentId!)
  );
  const commentUpdates = commentResults.filter((r) =>
    existingCommentIdSet.has(r.commentId!)
  );

  // Execute creates and updates in parallel
  await Promise.all([
    postCreates.length > 0
      ? prisma.sentimentExtraction.createMany({
          data: postCreates.map((r) => ({
            postId: r.postId!,
            rawAiScore: r.rawAiScore,
            model,
            extractedAt: now,
          })),
          skipDuplicates: true,
        })
      : Promise.resolve(),

    commentCreates.length > 0
      ? prisma.sentimentExtraction.createMany({
          data: commentCreates.map((r) => ({
            commentId: r.commentId!,
            rawAiScore: r.rawAiScore,
            model,
            extractedAt: now,
          })),
          skipDuplicates: true,
        })
      : Promise.resolve(),

    ...postUpdates.map((r) =>
      prisma.sentimentExtraction.update({
        where: { postId: r.postId! },
        data: { rawAiScore: r.rawAiScore, model, extractedAt: now },
      })
    ),

    ...commentUpdates.map((r) =>
      prisma.sentimentExtraction.update({
        where: { commentId: r.commentId! },
        data: { rawAiScore: r.rawAiScore, model, extractedAt: now },
      })
    ),
  ]);
}

/**
 * Process posts with parallel API calls and batch DB operations
 */
async function processPostsSequential(limit?: number, skipExisting = true) {
  console.log('\n📝 Processing Posts (Optimized - Parallel API + Batch DB)');
  console.log('='.repeat(80));

  const whereClause = skipExisting
    ? {
        sentimentExtraction: null,
        restaurantsMentioned: {
          some: {}, // Has at least one restaurant linked
        },
      }
    : {
        restaurantsMentioned: {
          some: {}, // Has at least one restaurant linked
        },
      };
  const totalPosts = await prisma.post.count({ where: whereClause });

  console.log(`   Total posts to process: ${totalPosts}`);
  if (limit) console.log(`   Limiting to: ${limit} posts`);

  let processed = 0;
  let errors = 0;

  while (processed < (limit || totalPosts)) {
    const batchLimit = Math.min(BATCH_SIZE, (limit || totalPosts) - processed);

    const posts = await prisma.post.findMany({
      where: whereClause,
      take: batchLimit,
      select: { id: true, title: true, body: true },
    });

    if (posts.length === 0) break;

    const {
      successful,
      errors: batchErrors,
      elapsed,
    } = await processBatch(
      posts,
      async (post) => {
        const input: PostSentimentInput = {
          post_title: post.title || '',
          post_text: post.body || '',
        };
        const sentiment = await evaluatePost(input, GEMINI_MODEL);
        return { sentiment, postId: post.id };
      },
      batchConfig,
      Math.floor(processed / BATCH_SIZE) + 1,
      processed,
      limit || totalPosts
    );

    // Batch save to database
    if (successful.length > 0) {
      const results = successful.map((r) => ({
        ...r.sentiment,
        postId: r.postId,
      }));
      await batchSaveSentiments(results, GEMINI_MODEL);
    }

    processed += posts.length;
    errors += batchErrors;

    await waitForRateLimit(
      elapsed,
      batchConfig.minBatchDurationMs,
      processed < (limit || totalPosts)
    );
  }

  console.log(`\n   ✅ Processed: ${processed}, ❌ Failed: ${errors}`);
  return { processed, errors };
}

/**
 * Process comments with parallel API calls and batch DB operations
 */
async function processCommentsSequential(limit?: number, skipExisting = true) {
  console.log('\n💬 Processing Comments (Optimized - Parallel API + Batch DB)');
  console.log('='.repeat(80));

  const whereClause = skipExisting
    ? {
        sentimentExtraction: null,
        restaurantsMentioned: {
          some: {}, // Has at least one restaurant linked
        },
      }
    : {
        restaurantsMentioned: {
          some: {}, // Has at least one restaurant linked
        },
      };
  const totalComments = await prisma.comment.count({ where: whereClause });

  console.log(`   Total comments to process: ${totalComments}`);
  if (limit) console.log(`   Limiting to: ${limit} comments`);

  let processed = 0;
  let errors = 0;

  while (processed < (limit || totalComments)) {
    const batchLimit = Math.min(
      BATCH_SIZE,
      (limit || totalComments) - processed
    );

    const comments = await prisma.comment.findMany({
      where: whereClause,
      take: batchLimit,
      include: {
        post: { select: { title: true, body: true } },
        parentComment: { select: { body: true } },
      },
    });

    if (comments.length === 0) break;

    const {
      successful,
      errors: batchErrors,
      elapsed,
    } = await processBatch(
      comments,
      async (comment) => {
        const input: CommentSentimentInput = {
          post_title: comment.post.title || '',
          comment_text: comment.body || '',
        };
        const sentiment = await evaluateComment(input, GEMINI_MODEL);
        return { sentiment, commentId: comment.id };
      },
      batchConfig,
      Math.floor(processed / BATCH_SIZE) + 1,
      processed,
      limit || totalComments
    );

    // Batch save to database
    if (successful.length > 0) {
      const results = successful.map((r) => ({
        ...r.sentiment,
        commentId: r.commentId,
      }));
      await batchSaveSentiments(results, GEMINI_MODEL);
    }

    processed += comments.length;
    errors += batchErrors;

    await waitForRateLimit(
      elapsed,
      batchConfig.minBatchDurationMs,
      processed < (limit || totalComments)
    );
  }

  console.log(`\n   ✅ Processed: ${processed}, ❌ Failed: ${errors}`);
  return { processed, errors };
}

/**
 * Main sentiment extraction function
 */
async function extractSentiment(config: Config = {}) {
  const {
    processPosts = true,
    processComments = true,
    limit,
    skipExisting = true,
  } = config;

  console.log('🚀 Starting Sentiment Extraction');
  console.log('='.repeat(80));
  console.log(`   Posts: ${processPosts ? 'Yes' : 'No'}`);
  console.log(`   Comments: ${processComments ? 'Yes' : 'No'}`);
  console.log(`   Skip Existing: ${skipExisting ? 'Yes' : 'No'}`);
  console.log(`   Limit: ${limit || 'None'}`);
  console.log(`   Batch Size: ${BATCH_SIZE}`);

  try {
    const stats = {
      posts: { processed: 0, errors: 0 },
      comments: { processed: 0, errors: 0 },
    };

    if (processPosts) {
      stats.posts = await processPostsSequential(limit, skipExisting);
    }

    if (processComments) {
      stats.comments = await processCommentsSequential(limit, skipExisting);
    }

    printSummary('Sentiment Extraction', stats);
  } catch (error) {
    console.error('❌ Fatal error:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// CLI
const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  printHelp(
    'extractSentimentSequential.ts',
    'Sentiment Extraction',
    'SentimentExtraction'
  );
  process.exit(0);
}

const config = parseCliArgs(args);

extractSentiment(config)
  .then(() => {
    console.log('\n✅ Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
  });
