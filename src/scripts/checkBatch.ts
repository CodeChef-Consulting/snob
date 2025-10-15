import dotenv from '@dotenvx/dotenvx';
dotenv.config();

import type { BatchJob as GeminiBatchJob } from '@google/genai';
import { JobState } from '@google/genai';
import { PrismaClient } from '@prisma/client';
import {
  parseRestaurantExtractionResponse,
  TERMINAL_STATES,
  geminiStateToDatabaseStatus,
  fetchGeminiBatchJob,
  saveExtraction,
  updateBatchJobStatus,
  markExtractionsAsSaved,
} from '../utils/gemini';
import { parseSentimentResponse } from '../utils/parsing';

const prisma = new PrismaClient();

// Configuration
const POLL_INTERVAL = 30000; // 30 seconds

/**
 * Check batch job status and retrieve results if completed
 */
async function checkBatchJob(
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

  // Handle inline responses (small batches)
  if (currentJob.dest?.inlinedResponses) {
    console.log(
      `   Processing ${currentJob.dest.inlinedResponses.length} inline responses...`
    );

    for (let i = 0; i < currentJob.dest.inlinedResponses.length; i++) {
      const response = currentJob.dest.inlinedResponses[i];
      const itemId = itemIds[i];

      const responseText =
        response.response?.candidates?.[0]?.content?.parts?.[0]?.text;

      try {
        if (responseText) {
          // Handle sentiment jobs
          if (batchJob.displayName?.includes('sentiment')) {
            const sentiment = parseSentimentResponse(responseText);

            await prisma.sentimentExtraction.upsert({
              where:
                batchJob.contentType === 'post'
                  ? { postId: itemId }
                  : { commentId: itemId },
              create: {
                ...(batchJob.contentType === 'post'
                  ? { postId: itemId }
                  : { commentId: itemId }),
                rawAiScore: sentiment.rawAiScore,
                model: batchJob.model,
                extractedAt: new Date(),
              },
              update: {
                rawAiScore: sentiment.rawAiScore,
                model: batchJob.model,
                extractedAt: new Date(),
              },
            });
          }
          // Handle restaurant extraction jobs
          else {
            const extraction = parseRestaurantExtractionResponse(responseText);

            if (batchJob.contentType === 'post') {
              await saveExtraction(
                prisma,
                { ...extraction, postId: itemId },
                batchJob.model
              );
            } else {
              await saveExtraction(
                prisma,
                { ...extraction, commentId: itemId },
                batchJob.model
              );
            }
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
  // Handle JSONL file responses (large batches)
  else if (currentJob.dest?.gcsUri) {
    console.log(
      `   📥 Downloading JSONL results from ${currentJob.dest.gcsUri}...`
    );

    try {
      const ai = require('../utils/gemini').getGenAI();
      const resultFile = await ai.files.get({ name: currentJob.dest.gcsUri });

      if (resultFile.uri) {
        // Download and parse JSONL results
        const response = await fetch(resultFile.uri);
        const text = await response.text();
        const lines = text.trim().split('\n');

        console.log(`   Processing ${lines.length} JSONL responses...`);

        for (let i = 0; i < lines.length; i++) {
          if (!lines[i].trim()) continue;

          const itemId = itemIds[i];

          try {
            const jsonResponse = JSON.parse(lines[i]);

            if (jsonResponse.response?.text) {
              // Handle sentiment jobs
              if (batchJob.displayName?.includes('sentiment')) {
                const sentiment = parseSentimentResponse(
                  jsonResponse.response.text
                );

                await prisma.sentimentExtraction.upsert({
                  where:
                    batchJob.contentType === 'post'
                      ? { postId: itemId }
                      : { commentId: itemId },
                  create: {
                    ...(batchJob.contentType === 'post'
                      ? { postId: itemId }
                      : { commentId: itemId }),
                    rawAiScore: sentiment.rawAiScore,
                    model: batchJob.model,
                    extractedAt: new Date(),
                  },
                  update: {
                    rawAiScore: sentiment.rawAiScore,
                    model: batchJob.model,
                    extractedAt: new Date(),
                  },
                });
              }
              // Handle restaurant extraction jobs
              else {
                const extraction = parseRestaurantExtractionResponse(
                  jsonResponse.response.text
                );

                if (batchJob.contentType === 'post') {
                  await saveExtraction(
                    prisma,
                    { ...extraction, postId: itemId },
                    batchJob.model
                  );
                } else {
                  await saveExtraction(
                    prisma,
                    { ...extraction, commentId: itemId },
                    batchJob.model
                  );
                }
              }

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
      }
    } catch (error) {
      console.error('   ❌ Error downloading JSONL results:', error);
      throw error;
    }
  }

  // Mark extractions as saved
  await markExtractionsAsSaved(prisma, batchJobId, processed, errors);

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
  <BatchJob ID>       ID of the batch job to check (optional - checks all if omitted)

Options:
  --poll              Keep polling until job completes
  --reprocess         Force reprocess batch even if already saved
  --all               Check all pending jobs only
  -h, --help          Show help

Examples:
  # Check all batch jobs
  npm run check-batch

  # Check status of specific job
  npm run check-batch -- 123

  # Poll until completion
  npm run check-batch -- 123 --poll

  # Force reprocess a completed batch
  npm run check-batch -- 123 --reprocess

  # Check all pending jobs only
  npm run check-batch -- --all

After checking:
  - If job is complete, results are automatically saved
  - If still processing, run again later or use --poll
  - Use --reprocess to re-save results from Gemini
    `);
    process.exit(0);
  }

  try {
    // Check only pending jobs
    if (args.includes('--all')) {
      await checkAllPendingJobs();
    }
    // No args or only --poll: check all jobs
    else if (args.length === 0 || (args.length === 1 && args[0] === '--poll')) {
      const allJobs = await prisma.batchJob.findMany({
        orderBy: { createdAt: 'desc' },
      });

      console.log(`\n🔍 Found ${allJobs.length} total batch jobs`);

      for (const job of allJobs) {
        console.log(`\n${'='.repeat(80)}`);
        await checkBatchJob(job.id, false);
      }
    }
    // Check specific job
    else {
      const batchJobId = parseInt(args[0], 10);

      if (isNaN(batchJobId)) {
        console.error('❌ Invalid BatchJob ID. Must be a number.');
        console.log('Run with --help for usage information.');
        process.exit(1);
      }

      const pollUntilComplete = args.includes('--poll');
      const forceReprocess = args.includes('--reprocess');
      await checkBatchJob(batchJobId, pollUntilComplete, forceReprocess);
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
