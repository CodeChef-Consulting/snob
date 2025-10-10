import dotenv from '@dotenvx/dotenvx';
dotenv.config();

import { PrismaClient } from '@prisma/client';
import { GoogleGenAI } from '@google/genai';
import {
  RestaurantExtractionResult,
  parseRestaurantExtractionResponse,
} from '../utils/gemini';

const prisma = new PrismaClient();

// Configuration
const POLL_INTERVAL = 30000; // 30 seconds

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
 * Check batch job status and retrieve results if completed
 */
async function checkBatchJob(batchJobId: number, pollUntilComplete = false) {
  const batchJob = await prisma.batchJob.findUnique({
    where: { id: batchJobId },
  });

  if (!batchJob) {
    throw new Error(`BatchJob #${batchJobId} not found`);
  }

  console.log('\n📋 Batch Job Status');
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

  // If already processed, no need to check Gemini
  if (batchJob.extractionsSaved) {
    console.log('\n✅ This batch has already been processed and saved!');
    return batchJob;
  }

  if (!batchJob.geminiJobName) {
    console.log(
      '\n⚠️  No Gemini job name found. Job may not have been submitted properly.'
    );
    return batchJob;
  }

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

  const completedStates = new Set([
    'JOB_STATE_SUCCEEDED',
    'JOB_STATE_FAILED',
    'JOB_STATE_CANCELLED',
    'JOB_STATE_EXPIRED',
  ]);

  console.log('\n⏳ Checking Gemini API status...');

  let currentJob = await ai.batches.get({ name: batchJob.geminiJobName });

  // Poll if requested
  if (pollUntilComplete && !completedStates.has(currentJob.state as any)) {
    console.log('   🔄 Polling until completion (Ctrl+C to stop)...\n');

    while (!completedStates.has(currentJob.state as any)) {
      const dbStatus =
        currentJob.state === 'JOB_STATE_RUNNING' ? 'running' : 'submitted';

      await prisma.batchJob.update({
        where: { id: batchJobId },
        data: { status: dbStatus },
      });

      console.log(
        `      [${new Date().toISOString()}] State: ${currentJob.state}`
      );
      await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL));
      currentJob = await ai.batches.get({ name: batchJob.geminiJobName! });
    }
  }

  console.log(`\n   Gemini Status: ${currentJob.state}`);

  if (!completedStates.has(currentJob.state as any)) {
    console.log(
      '\n⏸️  Job still processing. Run with --poll to wait for completion.'
    );
    return batchJob;
  }

  // Map Gemini states to DB states
  const statusMap: Record<string, string> = {
    JOB_STATE_SUCCEEDED: 'succeeded',
    JOB_STATE_FAILED: 'failed',
    JOB_STATE_CANCELLED: 'cancelled',
    JOB_STATE_EXPIRED: 'expired',
  };

  const finalStatus = statusMap[currentJob.state as string] || 'failed';

  await prisma.batchJob.update({
    where: { id: batchJobId },
    data: {
      status: finalStatus,
      completedAt: new Date(),
      error:
        currentJob.state !== 'JOB_STATE_SUCCEEDED'
          ? `Job ended with state: ${currentJob.state}`
          : null,
    },
  });

  if (currentJob.state !== 'JOB_STATE_SUCCEEDED') {
    console.log(`\n❌ Batch job ${finalStatus}!`);
    return batchJob;
  }

  // Process and save results
  console.log('\n📥 Retrieving and saving results...');

  const itemIds = batchJob.itemIds as number[];
  let processed = 0;
  let errors = 0;

  if (currentJob.dest?.inlinedResponses) {
    console.log(
      `   Processing ${currentJob.dest.inlinedResponses.length} responses...`
    );

    for (let i = 0; i < currentJob.dest.inlinedResponses.length; i++) {
      const response = currentJob.dest.inlinedResponses[i];
      const itemId = itemIds[i];

      try {
        if (response.response?.text) {
          const extraction = parseRestaurantExtractionResponse(
            response.response.text
          );

          if (batchJob.contentType === 'post') {
            await saveExtraction(
              { ...extraction, postId: itemId },
              batchJob.model
            );
          } else {
            await saveExtraction(
              { ...extraction, commentId: itemId },
              batchJob.model
            );
          }

          processed++;

          if (processed % 100 === 0) {
            console.log(`      Saved ${processed}/${itemIds.length}...`);
          }
        } else if (response.error) {
          console.error(`      Error for item ${itemId}:`, response.error);
          errors++;
        }
      } catch (error) {
        console.error(`      Error saving item ${itemId}:`, error);
        errors++;
      }
    }
  }

  // Mark extractions as saved
  await prisma.batchJob.update({
    where: { id: batchJobId },
    data: {
      extractionsSaved: true,
      extractionsSavedAt: new Date(),
      successCount: processed,
      errorCount: errors,
    },
  });

  console.log('\n' + '='.repeat(80));
  console.log('✅ Batch processing complete!');
  console.log('='.repeat(80));
  console.log(`   Saved: ${processed}`);
  console.log(`   Errors: ${errors}`);
  console.log(`   Total: ${processed + errors}`);

  return batchJob;
}

/**
 * Check all pending/submitted/running jobs
 */
async function checkAllPendingJobs() {
  const pendingJobs = await prisma.batchJob.findMany({
    where: {
      status: { in: ['submitted', 'running'] },
      extractionsSaved: false,
    },
    orderBy: { createdAt: 'asc' },
  });

  console.log(`\n🔍 Found ${pendingJobs.length} jobs to check`);

  for (const job of pendingJobs) {
    console.log(`\n${'='.repeat(80)}`);
    await checkBatchJob(job.id, false);
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Usage: tsx src/scripts/checkBatch.ts [BatchJob ID] [options]

Arguments:
  <BatchJob ID>       ID of the batch job to check

Options:
  --poll              Keep polling until job completes
  --all               Check all pending jobs
  -h, --help          Show help

Examples:
  # Check status of specific job
  npm run check-batch -- 123

  # Poll until completion
  npm run check-batch -- 123 --poll

  # Check all pending jobs
  npm run check-batch -- --all

After checking:
  - If job is complete, results are automatically saved
  - If still processing, run again later or use --poll
    `);
    process.exit(0);
  }

  try {
    if (args.includes('--all')) {
      await checkAllPendingJobs();
    } else {
      const batchJobId = parseInt(args[0], 10);

      if (isNaN(batchJobId)) {
        console.error('❌ Invalid BatchJob ID. Must be a number.');
        console.log('Run with --help for usage information.');
        process.exit(1);
      }

      const pollUntilComplete = args.includes('--poll');
      await checkBatchJob(batchJobId, pollUntilComplete);
    }
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
