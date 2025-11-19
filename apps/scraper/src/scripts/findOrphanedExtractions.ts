import { config } from '@dotenvx/dotenvx';
config({ path: ['../../.env'] });

import { PrismaClient } from '@repo/db';

const prisma = new PrismaClient();

async function findOrphanedExtractions() {
  console.log(`\n🔍 Finding Orphaned Restaurant Extractions`);
  console.log('='.repeat(80));

  // Get all batch jobs with their itemIds
  const commentBatches = await prisma.batchJob.findMany({
    where: {
      contentType: 'comment',
      displayName: { contains: 'comment-extraction' },
    },
    select: {
      id: true,
      itemIds: true,
      displayName: true,
    },
  });

  // Flatten all commentIds from all batches
  const allBatchCommentIds = new Set<number>();
  for (const batch of commentBatches) {
    const itemIds = batch.itemIds as number[];
    itemIds.forEach((id) => allBatchCommentIds.add(id));
  }

  console.log(`   Total comment batches: ${commentBatches.length}`);
  console.log(`   Total comment IDs in batches: ${allBatchCommentIds.size}`);

  // Get all comment extractions
  const commentExtractions = await prisma.restaurantExtraction.findMany({
    where: {
      commentId: { not: null },
    },
    select: {
      id: true,
      commentId: true,
    },
  });

  console.log(`   Total comment extractions: ${commentExtractions.length}`);

  // Find orphaned extractions (commentId not in any batch)
  const orphanedExtractions = commentExtractions.filter(
    (extraction) => !allBatchCommentIds.has(extraction.commentId!)
  );

  console.log(`\n📊 Results:`);
  console.log(`   Orphaned comment extractions: ${orphanedExtractions.length}`);

  if (orphanedExtractions.length > 0) {
    console.log(`\n   First 20 orphaned extraction IDs:`);
    orphanedExtractions.slice(0, 20).forEach((e) => {
      console.log(`      Extraction ID: ${e.id}, Comment ID: ${e.commentId}`);
    });

    // Check if 355506 is in the orphaned list
    const has355506 = orphanedExtractions.some((e) => e.commentId === 355506);
    console.log(
      `\n   🔎 Does commentId 355506 exist in orphaned extractions? ${has355506 ? '✅ YES' : '❌ NO'}`
    );

    if (has355506) {
      const extraction355506 = orphanedExtractions.find(
        (e) => e.commentId === 355506
      );
      console.log(`      Extraction ID: ${extraction355506?.id}`);
    }
  }

  console.log('\n✅ Done!\n');
}

findOrphanedExtractions()
  .then(() => prisma.$disconnect())
  .catch((error) => {
    console.error(error);
    prisma.$disconnect();
    process.exit(1);
  });
