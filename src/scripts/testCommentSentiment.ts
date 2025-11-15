import dotenv from '@dotenvx/dotenvx';
dotenv.config();

import { PrismaClient } from '@prisma/client';
import { evaluateComment } from '../utils/gemini';
import { createCommentSentimentPrompt } from '../utils/prompts';

const prisma = new PrismaClient();

async function testCommentSentiment(commentId: number) {
  console.log(`\n🧪 Testing Sentiment Extraction for Comment #${commentId}`);
  console.log('='.repeat(80));

  try {
    // Fetch the comment
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      include: {
        post: { select: { title: true, body: true } },
        parentComment: { select: { body: true } },
        restaurantExtraction: true,
        sentimentExtraction: true,
      },
    });

    if (!comment) {
      console.log(`   ❌ Comment #${commentId} not found!`);
      return;
    }

    console.log(`\n📋 Comment Details:`);
    console.log(`   ID: ${comment.id}`);
    console.log(`   Post: ${comment.post.title}`);
    console.log(`   Body: ${comment.body?.substring(0, 100)}...`);
    console.log(`   Has Restaurant Extraction: ${!!comment.restaurantExtraction}`);
    console.log(`   Has Sentiment Extraction: ${!!comment.sentimentExtraction}`);

    if (comment.restaurantExtraction) {
      console.log(`\n   Restaurant Extraction:`);
      console.log(`      isSubjective: ${comment.restaurantExtraction.isSubjective}`);
      console.log(
        `      restaurantsMentioned: ${JSON.stringify(comment.restaurantExtraction.restaurantsMentioned)}`
      );
      console.log(
        `      primaryRestaurant: ${comment.restaurantExtraction.primaryRestaurant}`
      );
    }

    if (comment.sentimentExtraction) {
      console.log(`\n   Existing Sentiment:`);
      console.log(`      rawAiScore: ${comment.sentimentExtraction.rawAiScore}`);
    }

    // Generate the prompt
    const prompt = createCommentSentimentPrompt({
      comment_text: comment.body || '',
      post_title: comment.post.title || '',
    });

    console.log(`\n📝 Generated Prompt:`);
    console.log('-'.repeat(80));
    console.log(prompt);
    console.log('-'.repeat(80));

    // Call Gemini API directly
    console.log(`\n🤖 Calling Gemini API...`);
    const result = await evaluateComment({
      comment_text: comment.body || '',
      post_title: comment.post.title || '',
    });

    console.log(`\n📤 Gemini Result:`);
    console.log('-'.repeat(80));
    console.log(JSON.stringify(result, null, 2));
    console.log('-'.repeat(80));

    const parsedScore = result.rawAiScore;
    console.log(`\n✅ Parsed Score: ${parsedScore}`);

    // Optionally save the result
    if (parsedScore !== null && parsedScore !== undefined) {
      console.log(`\n💾 Saving sentiment extraction...`);
      await prisma.sentimentExtraction.upsert({
        where: { commentId: comment.id },
        create: {
          commentId: comment.id,
          rawAiScore: parsedScore,
        },
        update: {
          rawAiScore: parsedScore,
        },
      });
      console.log(`   ✅ Saved!`);
    }
  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Get comment ID from command line args
const commentId = parseInt(process.argv[2] || '215905', 10);

testCommentSentiment(commentId)
  .then(() => {
    console.log('\n✅ Test complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Test failed:', error);
    process.exit(1);
  });
