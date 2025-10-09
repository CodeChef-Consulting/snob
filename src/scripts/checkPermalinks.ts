import dotenv from '@dotenvx/dotenvx';
dotenv.config();

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkPermalinks() {
  // Check posts
  const posts = await prisma.post.findMany({
    take: 10,
    select: { id: true, externalId: true, permalink: true },
  });

  console.log('Sample post permalinks:');
  posts.forEach(p => {
    console.log(`  ${p.id}: "${p.permalink}"`);
  });

  // Check comments
  const comments = await prisma.comment.findMany({
    take: 10,
    select: { id: true, externalId: true, permalink: true },
  });

  console.log('\nSample comment permalinks:');
  comments.forEach(c => {
    console.log(`  ${c.id}: ${c.permalink === null ? 'NULL' : `"${c.permalink}"`}`);
  });

  // Count nulls
  const nullCount = await prisma.comment.count({
    where: { permalink: null },
  });

  console.log(`\nComments with null permalink: ${nullCount}`);

  await prisma.$disconnect();
}

checkPermalinks().catch(console.error);
