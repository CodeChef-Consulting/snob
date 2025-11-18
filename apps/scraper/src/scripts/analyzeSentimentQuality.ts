import { config } from '@dotenvx/dotenvx';
config({ path: ['../../.env'] });

import { PrismaClient } from '@repo/db';

const prisma = new PrismaClient();

async function analyzeSentiment() {
  const extractions = await prisma.sentimentExtraction.findMany({
    take: 30,
    include: {
      post: {
        select: {
          id: true,
          title: true,
          body: true,
          score: true,
        },
      },
      comment: {
        select: {
          id: true,
          body: true,
          score: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  console.log('='.repeat(80));
  console.log('SENTIMENT EXTRACTION QUALITY ANALYSIS');
  console.log('='.repeat(80));
  console.log();

  for (const extraction of extractions) {
    const content = extraction.post?.title
      ? `POST: "${extraction.post.title}"${extraction.post.body ? `\n${extraction.post.body.slice(0, 200)}...` : ''}`
      : extraction.comment?.body
        ? `COMMENT: "${extraction.comment.body.slice(0, 300)}${extraction.comment.body.length > 300 ? '...' : ''}"`
        : 'NO CONTENT';

    console.log('-'.repeat(80));
    console.log(content);
    console.log();
    console.log(`Gemini Sentiment: ${extraction.rawAiScore} (range: -1 to 1)`);
    console.log(
      `Reddit Score: ${extraction.post?.score ?? extraction.comment?.score ?? 'N/A'}`
    );
    console.log(`Model: ${extraction.model ?? 'N/A'}`);
    console.log();
  }

  console.log('='.repeat(80));
  console.log(`Total extractions analyzed: ${extractions.length}`);
  console.log('='.repeat(80));
}

analyzeSentiment()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Error:', error);
    process.exit(1);
  });
