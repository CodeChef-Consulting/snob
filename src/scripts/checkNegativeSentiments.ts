import dotenv from '@dotenvx/dotenvx';
dotenv.config();

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const batchJobIdsToSkip = [5, 9, 25, 26, 64, 65, 66, 67, 68];

async function checkNegativeSentiments() {
  console.log('\n🔍 Checking Negative Sentiment Samples from Comment Batches');
  console.log('='.repeat(80));

  // Get all successful comment sentiment batch jobs
  const batches = await prisma.batchJob.findMany({
    where: {
      contentType: 'comment',
      displayName: { contains: 'comment-sentiment' },
      status: 'succeeded',
      id: { notIn: batchJobIdsToSkip },
    },
    orderBy: { id: 'asc' },
  });

  console.log(
    `\n   Found ${batches.length} successful comment sentiment batches\n`
  );

  for (const batch of batches) {
    const itemIds = batch.itemIds as number[];

    // Get negative sentiments from this batch
    const negativeSentiments = await prisma.sentimentExtraction.findMany({
      where: {
        commentId: { in: itemIds },
        rawAiScore: { lt: 0 },
      },
      include: {
        comment: {
          include: {
            post: { select: { title: true } },
          },
        },
      },
    });

    if (negativeSentiments.length === 0) {
      console.log(`\n📋 Batch #${batch.id}: ${batch.displayName}`);
      console.log(`   No negative sentiments found`);
      continue;
    }

    // Sample 5 random ones
    const samples = negativeSentiments
      .sort(() => Math.random() - 0.5)
      .slice(0, 100);

    console.log(`\n📋 Batch #${batch.id}: ${batch.displayName}`);
    console.log(`   Total negative: ${negativeSentiments.length}`);
    console.log(`   Samples:\n`);

    for (const sample of samples) {
      console.log(`   📍 Comment ID: ${sample.commentId}`);
      console.log(`      Score: ${sample.rawAiScore}`);
      console.log(`      Post: "${sample.comment?.post.title}"`);
      console.log(
        `      Comment: "${sample.comment?.body?.substring(0, 150)}${sample.comment?.body && sample.comment.body.length > 150 ? '...' : ''}"`
      );
      console.log('');
    }
  }
}

checkNegativeSentiments()
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
