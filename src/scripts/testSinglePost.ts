import dotenv from '@dotenvx/dotenvx';
dotenv.config();

import snoowrap, { Comment } from 'snoowrap';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const r = new snoowrap({
  userAgent: process.env.REDDIT_USER_AGENT!,
  clientId: process.env.REDDIT_CLIENT_ID!,
  clientSecret: process.env.REDDIT_CLIENT_SECRET!,
  username: process.env.REDDIT_USERNAME!,
  password: process.env.REDDIT_PASSWORD!,
});

async function testSinglePost() {
  const postExternalId = '1c4mw27'; // Tommy's post

  console.log('Fetching post from Reddit...');
  const post = await r.getSubmission(postExternalId).fetch();

  console.log('Expanding all replies...');
  //@ts-ignore
  const comments = await post.expandReplies({ limit: Infinity, depth: Infinity });

  console.log(`Found ${comments.comments.length} top-level comments`);

  // Create a test scraping session
  const session = await prisma.scrapingSession.create({
    data: {
      subreddit: 'FoodLosAngeles',
      mode: 'top',
      timeframe: 'all',
    },
  });

  // Upsert the post
  const postCreatedAt = new Date((post.created_utc as number) * 1000);
  const dbPost = await prisma.post.upsert({
    where: { externalId: post.id as string },
    update: {
      title: post.title as string,
      author: post.author.name as string,
      scrapingSessionId: session.id,
      updatedAt: new Date(),
    },
    create: {
      externalId: post.id as string,
      title: post.title as string,
      author: post.author.name as string,
      subreddit: 'FoodLosAngeles',
      createdUtc: postCreatedAt,
      scrapingSessionId: session.id,
    },
  });

  let commentsProcessed = 0;

  async function processComment(comment: Comment) {
    let parentDbCommentId: number | null = null;
    const parentId = comment.parent_id as string;
    if (parentId.startsWith('t1_')) {
      const parentExternalId = parentId.replace('t1_', '');
      const parentComment = await prisma.comment.findUnique({
        where: { externalId: parentExternalId },
        select: { id: true },
      });
      parentDbCommentId = parentComment?.id || null;
    }

    const dbComment = await prisma.comment.upsert({
      where: { externalId: comment.id as string },
      update: {
        body: comment.body as string || '',
        score: comment.score as number,
        ups: comment.ups as number,
        depth: comment.depth as number,
        controversiality: comment.controversiality as number,
        isSubmitter: comment.is_submitter as boolean,
        scoreHidden: comment.score_hidden as boolean,
        permalink: comment.permalink as string,
        author: comment.author.name as string,
        createdUtc: new Date((comment.created_utc as number) * 1000),
        scrapingSessionId: session.id,
        updatedAt: new Date(),
      },
      create: {
        externalId: comment.id as string,
        postId: dbPost.id,
        parentCommentId: parentDbCommentId,
        body: comment.body as string || '',
        score: comment.score as number,
        ups: comment.ups as number,
        depth: comment.depth as number,
        controversiality: comment.controversiality as number,
        isSubmitter: comment.is_submitter as boolean,
        scoreHidden: comment.score_hidden as boolean,
        permalink: comment.permalink as string,
        author: comment.author.name as string,
        createdUtc: new Date((comment.created_utc as number) * 1000),
        scrapingSessionId: session.id,
      },
    });
    commentsProcessed++;

    // Recursively process nested replies
    if (comment.replies && comment.replies.length > 0) {
      for (const reply of comment.replies as Comment[]) {
        await processComment(reply);
      }
    }
  }

  console.log('Processing comments...');
  for (const comment of comments.comments as Comment[]) {
    await processComment(comment);
  }

  console.log(`\nProcessed ${commentsProcessed} total comments`);

  // Verify the parent relationships
  console.log('\nVerifying parent relationships...');
  const nestedComments = await prisma.comment.findMany({
    where: {
      postId: dbPost.id,
      parentCommentId: { not: null },
    },
    include: {
      parentComment: {
        select: {
          externalId: true,
          author: true,
          body: true,
        },
      },
    },
    orderBy: { depth: 'asc' },
    take: 10,
  });

  console.log(`Found ${nestedComments.length} nested comments (showing first 10):`);
  nestedComments.forEach(c => {
    console.log(`\n  Comment (depth ${c.depth}): ${c.author}`);
    console.log(`    Body: ${c.body?.substring(0, 60)}...`);
    console.log(`    Parent: ${c.parentComment?.author} - ${c.parentComment?.body?.substring(0, 60)}...`);
  });

  // Check depth distribution
  const depthStats = await prisma.$queryRaw<Array<{depth: number, count: bigint}>>`
    SELECT depth, COUNT(*) as count
    FROM "Comment"
    WHERE "postId" = ${dbPost.id}
    GROUP BY depth
    ORDER BY depth
  `;

  console.log('\nDepth distribution:');
  depthStats.forEach(stat => {
    console.log(`  Depth ${stat.depth}: ${stat.count} comments`);
  });

  // Cleanup test session
  await prisma.scrapingSession.delete({
    where: { id: session.id },
  });
  console.log('\nTest session cleaned up');
}

testSinglePost()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
