import { config } from '@dotenvx/dotenvx';
config({ path: ['../../.env'] });

import { PrismaClient } from '@repo/db';
import { unlink, writeFile } from 'fs/promises';
import { join } from 'path';
import { getGenAI, updateBatchJobStatus } from '../utils/gemini';
import {
  createCommentExtractionPrompt,
  createCommentSentimentPrompt,
  createPostExtractionPrompt,
  createPostSentimentPrompt,
} from '../utils/prompts';
import { flatMap } from 'lodash';

const prisma = new PrismaClient();

// Configuration
const BATCH_SIZE = 1000;
const JSONL_THRESHOLD = 50000; // Use JSONL for batches larger than this
// JSONL support verified working with @google/genai 1.23.0
// Use --force-jsonl flag to test JSONL functionality with small batches

interface InitializeConfig {
  contentType: 'post' | 'comment';
  jobType: 'extraction' | 'sentiment';
  limit?: number;
  skipExisting?: boolean;
}

/**
 * Create JSONL file for large batch jobs
 * Returns the uploaded file name after uploading to Gemini
 */
async function createJsonlBatchFile(
  keyAndRequests: Array<{
    key: string;
    request: {
      contents: Array<{ parts: Array<{ text: string }>; role: string }>;
    };
  }>,
  displayName: string
): Promise<string> {
  const ai = getGenAI();
  const tmpDir = join(process.cwd(), 'tmp');
  const jsonlPath = join(tmpDir, `${displayName}.jsonl`);

  console.log(
    `   📝 Creating JSONL file with ${keyAndRequests.length} requests...`
  );

  // Create JSONL content - each line is a separate JSON request
  const jsonlContent = keyAndRequests
    .map((keyAndRequest) => JSON.stringify(keyAndRequest))
    .join('\n');

  // Ensure tmp directory exists
  const fs = await import('fs/promises');
  try {
    await fs.mkdir(tmpDir, { recursive: true });
  } catch (err) {
    // Directory already exists
  }

  // Write JSONL file
  await writeFile(jsonlPath, jsonlContent, 'utf8');
  console.log(
    `   💾 Written ${jsonlPath} (${(jsonlContent.length / 1024 / 1024).toFixed(2)} MB)`
  );

  try {
    // Upload file to Gemini File API
    console.log(`   📤 Uploading JSONL file to Gemini...`);
    const uploadedFile = await ai.files.upload({
      file: jsonlPath,
      config: {
        displayName: `${displayName}-requests`,
        mimeType: 'application/jsonl',
      },
    });

    console.log(`   ✅ File uploaded: ${uploadedFile.name}`);

    // Clean up local file
    await unlink(jsonlPath);

    return uploadedFile.name || '';
  } catch (error) {
    // Clean up local file on error
    try {
      await unlink(jsonlPath);
    } catch {
      // Ignore cleanup errors
    }
    throw error;
  }
}

/**
 * Initialize batch job for posts - submit to Gemini API
 */
async function initializePostBatch(limit?: number, skipExisting = true) {
  console.log('\n📝 Initializing Post Extraction Batch');
  console.log('='.repeat(80));

  const ai = getGenAI();

  const allExistingPostExtractionBatchJobIds = await prisma.batchJob.findMany({
    where: {
      contentType: 'post',
      displayName: { contains: 'post-extraction' },
      status: { in: ['pending', 'running', 'submitted'] },
    },
    select: { itemIds: true },
  });

  const whereClause = {
    AND: [
      skipExisting ? { restaurantExtraction: null } : {},
      {
        id: {
          notIn: flatMap(
            allExistingPostExtractionBatchJobIds.map(
              (b) => b.itemIds as number[]
            )
          ),
        },
      },
    ],
  };
  const totalPosts = await prisma.post.count({ where: whereClause });

  console.log(`   Total posts available: ${totalPosts}`);
  if (limit) {
    console.log(`   Limiting to: ${limit} posts`);
  }

  const posts = await prisma.post.findMany({
    where: whereClause,
    take: limit || BATCH_SIZE,
    select: { id: true, title: true, body: true },
  });

  if (posts.length === 0) {
    console.log('   ⚠️  No posts to process!');
    return null;
  }

  const postIds = posts.map((p) => p.id);

  // Create BatchJob record with status "pending"
  const batchJobRecord = await prisma.batchJob.create({
    data: {
      displayName: `post-extraction-${Date.now()}`,
      model: 'gemini-2.5-flash-lite',
      contentType: 'post',
      itemCount: posts.length,
      itemIds: postIds,
      status: 'pending',
    },
  });

  console.log(`   📋 Created BatchJob #${batchJobRecord.id}`);

  try {
    // Create batch requests
    const keyAndRequests = posts.map((post) => ({
      key: post.id.toString(),
      request: {
        contents: [
          {
            parts: [
              {
                text: createPostExtractionPrompt({
                  post_title: post.title || '',
                  post_text: post.body || '',
                }),
              },
            ],
            role: 'user',
          },
        ],
      },
    }));

    console.log(
      `   📤 Submitting ${posts.length} requests to Gemini Batch API...`
    );

    // Determine if we need JSONL format
    const useJsonl = posts.length > JSONL_THRESHOLD;

    if (useJsonl) {
      console.log(
        `   🗂️  Large batch detected (>${JSONL_THRESHOLD}), using JSONL format...`
      );
    }

    // Submit batch job to Gemini
    let geminiBatchJob;
    if (useJsonl) {
      const fileName = await createJsonlBatchFile(
        keyAndRequests,
        batchJobRecord.displayName
      );
      geminiBatchJob = await ai.batches.create({
        model: 'gemini-2.5-flash-lite',
        src: fileName,
        config: {
          displayName: batchJobRecord.displayName,
        },
      });
    } else {
      geminiBatchJob = await ai.batches.create({
        model: 'gemini-2.5-flash-lite',
        src: keyAndRequests.map((keyAndRequest) => keyAndRequest.request),
        config: {
          displayName: batchJobRecord.displayName,
        },
      });
    }

    // Update BatchJob with geminiJobName and status "submitted"
    await prisma.batchJob.update({
      where: { id: batchJobRecord.id },
      data: {
        geminiJobName: geminiBatchJob.name,
        status: 'submitted',
        submittedAt: new Date(),
      },
    });

    console.log(`   ✅ Batch submitted successfully!`);
    console.log(`   📋 BatchJob ID: ${batchJobRecord.id}`);
    console.log(`   🔗 Gemini Job: ${geminiBatchJob.name}`);
    console.log(`\n   💡 Use this command to check status:`);
    console.log(`      npm run check-batch -- ${batchJobRecord.id}`);

    return batchJobRecord;
  } catch (error) {
    // Update BatchJob with error
    await updateBatchJobStatus(prisma, batchJobRecord.id, 'failed', {
      error: error instanceof Error ? error.message : String(error),
      completedAt: new Date(),
    });
    throw error;
  }
}

/**
 * Initialize batch job for comments - submit to Gemini API
 */
async function initializeCommentBatch(limit?: number, skipExisting = true) {
  console.log('\n💬 Initializing Comment Extraction Batch');
  console.log('='.repeat(80));

  const ai = getGenAI();

  const allExistingCommentExtractionBatchJobIds =
    await prisma.batchJob.findMany({
      where: {
        contentType: 'comment',
        displayName: { contains: 'comment-extraction' },
        status: { in: ['pending', 'running', 'submitted'] },
      },
      select: { itemIds: true },
    });

  const whereClause = {
    AND: [
      skipExisting ? { restaurantExtraction: null } : {},
      {
        id: {
          notIn: flatMap(
            allExistingCommentExtractionBatchJobIds.map(
              (b) => b.itemIds as number[]
            )
          ),
        },
      },
    ],
  };
  const totalComments = await prisma.comment.count({ where: whereClause });

  console.log(`   Total comments available: ${totalComments}`);
  if (limit) {
    console.log(`   Limiting to: ${limit} comments`);
  }

  const comments = await prisma.comment.findMany({
    where: whereClause,
    take: limit || BATCH_SIZE,
    include: {
      post: { select: { title: true, body: true } },
      parentComment: { select: { body: true } },
    },
  });

  if (comments.length === 0) {
    console.log('   ⚠️  No comments to process!');
    return null;
  }

  const commentIds = comments.map((c) => c.id);

  // Create BatchJob record
  const batchJobRecord = await prisma.batchJob.create({
    data: {
      displayName: `comment-extraction-${Date.now()}`,
      model: 'gemini-2.5-flash-lite',
      contentType: 'comment',
      itemCount: comments.length,
      itemIds: commentIds,
      status: 'pending',
    },
  });

  console.log(`   📋 Created BatchJob #${batchJobRecord.id}`);

  try {
    const keyAndRequests = comments.map((comment) => ({
      key: comment.id.toString(),
      request: {
        contents: [
          {
            parts: [
              {
                text: createCommentExtractionPrompt({
                  post_title: comment.post.title || '',
                  post_text: comment.post.body || '',
                  comment_text: comment.body || '',
                  parent_text: comment.parentComment?.body || '',
                }),
              },
            ],
            role: 'user',
          },
        ],
      },
    }));

    console.log(
      `   📤 Submitting ${comments.length} requests to Gemini Batch API...`
    );

    // Determine if we need JSONL format
    const useJsonl = comments.length > JSONL_THRESHOLD;

    if (useJsonl) {
      console.log(
        `   🗂️  Large batch detected (>${JSONL_THRESHOLD}), using JSONL format...`
      );
    }

    // Submit batch job to Gemini
    let geminiBatchJob;
    if (useJsonl) {
      const fileUri = await createJsonlBatchFile(
        keyAndRequests,
        batchJobRecord.displayName
      );
      geminiBatchJob = await ai.batches.create({
        model: 'gemini-2.5-flash-lite',
        src: {
          format: 'jsonl',
          gcsUri: [fileUri],
        },
        config: {
          displayName: batchJobRecord.displayName,
        },
      });
    } else {
      geminiBatchJob = await ai.batches.create({
        model: 'gemini-2.5-flash-lite',
        src: keyAndRequests.map((keyAndRequest) => keyAndRequest.request),
        config: {
          displayName: batchJobRecord.displayName,
        },
      });
    }

    await prisma.batchJob.update({
      where: { id: batchJobRecord.id },
      data: {
        geminiJobName: geminiBatchJob.name,
        status: 'submitted',
        submittedAt: new Date(),
      },
    });

    console.log(`   ✅ Batch submitted successfully!`);
    console.log(`   📋 BatchJob ID: ${batchJobRecord.id}`);
    console.log(`   🔗 Gemini Job: ${geminiBatchJob.name}`);
    console.log(`\n   💡 Use this command to check status:`);
    console.log(`      npm run check-batch -- ${batchJobRecord.id}`);

    return batchJobRecord;
  } catch (error) {
    await updateBatchJobStatus(prisma, batchJobRecord.id, 'failed', {
      error: error instanceof Error ? error.message : String(error),
      completedAt: new Date(),
    });
    throw error;
  }
}

/**
 * Initialize batch job for post sentiment analysis
 */
async function initializePostSentimentBatch(
  limit?: number,
  skipExisting = true,
  forceJsonl = false
) {
  console.log('\n📝 Initializing Post Sentiment Analysis Batch');
  console.log('='.repeat(80));

  const ai = getGenAI();

  const allExistingPostSentimentBatchJobIds = await prisma.batchJob.findMany({
    where: {
      contentType: 'post',
      displayName: { contains: 'post-sentiment' },
      //in pending, running, submitted
      status: { in: ['pending', 'running', 'submitted'] },
    },
    select: { itemIds: true },
  });

  // Only analyze posts that have subjective restaurant mentions
  const whereClause = {
    AND: [
      skipExisting ? { sentimentExtraction: null } : {},
      {
        restaurantExtraction: {
          isSubjective: true,
        },
      },
      //make sure it's not part of ids for a post sentiment batch job
      {
        id: {
          notIn: flatMap(
            allExistingPostSentimentBatchJobIds.map(
              (b) => b.itemIds as number[]
            )
          ),
        },
      },
    ],
  };

  const totalPosts = await prisma.post.count({ where: whereClause });

  console.log(`   Total posts with subjective mentions: ${totalPosts}`);
  if (limit) {
    console.log(`   Limiting to: ${limit} posts`);
  }

  const posts = await prisma.post.findMany({
    where: whereClause,
    take: limit || BATCH_SIZE,
    select: { id: true, title: true, body: true },
  });

  if (posts.length === 0) {
    console.log('   ⚠️  No posts to process!');
    return null;
  }

  const postIds = posts.map((p) => p.id);

  // Create BatchJob record with status "pending"
  const batchJobRecord = await prisma.batchJob.create({
    data: {
      displayName: `post-sentiment-${Date.now()}`,
      model: 'gemini-2.5-flash-lite',
      contentType: 'post',
      itemCount: posts.length,
      itemIds: postIds,
      status: 'pending',
    },
  });

  console.log(`   📋 Created BatchJob #${batchJobRecord.id}`);

  try {
    // Create batch requests
    const keyAndRequests = posts.map((post) => ({
      key: post.id.toString(),
      request: {
        contents: [
          {
            parts: [
              {
                text: createPostSentimentPrompt({
                  post_title: post.title || '',
                  post_text: post.body || '',
                }),
              },
            ],
            role: 'user',
          },
        ],
      },
    }));

    console.log(
      `   📤 Submitting ${posts.length} requests to Gemini Batch API...`
    );

    // Determine if we need JSONL format
    const useJsonl = forceJsonl || posts.length > JSONL_THRESHOLD;

    if (useJsonl) {
      if (forceJsonl) {
        console.log(`   🗂️  JSONL format forced for testing...`);
      } else {
        console.log(
          `   🗂️  Large batch detected (>${JSONL_THRESHOLD}), using JSONL format...`
        );
      }
    }

    // Submit batch job to Gemini
    let geminiBatchJob;
    if (useJsonl) {
      const fileName = await createJsonlBatchFile(
        keyAndRequests,
        batchJobRecord.displayName
      );
      geminiBatchJob = await ai.batches.create({
        model: 'gemini-2.5-flash-lite',
        src: fileName,
        config: {
          displayName: batchJobRecord.displayName,
        },
      });
    } else {
      geminiBatchJob = await ai.batches.create({
        model: 'gemini-2.5-flash-lite',
        src: keyAndRequests.map((keyAndRequest) => keyAndRequest.request),
        config: {
          displayName: batchJobRecord.displayName,
        },
      });
    }

    // Update BatchJob with geminiJobName and status "submitted"
    await prisma.batchJob.update({
      where: { id: batchJobRecord.id },
      data: {
        geminiJobName: geminiBatchJob.name,
        status: 'submitted',
        submittedAt: new Date(),
      },
    });

    console.log(`   ✅ Batch submitted successfully!`);
    console.log(`   📋 BatchJob ID: ${batchJobRecord.id}`);
    console.log(`   🔗 Gemini Job: ${geminiBatchJob.name}`);
    console.log(`\n   💡 Use this command to check status:`);
    console.log(`      npm run check-batch -- ${batchJobRecord.id}`);

    return batchJobRecord;
  } catch (error) {
    // Update BatchJob with error
    await updateBatchJobStatus(prisma, batchJobRecord.id, 'failed', {
      error: error instanceof Error ? error.message : String(error),
      completedAt: new Date(),
    });
    throw error;
  }
}

/**
 * Initialize batch job for comment sentiment analysis
 */
async function initializeCommentSentimentBatch(
  limit?: number,
  skipExisting = true,
  forceJsonl = false
) {
  console.log('\n💬 Initializing Comment Sentiment Analysis Batch');
  console.log('='.repeat(80));

  const ai = getGenAI();

  const allExistingCommentSentimentBatchJobIds = await prisma.batchJob.findMany(
    {
      where: {
        contentType: 'comment',
        displayName: { contains: 'comment-sentiment' },
        //in pending, running, submitted
        status: { in: ['pending', 'running', 'submitted'] },
      },
      select: { itemIds: true },
    }
  );

  // Only analyze comments that have subjective restaurant mentions
  // with either restaurantsMentioned or primaryRestaurant
  const whereClause = {
    AND: [
      skipExisting ? { sentimentExtraction: null } : {},
      {
        restaurantExtraction: {
          isSubjective: true,
          OR: [
            { restaurantsMentioned: { not: null } },
            { primaryRestaurant: { not: null } },
          ],
        },
      },
      //has at least one restaurant linked
      {
        restaurantsMentioned: {
          some: {},
        },
      },
      //make sure it's not part of ids for a comment sentiment batch job
      {
        id: {
          notIn: flatMap(
            allExistingCommentSentimentBatchJobIds.map(
              (b) => b.itemIds as number[]
            )
          ),
        },
      },
    ],
  };

  const totalComments = await prisma.comment.count({ where: whereClause });

  console.log(`   Total comments with subjective mentions: ${totalComments}`);
  if (limit) {
    console.log(`   Limiting to: ${limit} comments`);
  }

  const comments = await prisma.comment.findMany({
    where: whereClause,
    take: limit || BATCH_SIZE,
    include: {
      post: { select: { title: true } },
    },
  });

  if (comments.length === 0) {
    console.log('   ⚠️  No comments to process!');
    return null;
  }

  const commentIds = comments.map((c) => c.id);

  // Create BatchJob record
  const batchJobRecord = await prisma.batchJob.create({
    data: {
      displayName: `comment-sentiment-${Date.now()}`,
      model: 'gemini-2.5-flash-lite',
      contentType: 'comment',
      itemCount: comments.length,
      itemIds: commentIds,
      status: 'pending',
    },
  });

  console.log(`   📋 Created BatchJob #${batchJobRecord.id}`);

  try {
    const keyAndRequests = comments.map((comment) => ({
      key: comment.id.toString(),
      request: {
        contents: [
          {
            parts: [
              {
                text: createCommentSentimentPrompt({
                  comment_text: comment.body || '',
                  post_title: comment.post.title || '',
                }),
              },
            ],
            role: 'user',
          },
        ],
      },
    }));

    console.log(
      `   📤 Submitting ${comments.length} requests to Gemini Batch API...`
    );

    // Determine if we need JSONL format
    const useJsonl = forceJsonl || comments.length > JSONL_THRESHOLD;

    if (useJsonl) {
      if (forceJsonl) {
        console.log(`   🗂️  JSONL format forced for testing...`);
      } else {
        console.log(
          `   🗂️  Large batch detected (>${JSONL_THRESHOLD}), using JSONL format...`
        );
      }
    }

    // Submit batch job to Gemini
    let geminiBatchJob;
    if (useJsonl) {
      const fileName = await createJsonlBatchFile(
        keyAndRequests,
        batchJobRecord.displayName
      );
      geminiBatchJob = await ai.batches.create({
        model: 'gemini-2.5-flash-lite',
        src: fileName,
        config: {
          displayName: batchJobRecord.displayName,
        },
      });
    } else {
      geminiBatchJob = await ai.batches.create({
        model: 'gemini-2.5-flash-lite',
        src: keyAndRequests.map((keyAndRequest) => keyAndRequest.request),
        config: {
          displayName: batchJobRecord.displayName,
        },
      });
    }

    await prisma.batchJob.update({
      where: { id: batchJobRecord.id },
      data: {
        geminiJobName: geminiBatchJob.name,
        status: 'submitted',
        submittedAt: new Date(),
      },
    });

    console.log(`   ✅ Batch submitted successfully!`);
    console.log(`   📋 BatchJob ID: ${batchJobRecord.id}`);
    console.log(`   🔗 Gemini Job: ${geminiBatchJob.name}`);
    console.log(`\n   💡 Use this command to check status:`);
    console.log(`      npm run check-batch -- ${batchJobRecord.id}`);

    return batchJobRecord;
  } catch (error) {
    await updateBatchJobStatus(prisma, batchJobRecord.id, 'failed', {
      error: error instanceof Error ? error.message : String(error),
      completedAt: new Date(),
    });
    throw error;
  }
}

/**
 * Main initialization function
 */
async function initializeBatch() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Usage: tsx src/scripts/initializeBatch.ts [options]

Options:
  --posts             Initialize batch for posts (default)
  --comments          Initialize batch for comments
  --sentiment         Run sentiment analysis (default: extraction)
  --limit=<number>    Limit items to process (max: 200,000)
  --reprocess-all     Don't skip existing extractions/sentiments
  --force-jsonl       Force JSONL format even for small batches (testing)
  -h, --help          Show help

Batch Format:
  - Key-and-request objects: Used for batches up to ${JSONL_THRESHOLD.toLocaleString()} items
  - JSONL file: Automatically used for larger batches (up to 200K items, 2GB)
  - Use --force-jsonl to test JSONL functionality with small batches

Examples:
  # Restaurant extraction (default)
  npm run init-batch
  npm run init-batch -- --posts --limit=100
  npm run init-batch -- --comments --limit=75000

  # Sentiment analysis
  npm run init-batch -- --sentiment --posts --limit=1000
  npm run init-batch -- --sentiment --comments

  # Test JSONL with small batch
  npm run init-batch -- --sentiment --posts --limit=10 --force-jsonl

After initialization:
  - Check status: npm run batch-jobs list
  - Poll results: npm run check-batch -- <BatchJob ID>
    `);
    process.exit(0);
  }

  const contentType = args.includes('--comments') ? 'comment' : 'post';
  const jobType = args.includes('--sentiment') ? 'sentiment' : 'extraction';
  const skipExisting = !args.includes('--reprocess-all');
  const forceJsonl = args.includes('--force-jsonl');

  const limitArg = args.find((arg) => arg.startsWith('--limit='));
  const limit = limitArg ? parseInt(limitArg.split('=')[1], 10) : undefined;

  console.log(
    `🚀 Initializing Batch ${jobType === 'sentiment' ? 'Sentiment Analysis' : 'Extraction'} Job`
  );
  console.log('='.repeat(80));
  console.log(`   Type: ${contentType}`);
  console.log(`   Job: ${jobType}`);
  console.log(`   Skip Existing: ${skipExisting ? 'Yes' : 'No'}`);
  console.log(`   Limit: ${limit || 'None (up to 1000)'}`);
  console.log(
    `   Format: ${forceJsonl || (limit && limit > JSONL_THRESHOLD) ? 'JSONL file' : 'Inline requests'}`
  );
  console.log(`   💰 Cost: 50% savings with Batch API!`);

  try {
    let result;
    if (jobType === 'sentiment') {
      if (contentType === 'post') {
        result = await initializePostSentimentBatch(
          limit,
          skipExisting,
          forceJsonl
        );
      } else {
        result = await initializeCommentSentimentBatch(
          limit,
          skipExisting,
          forceJsonl
        );
      }
    } else {
      if (contentType === 'post') {
        result = await initializePostBatch(limit, skipExisting);
      } else {
        result = await initializeCommentBatch(limit, skipExisting);
      }
    }

    if (result) {
      console.log('\n' + '='.repeat(80));
      console.log('✅ Batch job initialized and submitted to Gemini!');
      console.log('='.repeat(80));
      console.log(`\n📋 BatchJob ID: ${result.id}`);
      console.log(`⏳ Status: ${result.status}`);
      console.log(
        `\n💡 Next steps:\n   1. List jobs: npm run batch-jobs list\n   2. Check this job: npm run check-batch -- ${result.id}`
      );
    }
  } catch (error) {
    console.error('❌ Fatal error:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

initializeBatch()
  .then(() => {
    console.log('\n✅ Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
  });
