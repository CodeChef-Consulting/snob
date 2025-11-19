import { config } from '@dotenvx/dotenvx';
config({ path: ['../../.env'] });

import { PrismaClient } from '@repo/db';

const prisma = new PrismaClient();

async function deleteBatches(batchIds: number[]) {
  console.log(`\n🗑️  Deleting Restaurant Extractions and Batches`);
  console.log('='.repeat(80));

  for (const batchId of batchIds) {
    console.log(`\nProcessing Batch ${batchId}...`);

    // Get batch info
    const batch = await prisma.batchJob.findUnique({
      where: { id: batchId },
      select: {
        id: true,
        displayName: true,
        contentType: true,
        geminiJobName: true,
        itemIds: true,
      },
    });

    if (!batch) {
      console.log(`❌ Batch ${batchId} not found`);
      continue;
    }

    console.log(`   Type: ${batch.contentType}`);
    console.log(`   Name: ${batch.displayName}`);
    console.log(`   Gemini Job: ${batch.geminiJobName}`);

    const isCommentBatch = batch.contentType === 'comment';
    const itemIds = batch.itemIds as number[];

    // Step 1: Count and disconnect restaurant relationships (clears junction tables)
    if (isCommentBatch) {
      const commentsWithRestaurants = await prisma.comment.findMany({
        where: {
          id: { in: itemIds },
          restaurantsMentioned: { some: {} },
        },
        select: { id: true },
      });
      console.log(`   Comments with restaurant links: ${commentsWithRestaurants.length}`);

      for (const comment of commentsWithRestaurants) {
        await prisma.comment.update({
          where: { id: comment.id },
          data: { restaurantsMentioned: { set: [] } },
        });
      }
      console.log(`   ✅ Cleared ${commentsWithRestaurants.length} _CommentToRestaurant relationships`);
    } else {
      const postsWithRestaurants = await prisma.post.findMany({
        where: {
          id: { in: itemIds },
          restaurantsMentioned: { some: {} },
        },
        select: { id: true },
      });
      console.log(`   Posts with restaurant links: ${postsWithRestaurants.length}`);

      for (const post of postsWithRestaurants) {
        await prisma.post.update({
          where: { id: post.id },
          data: { restaurantsMentioned: { set: [] } },
        });
      }
      console.log(`   ✅ Cleared ${postsWithRestaurants.length} _PostToRestaurant relationships`);
    }

    // Step 2: Count and delete restaurant extractions
    const extractionCount = await prisma.restaurantExtraction.count({
      where: {
        [isCommentBatch ? 'commentId' : 'postId']: {
          in: itemIds,
        },
      },
    });
    console.log(`   Extractions to delete: ${extractionCount}`);

    const deleteResult = await prisma.restaurantExtraction.deleteMany({
      where: {
        [isCommentBatch ? 'commentId' : 'postId']: {
          in: itemIds,
        },
      },
    });
    console.log(`   ✅ Deleted ${deleteResult.count} extractions`);

    // Delete the batch job itself
    await prisma.batchJob.delete({
      where: { id: batchId },
    });
    console.log(`   ✅ Deleted batch job ${batchId}`);
  }

  console.log('\n✅ Done!\n');
}

const batchIds = process.argv.slice(2).map(Number);

if (batchIds.length === 0) {
  console.error('Usage: tsx deleteBatches.ts <batchId1> [batchId2] ...');
  process.exit(1);
}

deleteBatches(batchIds)
  .then(() => prisma.$disconnect())
  .catch((error) => {
    console.error(error);
    prisma.$disconnect();
    process.exit(1);
  });
