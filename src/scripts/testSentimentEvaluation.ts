import dotenv from '@dotenvx/dotenvx';
dotenv.config();

import { PrismaClient } from '@prisma/client';
import * as gemini from '../utils/gemini';
import * as openrouter from '../utils/openrouter';

const prisma = new PrismaClient();

// Configuration - choose AI provider
const AI_PROVIDER =
  process.argv.includes('--openrouter') || process.argv.includes('--deepseek')
    ? 'openrouter'
    : 'gemini';

const ai = AI_PROVIDER === 'openrouter' ? openrouter : gemini;

// Test configuration - supports both id and externalId
let TEST_COMMENTS: Array<number | string> = [];
const TEST_POSTS: Array<{ id: number | string; shouldTraversePost?: boolean }> =
  [];

async function testEvaluations() {
  const providerName =
    AI_PROVIDER === 'openrouter'
      ? `OpenRouter (${openrouter.DEFAULT_OPENROUTER_MODEL})`
      : `Gemini (${gemini.DEFAULT_GEMINI_MODEL})`;
  console.log(`🧪 Testing ${providerName} Sentiment Evaluation\n`);
  console.log('='.repeat(80));

  const random10Comments = await prisma.comment.findMany({
    orderBy: { ups: 'desc' },
    where: {
      restaurantExtraction: {
        isSubjective: true,
      },
    },
    take: 10,
  });
  TEST_COMMENTS = random10Comments.map((comment) => comment.id);

  try {
    // Test Comments
    for (let i = 0; i < TEST_COMMENTS.length; i++) {
      const commentIdentifier = TEST_COMMENTS[i];
      console.log(
        `\n💬 TEST ${i + 1}: Comment (${typeof commentIdentifier === 'number' ? 'ID' : 'External ID'}: ${commentIdentifier})`
      );
      console.log('-'.repeat(80));

      const comment = await prisma.comment.findFirst({
        where:
          typeof commentIdentifier === 'number'
            ? { id: commentIdentifier }
            : { externalId: commentIdentifier },
        include: { post: true },
      });

      if (!comment) {
        console.log(`   ⚠️  Comment not found`);
        continue;
      }

      console.log(`   URL: https://reddit.com${comment.permalink || ''}`);
      console.log(`   Comment: "${comment.body?.substring(0, 200)}..."`);

      const evaluation = await ai.evaluateComment({
        comment_text: comment.body || '',
        post_title: comment.post.title || '',
      });
      console.log(`   ✅ Score: ${evaluation.rawAiScore}`);
    }

    // Test Posts
    for (let i = 0; i < TEST_POSTS.length; i++) {
      const { id: postIdentifier, shouldTraversePost = false } = TEST_POSTS[i];
      console.log(
        `\n📝 TEST ${TEST_COMMENTS.length + i + 1}: Post (${typeof postIdentifier === 'number' ? 'ID' : 'External ID'}: ${postIdentifier})${shouldTraversePost ? ' + Top 5 Comments' : ''}`
      );
      console.log('-'.repeat(80));

      const post = await prisma.post.findFirst({
        where:
          typeof postIdentifier === 'number'
            ? { id: postIdentifier }
            : { externalId: postIdentifier },
      });

      if (!post) {
        console.log(`   ⚠️  Post not found`);
        continue;
      }

      console.log(`   URL: https://reddit.com${post.permalink || ''}`);
      console.log(`   Title: ${post.title}`);
      console.log(`   Body: "${post.body?.substring(0, 200)}..."`);

      const evaluation = await ai.evaluatePost({
        post_title: post.title || '',
        post_text: post.body || '',
      });
      console.log(`   ✅ Score: ${evaluation.rawAiScore}`);

      // If shouldTraversePost, get top 5 comments
      if (shouldTraversePost) {
        console.log(`\n   🔽 Evaluating top 5 comments for this post...\n`);

        const topComments = await prisma.comment.findMany({
          where: { postId: post.id },
          include: { post: true },
          orderBy: { ups: 'desc' },
          take: 5,
        });

        for (let j = 0; j < topComments.length; j++) {
          const comment = topComments[j];
          console.log(
            `\n   💬 Comment ${j + 1}/5 (ID: ${comment.id}, ${comment.ups || 0} upvotes)`
          );
          console.log(`   URL: https://reddit.com${comment.permalink || ''}`);
          console.log(`   Text: "${comment.body?.substring(0, 200)}..."`);

          const commentEvaluation = await ai.evaluateComment({
            comment_text: comment.body || '',
            post_title: comment.post.title || '',
          });
          console.log(`   ✅ Score: ${commentEvaluation.rawAiScore}`);
        }
      }
    }

    console.log('\n' + '='.repeat(80));
    console.log('✅ Testing complete!\n');
  } catch (error) {
    console.error('❌ Error during testing:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

testEvaluations()
  .then(() => {
    console.log('Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
