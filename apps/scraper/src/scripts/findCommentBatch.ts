import { config } from '@dotenvx/dotenvx';
config({ path: ['../../.env'] });

import { PrismaClient } from '@repo/db';

const prisma = new PrismaClient();

async function findCommentBatch(commentId: number) {
  console.log(`\n🔍 Finding Batch for Comment ID: ${commentId}`);
  console.log('='.repeat(80));

  // Get all comment batches with 'comment-extraction' in name
  const commentBatches = await prisma.batchJob.findMany({
    where: {
      contentType: 'comment',
      displayName: { contains: 'comment-extraction' },
    },
    select: {
      id: true,
      itemIds: true,
      displayName: true,
      geminiJobName: true,
      itemCount: true,
      status: true,
    },
  });

  console.log(`\nTotal 'comment-extraction' batches: ${commentBatches.length}\n`);

  // Find which batch contains this commentId
  for (const batch of commentBatches) {
    const itemIds = batch.itemIds as number[];
    if (itemIds.includes(commentId)) {
      console.log(`✅ Found in Batch ${batch.id}!`);
      console.log(`   Display Name: ${batch.displayName}`);
      console.log(`   Gemini Job: ${batch.geminiJobName}`);
      console.log(`   Item Count: ${batch.itemCount}`);
      console.log(`   Status: ${batch.status}`);
      console.log(`   Position in batch: ${itemIds.indexOf(commentId) + 1} of ${itemIds.length}`);

      // Check if extraction exists
      const extraction = await prisma.restaurantExtraction.findFirst({
        where: { commentId },
        select: {
          id: true,
          restaurantsMentioned: true,
          primaryRestaurant: true,
          isSubjective: true,
          attemptedLinkToRestaurantsMentioned: true,
        },
      });

      if (extraction) {
        console.log(`\n   Restaurant Extraction:`);
        console.log(`      Extraction ID: ${extraction.id}`);
        console.log(`      Restaurants: ${extraction.restaurantsMentioned}`);
        console.log(`      Primary: ${extraction.primaryRestaurant}`);
        console.log(`      Subjective: ${extraction.isSubjective}`);
        console.log(`      Linked: ${extraction.attemptedLinkToRestaurantsMentioned}`);
      }

      return;
    }
  }

  console.log(`❌ Comment ID ${commentId} not found in any 'comment-extraction' batch`);
}

const commentId = parseInt(process.argv[2]);

if (!commentId) {
  console.error('Usage: tsx findCommentBatch.ts <commentId>');
  process.exit(1);
}

findCommentBatch(commentId)
  .then(() => prisma.$disconnect())
  .catch((error) => {
    console.error(error);
    prisma.$disconnect();
    process.exit(1);
  });
