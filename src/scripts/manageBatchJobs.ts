import dotenv from '@dotenvx/dotenvx';
dotenv.config();

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * List all batch jobs with their status
 */
async function listBatchJobs() {
  const jobs = await prisma.batchJob.findMany({
    orderBy: { createdAt: 'desc' },
    take: 20,
  });

  console.log('\n📋 Recent Batch Jobs');
  console.log('='.repeat(80));

  if (jobs.length === 0) {
    console.log('   No batch jobs found!');
    return;
  }

  for (const job of jobs) {
    const statusEmoji = {
      pending: '⏸️ ',
      submitted: '📤',
      running: '⏳',
      succeeded: '✅',
      failed: '❌',
      cancelled: '🚫',
      expired: '⏰',
    }[job.status] || '❓';

    console.log(`\n   ${statusEmoji} Job #${job.id} - ${job.displayName}`);
    console.log(`      Type: ${job.contentType}`);
    console.log(`      Status: ${job.status}`);
    console.log(`      Items: ${job.itemCount}`);
    console.log(
      `      Saved: ${job.successCount} success, ${job.errorCount} errors`
    );
    console.log(
      `      Extractions Saved: ${job.extractionsSaved ? 'Yes' : 'No'}`
    );

    if (job.geminiJobName) {
      console.log(`      Gemini Job: ${job.geminiJobName}`);
    }

    if (job.error) {
      console.log(`      Error: ${job.error}`);
    }

    console.log(`      Created: ${job.createdAt.toISOString()}`);
    if (job.completedAt) {
      const duration = Math.round(
        (job.completedAt.getTime() - job.createdAt.getTime()) / 1000
      );
      console.log(
        `      Completed: ${job.completedAt.toISOString()} (${duration}s)`
      );
    }
  }

  console.log('\n' + '='.repeat(80));

  // Summary
  const summary = {
    total: jobs.length,
    pending: jobs.filter((j) => j.status === 'pending').length,
    submitted: jobs.filter((j) => j.status === 'submitted').length,
    running: jobs.filter((j) => j.status === 'running').length,
    succeeded: jobs.filter((j) => j.status === 'succeeded').length,
    failed: jobs.filter((j) => j.status === 'failed').length,
    cancelled: jobs.filter((j) => j.status === 'cancelled').length,
    expired: jobs.filter((j) => j.status === 'expired').length,
    needsResume: jobs.filter(
      (j) =>
        j.status === 'succeeded' &&
        !j.extractionsSaved &&
        j.successCount === 0
    ).length,
  };

  console.log('\n📊 Summary (last 20 jobs)');
  console.log(`   Total: ${summary.total}`);
  console.log(`   ✅ Succeeded: ${summary.succeeded}`);
  console.log(`   ⏳ Running: ${summary.running}`);
  console.log(`   📤 Submitted: ${summary.submitted}`);
  console.log(`   ⏸️  Pending: ${summary.pending}`);
  console.log(`   ❌ Failed: ${summary.failed}`);
  console.log(`   🚫 Cancelled: ${summary.cancelled}`);
  console.log(`   ⏰ Expired: ${summary.expired}`);
  console.log(`   🔄 Needs Resume: ${summary.needsResume}`);
}

/**
 * Find incomplete jobs that need attention
 */
async function findIncompleteJobs() {
  const incompleteJobs = await prisma.batchJob.findMany({
    where: {
      OR: [
        // Jobs that succeeded but extractions weren't saved
        {
          status: 'succeeded',
          extractionsSaved: false,
        },
        // Jobs that are stuck in pending/submitted/running for >48 hours
        {
          status: { in: ['pending', 'submitted', 'running'] },
          createdAt: {
            lt: new Date(Date.now() - 48 * 60 * 60 * 1000),
          },
        },
      ],
    },
    orderBy: { createdAt: 'asc' },
  });

  console.log(`\n🔍 Found ${incompleteJobs.length} incomplete jobs`);

  for (const job of incompleteJobs) {
    const itemIds = job.itemIds as number[];
    const contentType = job.contentType;

    console.log(`\n   Job #${job.id} - ${job.displayName}`);
    console.log(`      Status: ${job.status}`);
    console.log(`      Items to process: ${itemIds.length}`);

    // Check how many items still need extraction
    if (contentType === 'post') {
      const missingExtractions = await prisma.post.count({
        where: {
          id: { in: itemIds },
          restaurantExtraction: null,
        },
      });
      console.log(`      Posts missing extraction: ${missingExtractions}`);
    } else if (contentType === 'comment') {
      const missingExtractions = await prisma.comment.count({
        where: {
          id: { in: itemIds },
          restaurantExtraction: null,
        },
      });
      console.log(`      Comments missing extraction: ${missingExtractions}`);
    }
  }

  return incompleteJobs;
}

/**
 * Clean up old failed/expired jobs
 */
async function cleanupOldJobs(daysOld = 30) {
  const cutoffDate = new Date(Date.now() - daysOld * 24 * 60 * 60 * 1000);

  const result = await prisma.batchJob.deleteMany({
    where: {
      status: { in: ['failed', 'cancelled', 'expired'] },
      createdAt: { lt: cutoffDate },
    },
  });

  console.log(`\n🧹 Cleaned up ${result.count} old failed/cancelled/expired jobs (older than ${daysOld} days)`);
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  try {
    if (command === 'list' || !command) {
      await listBatchJobs();
    } else if (command === 'incomplete') {
      await findIncompleteJobs();
    } else if (command === 'cleanup') {
      const daysArg = args.find((arg) => arg.startsWith('--days='));
      const days = daysArg ? parseInt(daysArg.split('=')[1], 10) : 30;
      await cleanupOldJobs(days);
    } else if (command === 'help' || command === '--help') {
      console.log(`
Usage: npm run batch-jobs [command] [options]

Commands:
  list              List recent batch jobs with status (default)
  incomplete        Find jobs that need attention
  cleanup           Clean up old failed jobs (default: 30 days)
  help              Show this help message

Options:
  --days=<number>   Days threshold for cleanup (default: 30)

Examples:
  npm run batch-jobs
  npm run batch-jobs list
  npm run batch-jobs incomplete
  npm run batch-jobs cleanup -- --days=7

Note: To check/retrieve incomplete jobs, use:
  npm run check-batch -- <BatchJob ID>
      `);
    } else {
      console.error(`Unknown command: ${command}`);
      console.log('Run with "help" for usage information');
      process.exit(1);
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
