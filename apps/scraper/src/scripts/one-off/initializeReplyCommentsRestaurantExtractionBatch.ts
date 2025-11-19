import { config } from '@dotenvx/dotenvx';
config({ path: ['../../../.env'] });

import { PrismaClient } from '@repo/db';
import { unlink, writeFile } from 'fs/promises';
import { join } from 'path';
import { getGenAI, updateBatchJobStatus } from '../../utils/gemini';
import { createCommentExtractionPrompt } from '../../utils/prompts';
import { flatMap } from 'lodash';

const prisma = new PrismaClient();

// Configuration
const BATCH_SIZE = 6000;

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
 * Initialize batch job for reply comments that were missed
 * These are comments with parentExternalId but no parentCommentId
 */
async function initializeReplyCommentsBatch(limit?: number) {
  console.log('\n💬 Initializing Reply Comments Restaurant Extraction Batch');
  console.log('='.repeat(80));
  console.log(
    '   Target: Comments with parentExternalId but NO parentCommentId'
  );
  console.log('='.repeat(80));

  const ai = getGenAI();

  // Find orphaned reply comments that need extraction
  const allExistingCommentExtractionBatchJobIds =
    await prisma.batchJob.findMany({
      where: {
        contentType: 'comment',
        displayName: { contains: 'reply-comment-extraction' },
        status: { in: ['pending', 'running', 'submitted'] },
      },
      select: { itemIds: true },
    });

  const allItemIds = flatMap(
    allExistingCommentExtractionBatchJobIds.map((b) => b.itemIds as number[])
  );

  console.log(`   Found ${allItemIds.length} item IDs in existing batch jobs`);

  const whereClause = {
    AND: [
      // Must have parentExternalId (is a reply)
      { parentExternalId: { not: null } },
      // Must NOT have parentCommentId (orphaned)
      { parentCommentId: null },
      // Skip comments already in pending batch jobs
      {
        id: {
          notIn: allItemIds,
        },
      },
    ],
  };

  const totalComments = await prisma.comment.count({ where: whereClause });

  console.log(`   Total orphaned reply comments: ${totalComments}`);
  if (limit) {
    console.log(`   Limiting to: ${limit} comments`);
  }

  const comments = await prisma.comment.findMany({
    where: whereClause,
    take: limit || BATCH_SIZE,
    include: {
      post: { select: { title: true, body: true } },
    },
  });

  if (comments.length === 0) {
    console.log('   ⚠️  No orphaned reply comments to process!');
    return null;
  }

  console.log(`   📊 Found ${comments.length} comments to process`);
  console.log(
    `   📋 Sample comment IDs: ${comments
      .slice(0, 5)
      .map((c) => c.id)
      .join(', ')}...`
  );

  const commentIds = comments.map((c) => c.id);

  // Create BatchJob record
  const batchJobRecord = await prisma.batchJob.create({
    data: {
      displayName: `reply-comment-extraction-${Date.now()}`,
      model: 'gemini-2.5-flash-lite',
      contentType: 'comment',
      itemCount: comments.length,
      itemIds: commentIds,
      status: 'pending',
    },
  });

  console.log(`   📋 Created BatchJob #${batchJobRecord.id}`);

  try {
    // For reply comments, we'll try to get parent comment body if it exists
    // but since parentCommentId is null, we need to look it up by parentExternalId
    const parentExternalIds = comments
      .map((c) => c.parentExternalId)
      .filter((id): id is string => id !== null);

    const parentComments = await prisma.comment.findMany({
      where: {
        externalId: { in: parentExternalIds },
      },
      select: { externalId: true, body: true },
    });

    const parentCommentMap = new Map(
      parentComments.map((c) => [c.externalId, c.body])
    );

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
                  parent_text:
                    (comment.parentExternalId &&
                      parentCommentMap.get(comment.parentExternalId)) ||
                    '',
                }),
              },
            ],
            role: 'user',
          },
        ],
      },
    }));

    console.log(
      `   📤 Submitting ${comments.length} requests to Gemini Batch API (JSONL)...`
    );

    // Submit batch job to Gemini using JSONL
    const fileName = await createJsonlBatchFile(
      keyAndRequests,
      batchJobRecord.displayName
    );
    const geminiBatchJob = await ai.batches.create({
      model: 'gemini-2.5-flash-lite',
      src: fileName,
      config: {
        displayName: batchJobRecord.displayName,
      },
    });

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
    //delete batch if error message includes "rate-limits"
    if (error instanceof Error && error.message.includes('rate-limits')) {
      await prisma.batchJob.delete({
        where: { id: batchJobRecord.id },
      });
    }
    throw error;
  }
}

/**
 * Main initialization function
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Usage: tsx src/scripts/one-off/initializeReplyCommentsRestaurantExtractionBatch.ts [options]

Options:
  --limit=<number>    Limit comments to process (default: 6000, max: 200,000)
  -h, --help          Show help

Purpose:
  Process orphaned reply comments that have parentExternalId but no parentCommentId.
  These comments were saved before their parent was processed in the original scraping.

Examples:
  npm run one-off -- one-off/initializeReplyCommentsRestaurantExtractionBatch.ts
  npm run one-off -- one-off/initializeReplyCommentsRestaurantExtractionBatch.ts --limit=500

After initialization:
  - Check status: npm run batch-jobs list
  - Poll results: npm run check-batch -- <BatchJob ID>
    `);
    process.exit(0);
  }

  const limitArg = args.find((arg) => arg.startsWith('--limit='));
  const limit = limitArg ? parseInt(limitArg.split('=')[1], 10) : undefined;

  console.log(`🚀 Initializing Reply Comments Restaurant Extraction Batch Job`);
  console.log('='.repeat(80));
  console.log(`   Limit: ${limit || `None (up to ${BATCH_SIZE})`}`);
  console.log(`   Format: JSONL file`);
  console.log(`   💰 Cost: 50% savings with Batch API!`);

  try {
    const result = await initializeReplyCommentsBatch(limit);

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

main()
  .then(() => {
    console.log('\n✅ Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
  });
