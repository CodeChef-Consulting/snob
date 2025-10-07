import dotenv from '@dotenvx/dotenvx';
dotenv.config();

import snoowrap from 'snoowrap';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const r = new snoowrap({
  userAgent: process.env.REDDIT_USER_AGENT!,
  clientId: process.env.REDDIT_CLIENT_ID!,
  clientSecret: process.env.REDDIT_CLIENT_SECRET!,
  username: process.env.REDDIT_USERNAME!,
  password: process.env.REDDIT_PASSWORD!,
});

async function testPermalink() {
  // Get one post from database
  const dbPost = await prisma.post.findFirst({
    select: { externalId: true, permalink: true },
  });

  if (!dbPost) {
    console.log('No posts in database');
    return;
  }

  console.log('Database post:');
  console.log('  externalId:', dbPost.externalId);
  console.log('  permalink (in DB):', dbPost.permalink);

  // Fetch from Reddit API
  const redditPost = await r.getSubmission(dbPost.externalId).fetch();

  console.log('\nReddit API post:');
  console.log('  url:', redditPost.url);
  console.log('  permalink:', redditPost.permalink);
  console.log('  ups:', redditPost.ups);
  console.log('  score:', redditPost.score);
}

testPermalink()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
