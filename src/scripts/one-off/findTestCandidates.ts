import dotenv from '@dotenvx/dotenvx';
dotenv.config();

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function findCandidates() {
  console.log('🔍 Finding test candidate comments and posts...\n');

  // Find highly upvoted comments with restaurant mentions
  const comments = await prisma.comment.findMany({
    where: {
      OR: [
        { body: { contains: 'restaurant', mode: 'insensitive' } },
        { body: { contains: 'food', mode: 'insensitive' } },
        { body: { contains: 'ate', mode: 'insensitive' } },
        { body: { contains: 'menu', mode: 'insensitive' } },
        { body: { contains: 'delicious', mode: 'insensitive' } },
        { body: { contains: 'overrated', mode: 'insensitive' } },
      ],
    },
    include: {
      post: true,
      parentComment: true,
    },
    orderBy: { ups: 'desc' },
    take: 15,
  });

  console.log('📝 COMMENT CANDIDATES:\n');
  comments.forEach((comment, i) => {
    console.log(`${i + 1}. Comment ID: ${comment.id}`);
    console.log(`   Upvotes: ${comment.ups}`);
    console.log(`   URL: https://reddit.com${comment.permalink || ''}`);
    console.log(`   Post: "${(comment.post.body || comment.post.title || '').substring(0, 60)}..."`);
    if (comment.parentComment) {
      console.log(`   Parent: "${(comment.parentComment.body || '').substring(0, 60)}..."`);
    }
    console.log(`   Text: "${(comment.body || '').substring(0, 150)}..."`);
    console.log('');
  });

  // Find highly upvoted posts with restaurant content
  const posts = await prisma.post.findMany({
    where: {
      OR: [
        { body: { contains: 'restaurant', mode: 'insensitive' } },
        { body: { contains: 'food', mode: 'insensitive' } },
        { body: { contains: 'recommendations', mode: 'insensitive' } },
        { title: { contains: 'best', mode: 'insensitive' } },
        { title: { contains: 'restaurant', mode: 'insensitive' } },
      ],
    },
    orderBy: { ups: 'desc' },
    take: 10,
  });

  console.log('\n📰 POST CANDIDATES:\n');
  posts.forEach((post, i) => {
    console.log(`${i + 1}. Post ID: ${post.id}`);
    console.log(`   Upvotes: ${post.ups}`);
    console.log(`   Comments: ${post.numComments}`);
    console.log(`   Title: "${(post.title || '').substring(0, 80)}"`);
    console.log(`   Text: "${(post.body || '').substring(0, 150)}..."`);
    console.log('');
  });

  await prisma.$disconnect();
}

findCandidates().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
