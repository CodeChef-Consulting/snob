import dotenv from '@dotenvx/dotenvx';
dotenv.config();

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function findCandidates() {
  console.log('🔍 Finding diverse test candidate comments...\n');

  // 1. Comments with specific restaurant names
  const specificRestaurants = await prisma.comment.findMany({
    where: {
      OR: [
        { body: { contains: 'Bestia', mode: 'insensitive' } },
        { body: { contains: 'Republique', mode: 'insensitive' } },
        { body: { contains: 'Guelaguetza', mode: 'insensitive' } },
        { body: { contains: 'Sqirl', mode: 'insensitive' } },
        { body: { contains: 'Jon & Vinny', mode: 'insensitive' } },
        { body: { contains: 'Animal', mode: 'insensitive' } },
        { body: { contains: 'Langer', mode: 'insensitive' } },
      ],
      ups: { gt: 50 },
    },
    include: { post: true, parentComment: true },
    orderBy: { ups: 'desc' },
    take: 10,
  });

  console.log('📍 COMMENTS WITH SPECIFIC RESTAURANT NAMES:\n');
  specificRestaurants.forEach((c, i) => {
    console.log(`${i + 1}. Comment ID: ${c.id}`);
    console.log(`   Upvotes: ${c.ups}`);
    console.log(`   URL: https://reddit.com${c.permalink || ''}`);
    console.log(`   Post: "${c.post.title?.substring(0, 60)}..."`);
    console.log(`   Text: "${c.body?.substring(0, 120)}..."`);
    console.log('');
  });

  // 2. Comments with negative sentiment words
  const negativeComments = await prisma.comment.findMany({
    where: {
      OR: [
        { body: { contains: 'overrated', mode: 'insensitive' } },
        { body: { contains: 'disappointing', mode: 'insensitive' } },
        { body: { contains: 'terrible', mode: 'insensitive' } },
        { body: { contains: 'worst', mode: 'insensitive' } },
        { body: { contains: 'avoid', mode: 'insensitive' } },
        { body: { contains: 'not worth', mode: 'insensitive' } },
      ],
      ups: { gt: 20 },
    },
    include: { post: true, parentComment: true },
    orderBy: { ups: 'desc' },
    take: 10,
  });

  console.log('\n👎 COMMENTS WITH NEGATIVE SENTIMENT:\n');
  negativeComments.forEach((c, i) => {
    console.log(`${i + 1}. Comment ID: ${c.id}`);
    console.log(`   Upvotes: ${c.ups}`);
    console.log(`   URL: https://reddit.com${c.permalink || ''}`);
    console.log(`   Post: "${c.post.title?.substring(0, 60)}..."`);
    console.log(`   Text: "${c.body?.substring(0, 120)}..."`);
    console.log('');
  });

  // 3. Comments with positive sentiment words
  const positiveComments = await prisma.comment.findMany({
    where: {
      OR: [
        { body: { contains: 'best', mode: 'insensitive' } },
        { body: { contains: 'amazing', mode: 'insensitive' } },
        { body: { contains: 'incredible', mode: 'insensitive' } },
        { body: { contains: 'favorite', mode: 'insensitive' } },
        { body: { contains: 'highly recommend', mode: 'insensitive' } },
      ],
      ups: { gt: 50 },
    },
    include: { post: true, parentComment: true },
    orderBy: { ups: 'desc' },
    take: 10,
  });

  console.log('\n👍 COMMENTS WITH POSITIVE SENTIMENT:\n');
  positiveComments.forEach((c, i) => {
    console.log(`${i + 1}. Comment ID: ${c.id}`);
    console.log(`   Upvotes: ${c.ups}`);
    console.log(`   URL: https://reddit.com${c.permalink || ''}`);
    console.log(`   Post: "${c.post.title?.substring(0, 60)}..."`);
    console.log(`   Text: "${c.body?.substring(0, 120)}..."`);
    console.log('');
  });

  // 4. Comments with dish mentions
  const dishComments = await prisma.comment.findMany({
    where: {
      OR: [
        { body: { contains: 'burger', mode: 'insensitive' } },
        { body: { contains: 'pizza', mode: 'insensitive' } },
        { body: { contains: 'taco', mode: 'insensitive' } },
        { body: { contains: 'sushi', mode: 'insensitive' } },
        { body: { contains: 'pasta', mode: 'insensitive' } },
        { body: { contains: 'ramen', mode: 'insensitive' } },
      ],
      ups: { gt: 30 },
    },
    include: { post: true, parentComment: true },
    orderBy: { ups: 'desc' },
    take: 10,
  });

  console.log('\n🍔 COMMENTS WITH DISH MENTIONS:\n');
  dishComments.forEach((c, i) => {
    console.log(`${i + 1}. Comment ID: ${c.id}`);
    console.log(`   Upvotes: ${c.ups}`);
    console.log(`   URL: https://reddit.com${c.permalink || ''}`);
    console.log(`   Post: "${c.post.title?.substring(0, 60)}..."`);
    console.log(`   Text: "${c.body?.substring(0, 120)}..."`);
    console.log('');
  });

  // 5. Comments with comparisons
  const comparisonComments = await prisma.comment.findMany({
    where: {
      OR: [
        { body: { contains: 'better than', mode: 'insensitive' } },
        { body: { contains: 'worse than', mode: 'insensitive' } },
        { body: { contains: 'compared to', mode: 'insensitive' } },
        { body: { contains: 'vs', mode: 'insensitive' } },
      ],
      ups: { gt: 20 },
    },
    include: { post: true, parentComment: true },
    orderBy: { ups: 'desc' },
    take: 10,
  });

  console.log('\n⚖️  COMMENTS WITH COMPARISONS:\n');
  comparisonComments.forEach((c, i) => {
    console.log(`${i + 1}. Comment ID: ${c.id}`);
    console.log(`   Upvotes: ${c.ups}`);
    console.log(`   URL: https://reddit.com${c.permalink || ''}`);
    console.log(`   Post: "${c.post.title?.substring(0, 60)}..."`);
    console.log(`   Text: "${c.body?.substring(0, 120)}..."`);
    console.log('');
  });

  await prisma.$disconnect();
}

findCandidates().catch(console.error);
