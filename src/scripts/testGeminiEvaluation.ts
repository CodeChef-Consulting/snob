import dotenv from '@dotenvx/dotenvx';
dotenv.config();

import { PrismaClient } from '@prisma/client';
import {
  evaluateComment,
  evaluatePost,
  extractCommentRestaurantInfo,
  extractPostRestaurantInfo,
} from '../utils/gemini';

const prisma = new PrismaClient();

// Test configuration - supports both id and externalId
const TEST_COMMENTS: Array<number | string> = ['niif15h'];
const TEST_POSTS: Array<{ id: number | string; shouldTraversePost?: boolean }> =
  [];

async function testEvaluations() {
  console.log('🧪 Testing Gemini AI Extraction and Evaluation\n');
  console.log('='.repeat(80));

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
        include: { post: true, parentComment: true },
      });

      if (!comment) {
        console.log(`   ⚠️  Comment not found`);
        continue;
      }

      console.log(`   URL: https://reddit.com${comment.permalink || ''}`);
      console.log(`   Comment: "${comment.body?.substring(0, 100)}..."`);

      const extraction = await extractCommentRestaurantInfo({
        post_title: comment.post.title || '',
        post_text: comment.post.body || '',
        comment_text: comment.body || '',
        parent_text: comment.parentComment?.body || '',
      });

      console.log(`   Restaurants: ${extraction.restaurantsMentioned}`);
      console.log(`   Primary: ${extraction.primaryRestaurant}`);
      console.log(`   Dishes: ${extraction.dishesMentioned}`);
      console.log(`   Subjective: ${extraction.isSubjective}`);

      if (
        extraction.restaurantsMentioned !== 'NONE' &&
        extraction.isSubjective
      ) {
        const evaluation = await evaluateComment({
          comment_text: comment.body || '',
          post_title: comment.post.title || '',
        });
        console.log(`   ✅ EVALUATED - Score: ${evaluation.rawAiScore}`);
      } else {
        console.log(`   ⏭️  SKIPPED - Not relevant or not subjective`);
      }
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

      // Evaluate the post
      const extraction = await extractPostRestaurantInfo({
        post_title: post.title || '',
        post_text: post.body || '',
      });

      console.log(`   Restaurants: ${extraction.restaurantsMentioned}`);
      console.log(`   Primary: ${extraction.primaryRestaurant}`);
      console.log(`   Dishes: ${extraction.dishesMentioned}`);
      console.log(`   Subjective: ${extraction.isSubjective}`);

      if (
        extraction.restaurantsMentioned !== 'NONE' &&
        extraction.isSubjective
      ) {
        const evaluation = await evaluatePost({
          post_title: post.title || '',
          post_text: post.body || '',
        });
        console.log(`   ✅ EVALUATED - Score: ${evaluation.rawAiScore}`);
      } else {
        console.log(`   ⏭️  SKIPPED - Not relevant or not subjective`);
      }

      // If shouldTraversePost, get top 5 comments
      if (shouldTraversePost) {
        console.log(`\n   🔽 Evaluating top 5 comments for this post...\n`);

        const topComments = await prisma.comment.findMany({
          where: { postId: post.id },
          include: { parentComment: true, post: true },
          orderBy: { ups: 'desc' },
          take: 5,
        });

        for (let j = 0; j < topComments.length; j++) {
          const comment = topComments[j];
          console.log(
            `\n   💬 Comment ${j + 1}/5 (ID: ${comment.id}, ${comment.ups || 0} upvotes)`
          );
          console.log(`   URL: https://reddit.com${comment.permalink || ''}`);
          console.log(`   Text: "${comment.body?.substring(0, 100)}..."`);

          const commentExtraction = await extractCommentRestaurantInfo({
            post_title: post.title || '',
            post_text: post.body || '',
            comment_text: comment.body || '',
            parent_text: comment.parentComment?.body || '',
          });

          console.log(
            `   Restaurants: ${commentExtraction.restaurantsMentioned}`
          );
          console.log(`   Primary: ${commentExtraction.primaryRestaurant}`);
          console.log(`   Dishes: ${commentExtraction.dishesMentioned}`);
          console.log(`   Subjective: ${commentExtraction.isSubjective}`);

          if (
            commentExtraction.restaurantsMentioned !== 'NONE' &&
            commentExtraction.isSubjective
          ) {
            const commentEvaluation = await evaluateComment({
              comment_text: comment.body || '',
              post_title: comment.post.title || '',
            });
            console.log(
              `   ✅ EVALUATED - Score: ${commentEvaluation.rawAiScore}`
            );
          } else {
            console.log(`   ⏭️  SKIPPED - Not relevant or not subjective`);
          }
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
