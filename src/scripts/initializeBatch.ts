import dotenv from '@dotenvx/dotenvx';
dotenv.config();

import { PrismaClient } from '@prisma/client';
import { getGenAI, updateBatchJobStatus } from '../utils/gemini';
import {
  createPostExtractionPrompt,
  createCommentExtractionPrompt,
} from '../utils/prompts';
import { writeFile, unlink } from 'fs/promises';
import { join } from 'path';

const prisma = new PrismaClient();

// Configuration
const BATCH_SIZE = 1000;
const JSONL_THRESHOLD = 50000; // Use JSONL for batches larger than this

interface InitializeConfig {
  contentType: 'post' | 'comment';
  limit?: number;
  skipExisting?: boolean;
}

/**
 * Create JSONL file for large batch jobs
 * Returns the file URI after uploading to Gemini
 */
async function createJsonlBatchFile(
  requests: Array<{ contents: Array<{ parts: Array<{ text: string }>; role: string }> }>,
  displayName: string
): Promise<string> {
  const ai = getGenAI();
  const tmpDir = join(process.cwd(), 'tmp');
  const jsonlPath = join(tmpDir, `${displayName}.jsonl`);

  console.log(`   📝 Creating JSONL file with ${requests.length} requests...`);

  // Create JSONL content - each line is a separate JSON request
  const jsonlContent = requests
    .map((request) => JSON.stringify({ request }))
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
  console.log(`   💾 Written ${jsonlPath} (${(jsonlContent.length / 1024 / 1024).toFixed(2)} MB)`);

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

    console.log(`   ✅ File uploaded: ${uploadedFile.uri}`);

    // Clean up local file
    await unlink(jsonlPath);

    return uploadedFile.uri || '';
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

  const whereClause = skipExisting ? { restaurantExtraction: null } : {};
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
      model: 'gemini-2.5-flash',
      contentType: 'post',
      itemCount: posts.length,
      itemIds: postIds,
      status: 'pending',
    },
  });

  console.log(`   📋 Created BatchJob #${batchJobRecord.id}`);

  try {
    // Create batch requests
    const inlineRequests = posts.map((post) => ({
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
    }));

    console.log(`   📤 Submitting ${posts.length} requests to Gemini Batch API...`);

    // Determine if we need JSONL format
    const useJsonl = posts.length > JSONL_THRESHOLD;

    if (useJsonl) {
      console.log(`   🗂️  Large batch detected (>${JSONL_THRESHOLD}), using JSONL format...`);
    }

    // Submit batch job to Gemini
    let geminiBatchJob;
    if (useJsonl) {
      const fileUri = await createJsonlBatchFile(inlineRequests, batchJobRecord.displayName);
      geminiBatchJob = await ai.batches.create({
        model: 'gemini-2.5-flash',
        src: {
          format: 'jsonl',
          gcsUri: [fileUri]
        },
        config: {
          displayName: batchJobRecord.displayName,
        },
      });
    } else {
      geminiBatchJob = await ai.batches.create({
        model: 'gemini-2.5-flash',
        src: inlineRequests,
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

  const whereClause = skipExisting ? { restaurantExtraction: null } : {};
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
      model: 'gemini-2.5-flash',
      contentType: 'comment',
      itemCount: comments.length,
      itemIds: commentIds,
      status: 'pending',
    },
  });

  console.log(`   📋 Created BatchJob #${batchJobRecord.id}`);

  try {
    const inlineRequests = comments.map((comment) => ({
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
    }));

    console.log(`   📤 Submitting ${comments.length} requests to Gemini Batch API...`);

    // Determine if we need JSONL format
    const useJsonl = comments.length > JSONL_THRESHOLD;

    if (useJsonl) {
      console.log(`   🗂️  Large batch detected (>${JSONL_THRESHOLD}), using JSONL format...`);
    }

    // Submit batch job to Gemini
    let geminiBatchJob;
    if (useJsonl) {
      const fileUri = await createJsonlBatchFile(inlineRequests, batchJobRecord.displayName);
      geminiBatchJob = await ai.batches.create({
        model: 'gemini-2.5-flash',
        src: {
          format: 'jsonl',
          gcsUri: [fileUri]
        },
        config: {
          displayName: batchJobRecord.displayName,
        },
      });
    } else {
      geminiBatchJob = await ai.batches.create({
        model: 'gemini-2.5-flash',
        src: inlineRequests,
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
  --limit=<number>    Limit items to process (max: 200,000)
  --reprocess-all     Don't skip existing extractions
  -h, --help          Show help

Batch Format:
  - Inline requests: Used for batches up to ${JSONL_THRESHOLD.toLocaleString()} items
  - JSONL file: Automatically used for larger batches (up to 200K items, 2GB)

Examples:
  npm run init-batch
  npm run init-batch -- --posts --limit=100
  npm run init-batch -- --comments --limit=75000

After initialization:
  - Check status: npm run batch-jobs list
  - Poll results: npm run check-batch -- <BatchJob ID>
    `);
    process.exit(0);
  }

  const contentType = args.includes('--comments') ? 'comment' : 'post';
  const skipExisting = !args.includes('--reprocess-all');

  const limitArg = args.find((arg) => arg.startsWith('--limit='));
  const limit = limitArg ? parseInt(limitArg.split('=')[1], 10) : undefined;

  console.log('🚀 Initializing Batch Extraction Job');
  console.log('='.repeat(80));
  console.log(`   Type: ${contentType}`);
  console.log(`   Skip Existing: ${skipExisting ? 'Yes' : 'No'}`);
  console.log(`   Limit: ${limit || 'None (up to 1000)'}`);
  console.log(`   Format: ${limit && limit > JSONL_THRESHOLD ? 'JSONL file' : 'Inline requests'}`);
  console.log(`   💰 Cost: 50% savings with Batch API!`);

  try {
    let result;
    if (contentType === 'post') {
      result = await initializePostBatch(limit, skipExisting);
    } else {
      result = await initializeCommentBatch(limit, skipExisting);
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
