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

// Toggle which tests to run
const TEST_COMMENTS = [164];
const TEST_POSTS = [];

async function testSentiments() {
  console.log('🧪 Testing Gemini AI Extraction and Sentiment\n');
  console.log('='.repeat(80));

  try {
    // Test Comments
    for (let i = 0; i < TEST_COMMENTS.length; i++) {
      const commentId = TEST_COMMENTS[i];
      console.log(`\n💬 TEST ${i + 1}: Comment (ID: ${commentId})`);
      console.log('-'.repeat(80));

      const comment = await prisma.comment.findUnique({
        where: { id: commentId },
        include: { post: true, parentComment: true },
      });

      if (!comment) {
        console.log(`   ⚠️  Comment not found`);
        continue;
      }

      console.log(`   URL: https://reddit.com${comment.permalink || ''}`);
      console.log(`   Comment: "${comment.body}"`);

      const extraction = await extractCommentRestaurantInfo({
        post_title: comment.post.title || '',
        post_text: comment.post.body || '',
        comment_text: comment.body || '',
        parent_text: comment.parentComment?.body,
      });

      console.log(`   Restaurants: ${extraction.restaurantsMentioned}`);
      console.log(`   Primary: ${extraction.primaryRestaurant}`);
      console.log(`   Dishes: ${extraction.dishesMentioned}`);
      console.log(`   Subjective: ${extraction.isSubjective}`);

      if (true) {
        const evaluation = await evaluateComment({
          post_text: comment.post.body || comment.post.title || '',
          post_upvotes: comment.post.ups || 0,
          comment_text: comment.body || '',
          comment_upvotes: comment.ups || 0,
          parent_text: comment.parentComment?.body,
        });
        console.log(`   ✅ EVALUATED - Score: ${evaluation.rawAiScore}`);
      } else {
      }
    }

    // Test Posts
    for (let i = 0; i < TEST_POSTS.length; i++) {
      const postId = TEST_POSTS[i];
      console.log(
        `\n📝 TEST ${TEST_COMMENTS.length + i + 1}: Post (ID: ${postId})`
      );
      console.log('-'.repeat(80));

      const post = await prisma.post.findUnique({
        where: { id: postId },
      });

      if (!post) {
        console.log(`   ⚠️  Post not found`);
        continue;
      }

      console.log(`   URL: https://reddit.com${post.permalink || ''}`);
      console.log(`   Title: ${post.title}`);

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
          post_text: post.body || post.title || '',
          post_upvotes: post.ups || 0,
        });
        console.log(`   ✅ EVALUATED - Score: ${evaluation.rawAiScore}`);
      } else {
        console.log(`   ⏭️  SKIPPED - Not relevant or not subjective`);
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

testSentiments()
  .then(() => {
    console.log('Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
