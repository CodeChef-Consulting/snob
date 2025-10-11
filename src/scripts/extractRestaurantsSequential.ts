import dotenv from '@dotenvx/dotenvx';
dotenv.config();

import { PrismaClient } from '@prisma/client';
import {
  CommentExtractionInput,
  extractCommentRestaurantInfo,
  extractPostRestaurantInfo,
  PostExtractionInput,
  RestaurantExtractionResult,
} from '../utils/gemini';

const prisma = new PrismaClient();

const GEMINI_MODEL = 'gemini-2.5-flash-lite';

// Configuration - Optimized for paid tier: 1000 RPM (requests per minute)
// Each batch should take at least 60 seconds to stay within rate limits
const BATCH_SIZE = 4000; // Process up to 1000 items per batch (1000 RPM = 1000/min)
const MIN_BATCH_DURATION_MS = 60000; // 60 seconds minimum per batch
const STAGGER_DELAY_MS = 60; // 60ms stagger between starting each request

interface Config {
  processPosts?: boolean;
  processComments?: boolean;
  limit?: number;
  skipExisting?: boolean;
}

/**
 * Batch save extraction results to database
 * Separates creates and updates for optimal performance
 */
async function batchSaveExtractions(
  results: Array<
    RestaurantExtractionResult & { postId?: number; commentId?: number }
  >,
  model: string
) {
  const now = new Date();

  // Separate posts and comments
  const postResults = results.filter((r) => r.postId);
  const commentResults = results.filter((r) => r.commentId);

  // Get existing extraction IDs
  const [existingPostIds, existingCommentIds] = await Promise.all([
    postResults.length > 0
      ? prisma.restaurantExtraction.findMany({
          where: { postId: { in: postResults.map((r) => r.postId!) } },
          select: { postId: true },
        })
      : Promise.resolve([]),
    commentResults.length > 0
      ? prisma.restaurantExtraction.findMany({
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
    // Create new post extractions
    postCreates.length > 0
      ? prisma.restaurantExtraction.createMany({
          data: postCreates.map((r) => ({
            postId: r.postId!,
            restaurantsMentioned: r.restaurantsMentioned,
            primaryRestaurant: r.primaryRestaurant,
            dishesMentioned: r.dishesMentioned,
            isSubjective: r.isSubjective,
            model,
            extractedAt: now,
          })),
          skipDuplicates: true,
        })
      : Promise.resolve(),

    // Create new comment extractions
    commentCreates.length > 0
      ? prisma.restaurantExtraction.createMany({
          data: commentCreates.map((r) => ({
            commentId: r.commentId!,
            restaurantsMentioned: r.restaurantsMentioned,
            primaryRestaurant: r.primaryRestaurant,
            dishesMentioned: r.dishesMentioned,
            isSubjective: r.isSubjective,
            model,
            extractedAt: now,
          })),
          skipDuplicates: true,
        })
      : Promise.resolve(),

    // Update existing post extractions in parallel
    ...postUpdates.map((r) =>
      prisma.restaurantExtraction.update({
        where: { postId: r.postId! },
        data: {
          restaurantsMentioned: r.restaurantsMentioned,
          primaryRestaurant: r.primaryRestaurant,
          dishesMentioned: r.dishesMentioned,
          isSubjective: r.isSubjective,
          model,
          extractedAt: now,
        },
      })
    ),

    // Update existing comment extractions in parallel
    ...commentUpdates.map((r) =>
      prisma.restaurantExtraction.update({
        where: { commentId: r.commentId! },
        data: {
          restaurantsMentioned: r.restaurantsMentioned,
          primaryRestaurant: r.primaryRestaurant,
          dishesMentioned: r.dishesMentioned,
          isSubjective: r.isSubjective,
          model,
          extractedAt: now,
        },
      })
    ),
  ]);
}

/**
 * Process posts with parallel API calls and batch DB operations (OPTIMIZED)
 */
async function processPostsSequential(limit?: number, skipExisting = true) {
  console.log('\n📝 Processing Posts (Optimized - Parallel API + Batch DB)');
  console.log('='.repeat(80));

  const whereClause = skipExisting ? { restaurantExtraction: null } : {};
  const totalPosts = await prisma.post.count({ where: whereClause });

  console.log(`   Total posts to process: ${totalPosts}`);
  if (limit) {
    console.log(`   Limiting to: ${limit} posts`);
  }

  let processed = 0;
  let errors = 0;

  while (processed < (limit || totalPosts)) {
    const batchStartTime = Date.now();
    const batchLimit = Math.min(BATCH_SIZE, (limit || totalPosts) - processed);

    const posts = await prisma.post.findMany({
      where: whereClause,
      take: batchLimit,
      select: { id: true, title: true, body: true },
    });

    if (posts.length === 0) break;

    console.log(
      `\n   Batch ${Math.floor(processed / BATCH_SIZE) + 1} (${posts.length} posts)...`
    );

    // Process all posts in parallel with staggered starts
    const extractionPromises = posts.map(
      (post, index) =>
        new Promise<{
          extraction: RestaurantExtractionResult;
          postId: number;
        } | null>((resolve) => {
          setTimeout(async () => {
            try {
              const input: PostExtractionInput = {
                post_title: post.title || '',
                post_text: post.body || '',
              };

              const extraction = await extractPostRestaurantInfo(
                input,
                GEMINI_MODEL
              );
              resolve({ extraction, postId: post.id });
            } catch (error) {
              console.error(`      Error processing post ${post.id}:`, error);
              resolve(null);
            }
          }, index * STAGGER_DELAY_MS);
        })
    );

    // Wait for all API calls to complete
    const results = await Promise.all(extractionPromises);

    // Filter out errors and prepare for batch save
    const successfulResults = results
      .filter(
        (r): r is { extraction: RestaurantExtractionResult; postId: number } =>
          r !== null
      )
      .map((r) => ({ ...r.extraction, postId: r.postId }));

    // Batch save to database
    if (successfulResults.length > 0) {
      await batchSaveExtractions(successfulResults, GEMINI_MODEL);
    }

    processed += posts.length;
    errors += posts.length - successfulResults.length;

    const batchElapsedTime = Date.now() - batchStartTime;
    console.log(
      `      ✅ Success: ${successfulResults.length}, ❌ Errors: ${posts.length - successfulResults.length}`
    );
    console.log(`      Progress: ${processed}/${limit || totalPosts}`);
    console.log(
      `      ⏱️  Batch completed in ${(batchElapsedTime / 1000).toFixed(1)}s`
    );

    // Wait for remainder of minimum batch duration to respect rate limits
    if (processed < (limit || totalPosts)) {
      const waitTime = Math.max(0, MIN_BATCH_DURATION_MS - batchElapsedTime);
      if (waitTime > 0) {
        console.log(
          `      ⏳ Waiting ${(waitTime / 1000).toFixed(1)}s before next batch (rate limit)...`
        );
        await new Promise((resolve) => setTimeout(resolve, waitTime));
      }
    }
  }

  console.log(`\n   ✅ Processed: ${processed}, ❌ Failed: ${errors}`);
  return { processed, errors };
}

/**
 * Process comments with parallel API calls and batch DB operations (OPTIMIZED)
 */
async function processCommentsSequential(limit?: number, skipExisting = true) {
  console.log('\n💬 Processing Comments (Optimized - Parallel API + Batch DB)');
  console.log('='.repeat(80));

  const whereClause = skipExisting ? { restaurantExtraction: null } : {};
  const totalComments = await prisma.comment.count({ where: whereClause });

  console.log(`   Total comments to process: ${totalComments}`);
  if (limit) {
    console.log(`   Limiting to: ${limit} comments`);
  }

  let processed = 0;
  let errors = 0;

  while (processed < (limit || totalComments)) {
    const batchStartTime = Date.now();
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

    console.log(
      `\n   Batch ${Math.floor(processed / BATCH_SIZE) + 1} (${comments.length} comments)...`
    );

    // Process all comments in parallel with staggered starts
    const extractionPromises = comments.map(
      (comment, index) =>
        new Promise<{
          extraction: RestaurantExtractionResult;
          commentId: number;
        } | null>((resolve) => {
          setTimeout(async () => {
            try {
              const input: CommentExtractionInput = {
                post_title: comment.post.title || '',
                post_text: comment.post.body || '',
                comment_text: comment.body || '',
                parent_text: comment.parentComment?.body || '',
              };

              const extraction = await extractCommentRestaurantInfo(
                input,
                GEMINI_MODEL
              );
              resolve({ extraction, commentId: comment.id });
            } catch (error) {
              console.error(
                `      Error processing comment ${comment.id}:`,
                error
              );
              resolve(null);
            }
          }, index * STAGGER_DELAY_MS);
        })
    );

    // Wait for all API calls to complete
    const results = await Promise.all(extractionPromises);

    // Filter out errors and prepare for batch save
    const successfulResults = results
      .filter(
        (
          r
        ): r is { extraction: RestaurantExtractionResult; commentId: number } =>
          r !== null
      )
      .map((r) => ({ ...r.extraction, commentId: r.commentId }));

    // Batch save to database
    if (successfulResults.length > 0) {
      await batchSaveExtractions(successfulResults, GEMINI_MODEL);
    }

    processed += comments.length;
    errors += comments.length - successfulResults.length;

    const batchElapsedTime = Date.now() - batchStartTime;
    console.log(
      `      ✅ Success: ${successfulResults.length}, ❌ Errors: ${comments.length - successfulResults.length}`
    );
    console.log(`      Progress: ${processed}/${limit || totalComments}`);
    console.log(
      `      ⏱️  Batch completed in ${(batchElapsedTime / 1000).toFixed(1)}s`
    );

    // Wait for remainder of minimum batch duration to respect rate limits
    if (processed < (limit || totalComments)) {
      const waitTime = Math.max(0, MIN_BATCH_DURATION_MS - batchElapsedTime);
      if (waitTime > 0) {
        console.log(
          `      ⏳ Waiting ${(waitTime / 1000).toFixed(1)}s before next batch (rate limit)...`
        );
        await new Promise((resolve) => setTimeout(resolve, waitTime));
      }
    }
  }

  console.log(`\n   ✅ Processed: ${processed}, ❌ Failed: ${errors}`);
  return { processed, errors };
}

/**
 * Main extraction function
 */
async function extractRestaurants(config: Config = {}) {
  const {
    processPosts = true,
    processComments = true,
    limit,
    skipExisting = true,
  } = config;

  console.log('🚀 Starting Restaurant Extraction (Free Tier - Sequential)');
  console.log('='.repeat(80));
  console.log(`   Posts: ${processPosts ? 'Yes' : 'No'}`);
  console.log(`   Comments: ${processComments ? 'Yes' : 'No'}`);
  console.log(`   Skip Existing: ${skipExisting ? 'Yes' : 'No'}`);
  console.log(`   Limit: ${limit || 'None'}`);
  console.log(`   Batch Size: ${BATCH_SIZE}`);
  console.log(`   ⚠️  Using sequential API (free tier compatible)`);

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

    console.log('\n' + '='.repeat(80));
    console.log('🎉 Extraction Complete!');
    console.log('='.repeat(80));
    console.log(
      `   Posts: ${stats.posts.processed} processed, ${stats.posts.errors} errors`
    );
    console.log(
      `   Comments: ${stats.comments.processed} processed, ${stats.comments.errors} errors`
    );
    console.log(
      `   Total: ${stats.posts.processed + stats.comments.processed} extracted`
    );
  } catch (error) {
    console.error('❌ Fatal error:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// CLI arguments
const args = process.argv.slice(2);
const config: Config = {
  processPosts: !args.includes('--comments-only'),
  processComments: !args.includes('--posts-only'),
  skipExisting: !args.includes('--reprocess-all'),
};

const limitArg = args.find((arg) => arg.startsWith('--limit='));
if (limitArg) {
  config.limit = parseInt(limitArg.split('=')[1], 10);
}

if (args.includes('--help') || args.includes('-h')) {
  console.log(`
Usage: tsx src/scripts/extractRestaurantsSequential.ts [options]

Options:
  --posts-only        Only process posts
  --comments-only     Only process comments
  --reprocess-all     Don't skip existing extractions
  --limit=<number>    Limit items to process
  -h, --help          Show help

Examples:
  npm run extract-restaurants
  npm run extract-restaurants -- --posts-only --limit=100
  npm run extract-restaurants -- --comments-only

Features:
  ✅ OPTIMIZED FOR PAID TIER - 1000 RPM rate limit
  ✅ Parallel API calls (1000 concurrent with 60ms stagger)
  ✅ Batch database operations (createMany + parallel updates)
  ✅ Time-based rate limiting (each batch takes ≥60s)
  ✅ Progress tracking and error handling
  ✅ Saves to RestaurantExtraction table

Performance:
  • Batch size: Up to 1000 items per batch
  • Rate limit: 1000 requests/minute (enforced via timing)
  • DB operations: Bulk creates + parallel updates per batch
  • Expected speed: ~60,000 items/hour maximum

Note: For 50% cost savings, use Batch API instead:
  npm run init-batch (submit batch job)
  npm run check-batch (retrieve results)
  `);
  process.exit(0);
}

extractRestaurants(config)
  .then(() => {
    console.log('\n✅ Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
  });
