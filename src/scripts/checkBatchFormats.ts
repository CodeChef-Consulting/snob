import dotenv from '@dotenvx/dotenvx';
dotenv.config();

import { PrismaClient } from '@prisma/client';
import { fetchGeminiBatchJob } from '../utils/gemini';

const prisma = new PrismaClient();

async function checkBatchFormats() {
  console.log('\n🔍 Checking Batch Job Formats (Inline vs JSONL)');
  console.log('='.repeat(80));

  const batches = await prisma.batchJob.findMany({
    where: {
      status: 'succeeded',
      geminiJobName: { not: null },
    },
    orderBy: { id: 'asc' },
  });

  console.log(`\n   Found ${batches.length} successful batches with Gemini job names\n`);

  const results = [];

  for (const batch of batches) {
    try {
      console.log(`   Checking batch #${batch.id}...`);

      const geminiJob = await fetchGeminiBatchJob(batch.geminiJobName!);

      let format = 'unknown';
      let hasMetadata = false;

      if (geminiJob.dest?.inlinedResponses) {
        format = 'inline';
        // Check if first response has metadata/key
        if (geminiJob.dest.inlinedResponses.length > 0) {
          const firstResponse = geminiJob.dest.inlinedResponses[0];
          // Check for metadata in the response structure
          hasMetadata = !!(firstResponse as any).metadata || !!(firstResponse as any).key;
        }
      } else if (geminiJob.dest?.fileName || geminiJob.dest?.gcsUri) {
        format = 'JSONL';
        // JSONL format - would need to download to check for metadata
        // For now, assume batches created after a certain date have metadata
        const cutoffDate = new Date('2025-11-15T10:00:00Z'); // Around when we added metadata
        hasMetadata = batch.createdAt >= cutoffDate;
      }

      results.push({
        id: batch.id,
        displayName: batch.displayName,
        format,
        itemCount: batch.itemCount,
        hasMetadata,
        createdAt: batch.createdAt,
        contentType: batch.contentType,
      });

      console.log(
        `      ✓ Batch #${batch.id}: ${format} (${batch.itemCount} items)${hasMetadata ? ' [has metadata]' : ''}`
      );
    } catch (error) {
      console.error(`      ✗ Error checking batch #${batch.id}:`, error);
      results.push({
        id: batch.id,
        displayName: batch.displayName,
        format: 'error',
        itemCount: batch.itemCount,
        hasMetadata: false,
        createdAt: batch.createdAt,
        contentType: batch.contentType,
      });
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log('📊 Summary by Format');
  console.log('='.repeat(80));

  const inlineCount = results.filter((r) => r.format === 'inline').length;
  const jsonlCount = results.filter((r) => r.format === 'JSONL').length;
  const withMetadata = results.filter((r) => r.hasMetadata).length;
  const withoutMetadata = results.filter((r) => !r.hasMetadata).length;

  console.log(`\n   Inline responses: ${inlineCount}`);
  console.log(`   JSONL responses: ${jsonlCount}`);
  console.log(`   With metadata/key: ${withMetadata}`);
  console.log(`   Without metadata/key: ${withoutMetadata}`);

  console.log('\n' + '='.repeat(80));
  console.log('📋 Detailed Results');
  console.log('='.repeat(80));
  console.log('');

  console.log(
    'ID'.padEnd(6) +
      'Type'.padEnd(10) +
      'Format'.padEnd(8) +
      'Items'.padEnd(8) +
      'Metadata'.padEnd(10) +
      'Created'
  );
  console.log('-'.repeat(80));

  for (const result of results) {
    console.log(
      result.id.toString().padEnd(6) +
        result.contentType.padEnd(10) +
        result.format.padEnd(8) +
        result.itemCount.toString().padEnd(8) +
        (result.hasMetadata ? 'Yes' : 'No').padEnd(10) +
        result.createdAt.toISOString().split('T')[0]
    );
  }
}

checkBatchFormats()
  .then(() => {
    console.log('\n✅ Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
