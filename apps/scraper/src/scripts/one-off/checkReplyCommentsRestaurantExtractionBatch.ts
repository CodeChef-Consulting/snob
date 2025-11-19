import { config } from '@dotenvx/dotenvx';
config({ path: ['../../../.env'] });

import type { BatchJob as GeminiBatchJob } from '@google/genai';
import { JobState } from '@google/genai';
import { PrismaClient } from '@repo/db';
import {
  parseRestaurantExtractionResponse,
  TERMINAL_STATES,
  geminiStateToDatabaseStatus,
  fetchGeminiBatchJob,
  saveExtraction,
  updateBatchJobStatus,
  markExtractionsAsSaved,
} from '../../utils/gemini';

const prisma = new PrismaClient();

// Configuration
const POLL_INTERVAL = 30000; // 30 seconds

/**
 * Check batch job status and retrieve results if completed
 * Special handling for reply comments: updates parentCommentId after saving extractions
 */
async function checkReplyCommentsBatch(
  batchJobId: number,
  pollUntilComplete = false,
  forceReprocess = false
) {
  const batchJob = await prisma.batchJob.findUnique({
    where: { id: batchJobId },
  });

  if (!batchJob) {
    throw new Error(`BatchJob #${batchJobId} not found`);
  }

  // Validate this is a reply comment extraction batch
  if (!batchJob.displayName?.includes('reply-comment-extraction')) {
    throw new Error(
      `BatchJob #${batchJobId} is not a reply-comment-extraction batch (name: ${batchJob.displayName})`
    );
  }

  console.log('\n📋 Reply Comments Batch Job Status');
  console.log('='.repeat(80));
  console.log(`   ID: ${batchJob.id}`);
  console.log(`   Name: ${batchJob.displayName}`);
  console.log(`   Type: ${batchJob.contentType}`);
  console.log(`   Status: ${batchJob.status}`);
  console.log(`   Items: ${batchJob.itemCount}`);

  if (batchJob.geminiJobName) {
    console.log(`   Gemini Job: ${batchJob.geminiJobName}`);
  }

  if (batchJob.submittedAt) {
    console.log(`   Submitted: ${batchJob.submittedAt.toISOString()}`);
  }

  if (batchJob.completedAt) {
    const duration = Math.round(
      (batchJob.completedAt.getTime() - batchJob.createdAt.getTime()) / 1000
    );
    console.log(
      `   Completed: ${batchJob.completedAt.toISOString()} (${duration}s)`
    );
  }

  console.log(
    `   Extractions Saved: ${batchJob.extractionsSaved ? 'Yes' : 'No'}`
  );
  console.log(
    `   Results: ${batchJob.successCount} success, ${batchJob.errorCount} errors`
  );

  if (batchJob.error) {
    console.log(`   ❌ Error: ${batchJob.error}`);
  }

  // If already processed, no need to check Gemini (unless forcing reprocess)
  if (batchJob.extractionsSaved && !forceReprocess) {
    console.log('\n✅ This batch has already been processed and saved!');
    console.log('   Use --reprocess flag to force reprocessing.');
    return batchJob;
  }

  if (forceReprocess && batchJob.extractionsSaved) {
    console.log('\n🔄 Force reprocessing batch (--reprocess flag detected)...');
  }

  if (!batchJob.geminiJobName) {
    console.log(
      '\n⚠️  No Gemini job name found. Job may not have been submitted properly.'
    );
    return batchJob;
  }

  console.log('\n⏳ Checking Gemini API status...');

  let currentJob: GeminiBatchJob = await fetchGeminiBatchJob(
    batchJob.geminiJobName
  );

  // Poll if requested
  if (
    pollUntilComplete &&
    currentJob.state &&
    !TERMINAL_STATES.has(currentJob.state as JobState)
  ) {
    console.log('   🔄 Polling until completion (Ctrl+C to stop)...\n');

    while (
      currentJob.state &&
      !TERMINAL_STATES.has(currentJob.state as JobState)
    ) {
      const dbStatus = geminiStateToDatabaseStatus(currentJob.state);

      await updateBatchJobStatus(prisma, batchJobId, dbStatus);

      console.log(
        `      [${new Date().toISOString()}] State: ${currentJob.state}`
      );
      await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL));
      currentJob = await fetchGeminiBatchJob(batchJob.geminiJobName!);
    }
  }

  console.log(`\n   Gemini Status: ${currentJob.state}`);

  if (!currentJob.state || !TERMINAL_STATES.has(currentJob.state as JobState)) {
    console.log(
      '\n⏸️  Job still processing. Run with --poll to wait for completion.'
    );
    return batchJob;
  }

  const finalStatus = geminiStateToDatabaseStatus(currentJob.state);

  await updateBatchJobStatus(prisma, batchJobId, finalStatus, {
    completedAt: new Date(),
    error:
      currentJob.state !== JobState.JOB_STATE_SUCCEEDED
        ? `Job ended with state: ${currentJob.state}`
        : null,
  });

  if (currentJob.state !== JobState.JOB_STATE_SUCCEEDED) {
    console.log(`\n❌ Batch job ${finalStatus}!`);
    return batchJob;
  }

  // Process and save results
  console.log('\n📥 Retrieving and saving results...');

  const itemIds = batchJob.itemIds as number[];
  let processed = 0;
  let errors = 0;

  // Only handle JSONL responses (this script assumes JSONL)
  if (currentJob.dest?.fileName || currentJob.dest?.gcsUri) {
    const fileSource = currentJob.dest.fileName || currentJob.dest.gcsUri;
    console.log(`   📥 Downloading JSONL results from ${fileSource}...`);

    try {
      const ai = require('../../utils/gemini').getGenAI();

      // Download the result file to tmp directory
      const fs = await import('fs/promises');
      const path = await import('path');

      const tmpDir = path.join(process.cwd(), 'tmp');
      await fs.mkdir(tmpDir, { recursive: true });

      // Create a temp file path
      const fileName = fileSource!.replace('files/', '').replace(/\//g, '-');
      const tmpFilePath = path.join(tmpDir, `${fileName}.jsonl`);

      // Download file
      await ai.files.download({
        file: fileSource,
        downloadPath: tmpFilePath,
      });

      // Check if file exists at expected path
      let actualFilePath = tmpFilePath;
      try {
        await fs.access(tmpFilePath);
      } catch {
        // File not at expected path, find it in tmp directory
        const files = await fs.readdir(tmpDir);
        const downloadedFile = files.find((f) => f.endsWith('.jsonl'));

        if (!downloadedFile) {
          throw new Error('Downloaded file not found in tmp directory');
        }

        actualFilePath = path.join(tmpDir, downloadedFile);

        if (actualFilePath !== tmpFilePath) {
          throw new Error('Downloaded file path does not match expected path');
        }
      }

      console.log(`   ✅ Downloaded to: ${actualFilePath}`);

      // Wait for file to be fully written
      let prevSize = 0;
      let stable = 0;
      while (stable < 3) {
        await new Promise((resolve) => setTimeout(resolve, 200));
        const stats = await fs.stat(actualFilePath);
        if (stats.size === prevSize) {
          stable++;
        } else {
          stable = 0;
          prevSize = stats.size;
        }
      }

      const text = await fs.readFile(actualFilePath, 'utf-8');
      const lines = text.split('\n').filter((line) => line.trim());

      console.log(`   Processing ${lines.length} JSONL responses...`);

      for (let i = 0; i < lines.length; i++) {
        let itemId = itemIds[i];

        try {
          const jsonResponse = JSON.parse(lines[i]);

          if (jsonResponse.key) {
            const key = parseInt(jsonResponse.key, 10);
            itemId = key;
          }

          // Extract text from response structure
          const responseText =
            jsonResponse.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
            jsonResponse.response?.text;

          if (responseText) {
            const extraction = parseRestaurantExtractionResponse(responseText);

            await saveExtraction(
              prisma,
              { ...extraction, commentId: itemId },
              batchJob.model,
              true
            );

            processed++;

            if (processed % 1000 === 0) {
              console.log(`      Saved ${processed}/${itemIds.length}...`);
            }
          } else if (jsonResponse.error) {
            console.error(
              `      Error for item ${itemId}:`,
              jsonResponse.error
            );
            errors++;
          }
        } catch (error) {
          console.error(`      Error parsing/saving item ${itemId}:`, error);
          errors++;
        }
      }

      // Clean up tmp file
      await fs.unlink(actualFilePath);
    } catch (error) {
      console.error('   ❌ Error downloading JSONL results:', error);
      throw error;
    }
  } else {
    throw new Error(
      'Expected JSONL response format, but got inline responses. This batch should use JSONL.'
    );
  }

  // Mark extractions as saved
  await markExtractionsAsSaved(prisma, batchJobId, processed, errors);

  console.log('\n' + '='.repeat(80));
  console.log('✅ Batch processing complete!');
  console.log('='.repeat(80));
  console.log(`   Saved: ${processed}`);
  console.log(`   Errors: ${errors}`);
  console.log(`   Total: ${processed + errors}`);

  // Now update parentCommentId for all processed comments
  console.log('\n🔗 Updating parentCommentId for reply comments...');

  const comments = await prisma.comment.findMany({
    where: {
      id: { in: itemIds },
      parentExternalId: { not: null },
      parentCommentId: null,
    },
    select: { id: true, parentExternalId: true },
  });

  console.log(`   Found ${comments.length} comments to update`);

  if (comments.length > 0) {
    // Get unique parent external IDs
    const parentExternalIds = [
      ...new Set(comments.map((c) => c.parentExternalId).filter(Boolean)),
    ] as string[];

    // Look up parent comments
    const parentComments = await prisma.comment.findMany({
      where: { externalId: { in: parentExternalIds } },
      select: { id: true, externalId: true },
    });

    const parentIdMap = new Map(
      parentComments.map((c) => [c.externalId, c.id])
    );

    console.log(
      `   Found ${parentComments.length} parent comments in database`
    );

    // Update comments with their parentCommentId
    let updated = 0;
    for (const comment of comments) {
      if (comment.parentExternalId) {
        const parentId = parentIdMap.get(comment.parentExternalId);
        if (parentId) {
          await prisma.comment.update({
            where: { id: comment.id },
            data: { parentCommentId: parentId },
          });
          updated++;

          if (updated % 100 === 0) {
            console.log(`      Updated ${updated}/${comments.length}...`);
          }
        }
      }
    }

    console.log(`   ✅ Updated ${updated} comments with parentCommentId`);

    if (updated < comments.length) {
      console.log(
        `   ⚠️  ${comments.length - updated} comments still missing parent (parent not in DB)`
      );
    }
  }

  return batchJob;
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Usage: tsx src/scripts/one-off/checkReplyCommentsRestaurantExtractionBatch.ts <BatchJob ID> [options]

Arguments:
  <BatchJob ID>       ID of the reply-comment-extraction batch job to check (required)

Options:
  --poll              Keep polling until job completes
  --reprocess         Force reprocess batch even if already saved
  -h, --help          Show help

Purpose:
  Check status of reply comment extraction batch and update parentCommentId.
  After saving extractions, this script links comments to their parents via parentCommentId.

Examples:
  npm run one-off -- one-off/checkReplyCommentsRestaurantExtractionBatch.ts 123
  npm run one-off -- one-off/checkReplyCommentsRestaurantExtractionBatch.ts 123 --poll
  npm run one-off -- one-off/checkReplyCommentsRestaurantExtractionBatch.ts 123 --reprocess

After checking:
  - If job is complete, results are automatically saved
  - parentCommentId is updated for all processed comments
  - If still processing, run again later or use --poll
    `);
    process.exit(0);
  }

  if (args.length === 0) {
    console.error('❌ BatchJob ID is required.');
    console.log('Run with --help for usage information.');
    process.exit(1);
  }

  try {
    const batchJobId = parseInt(args[0], 10);

    if (isNaN(batchJobId)) {
      console.error('❌ Invalid BatchJob ID. Must be a number.');
      console.log('Run with --help for usage information.');
      process.exit(1);
    }

    const pollUntilComplete = args.includes('--poll');
    const forceReprocess = args.includes('--reprocess');

    await checkReplyCommentsBatch(
      batchJobId,
      pollUntilComplete,
      forceReprocess
    );
  } catch (error) {
    console.error('❌ Error:', error);
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
