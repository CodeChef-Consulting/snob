import dotenv from '@dotenvx/dotenvx';
dotenv.config();

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function backfillScrapingSessions() {
  console.log('Starting backfill of scraping sessions...\n');

  // Get all scraping sessions ordered by creation time (newest first)
  const sessions = await prisma.scrapingSession.findMany({
    orderBy: { createdAt: 'desc' },
  });

  console.log(`Found ${sessions.length} scraping sessions\n`);

  let totalPostsUpdated = 0;
  let totalCommentsUpdated = 0;

  // Process sessions in reverse chronological order
  for (const session of sessions) {
    const modeLabel = session.mode === 'search'
      ? `${session.mode} "${session.searchQuery}"`
      : session.mode;

    console.log(`Processing session #${session.id}: ${modeLabel} (${session.timeframe || 'no timeframe'}) - Created: ${session.createdAt.toISOString()}`);

    // Find posts that were created in the database around the time of this session
    // and don't already have a session assigned
    const posts = await prisma.post.findMany({
      where: {
        scrapingSessionId: null,
        createdAt: {
          // Posts created within 1 hour before or after the session
          gte: new Date(session.createdAt.getTime() - 60 * 60 * 1000),
          lte: new Date(session.createdAt.getTime() + 60 * 60 * 1000),
        },
      },
    });

    if (posts.length > 0) {
      // Update posts to link to this session
      const postUpdate = await prisma.post.updateMany({
        where: {
          id: { in: posts.map(p => p.id) },
        },
        data: {
          scrapingSessionId: session.id,
        },
      });

      totalPostsUpdated += postUpdate.count;
      console.log(`  ✅ Linked ${postUpdate.count} posts to session #${session.id}`);
    }

    // Find comments that were created around the time of this session
    const comments = await prisma.comment.findMany({
      where: {
        scrapingSessionId: null,
        createdAt: {
          gte: new Date(session.createdAt.getTime() - 60 * 60 * 1000),
          lte: new Date(session.createdAt.getTime() + 60 * 60 * 1000),
        },
      },
    });

    if (comments.length > 0) {
      // Update comments to link to this session
      const commentUpdate = await prisma.comment.updateMany({
        where: {
          id: { in: comments.map(c => c.id) },
        },
        data: {
          scrapingSessionId: session.id,
        },
      });

      totalCommentsUpdated += commentUpdate.count;
      console.log(`  ✅ Linked ${commentUpdate.count} comments to session #${session.id}`);
    }

    if (posts.length === 0 && comments.length === 0) {
      console.log(`  ⚠️  No unlinked posts or comments found for this session`);
    }

    console.log('');
  }

  console.log(`\n✅ Backfill complete!`);
  console.log(`   Total posts linked: ${totalPostsUpdated}`);
  console.log(`   Total comments linked: ${totalCommentsUpdated}`);

  // Show stats
  const unlinkedPosts = await prisma.post.count({
    where: { scrapingSessionId: null },
  });

  const unlinkedComments = await prisma.comment.count({
    where: { scrapingSessionId: null },
  });

  if (unlinkedPosts > 0 || unlinkedComments > 0) {
    console.log(`\n⚠️  Remaining unlinked data:`);
    console.log(`   Posts: ${unlinkedPosts}`);
    console.log(`   Comments: ${unlinkedComments}`);
    console.log(`   (These were likely created outside any session window)`);
  }
}

backfillScrapingSessions()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
