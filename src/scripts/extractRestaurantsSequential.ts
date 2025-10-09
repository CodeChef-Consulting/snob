import dotenv from '@dotenvx/dotenvx';
dotenv.config();

import { PrismaClient } from '@prisma/client';
import {
  extractCommentRestaurantInfo,
  extractPostRestaurantInfo,
  CommentExtractionInput,
  PostExtractionInput,
  RestaurantExtractionResult,
} from '../utils/gemini';

const prisma = new PrismaClient();

// Configuration
const BATCH_SIZE = 100; // Process 100 items at a time
const DELAY_BETWEEN_BATCHES = 2000; // 2 second delay between batches
const DELAY_BETWEEN_ITEMS = 100; // 100ms between individual API calls

interface Config {
  processPosts?: boolean;
  processComments?: boolean;
  limit?: number;
  skipExisting?: boolean;
}

/**
 * Save extraction result to database
 */
async function saveExtraction(
  result: RestaurantExtractionResult & { postId?: number; commentId?: number },
  model: string
) {
  const data = {
    restaurantsMentioned: result.restaurantsMentioned,
    primaryRestaurant: result.primaryRestaurant,
    dishesMentioned: result.dishesMentioned,
    isSubjective: result.isSubjective,
    model,
    extractedAt: new Date(),
  };

  if (result.postId) {
    await prisma.restaurantExtraction.upsert({
      where: { postId: result.postId },
      create: { ...data, postId: result.postId },
      update: data,
    });
  } else if (result.commentId) {
    await prisma.restaurantExtraction.upsert({
      where: { commentId: result.commentId },
      create: { ...data, commentId: result.commentId },
      update: data,
    });
  }
}

/**
 * Process posts sequentially (FREE TIER COMPATIBLE)
 */
async function processPostsSequential(limit?: number, skipExisting = true) {
  console.log('\n📝 Processing Posts (Sequential - Free Tier Compatible)');
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

    // Process sequentially with delays (free tier friendly)
    for (const post of posts) {
      try {
        const input: PostExtractionInput = {
          post_title: post.title || '',
          post_text: post.body || '',
        };

        const extraction = await extractPostRestaurantInfo(input);
        await saveExtraction(
          { ...extraction, postId: post.id },
          'gemini-2.5-flash'
        );

        processed++;

        if (processed % 10 === 0) {
          console.log(`      Progress: ${processed}/${limit || totalPosts}`);
        }

        // Small delay between requests to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, DELAY_BETWEEN_ITEMS));
      } catch (error) {
        console.error(`      Error processing post ${post.id}:`, error);
        errors++;
      }
    }

    // Delay between batches
    if (processed < (limit || totalPosts)) {
      await new Promise((resolve) => setTimeout(resolve, DELAY_BETWEEN_BATCHES));
    }
  }

  console.log(`\n   ✅ Processed: ${processed}, ❌ Failed: ${errors}`);
  return { processed, errors };
}

/**
 * Process comments sequentially (FREE TIER COMPATIBLE)
 */
async function processCommentsSequential(limit?: number, skipExisting = true) {
  console.log('\n💬 Processing Comments (Sequential - Free Tier Compatible)');
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

    for (const comment of comments) {
      try {
        const input: CommentExtractionInput = {
          post_title: comment.post.title || '',
          post_text: comment.post.body || '',
          comment_text: comment.body || '',
          parent_text: comment.parentComment?.body || '',
        };

        const extraction = await extractCommentRestaurantInfo(input);
        await saveExtraction(
          { ...extraction, commentId: comment.id },
          'gemini-2.5-flash'
        );

        processed++;

        if (processed % 10 === 0) {
          console.log(`      Progress: ${processed}/${limit || totalComments}`);
        }

        await new Promise((resolve) => setTimeout(resolve, DELAY_BETWEEN_ITEMS));
      } catch (error) {
        console.error(`      Error processing comment ${comment.id}:`, error);
        errors++;
      }
    }

    if (processed < (limit || totalComments)) {
      await new Promise((resolve) => setTimeout(resolve, DELAY_BETWEEN_BATCHES));
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
  ✅ FREE TIER COMPATIBLE - Uses standard API calls
  ✅ Rate limiting built-in (100ms between calls)
  ✅ Progress tracking and error handling
  ✅ Saves to RestaurantExtraction table

Note: For 50% cost savings, upgrade to paid tier and use:
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
