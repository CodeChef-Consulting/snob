import { config } from '@dotenvx/dotenvx';
config({ path: ['../../.env'] });

import { PrismaClient } from '@repo/db';
import { createRedditClient, extractMediaUrls } from '../../utils/reddit';

const prisma = new PrismaClient();
const r = createRedditClient();

async function refetchAllPostMedia(minimumPostId?: number) {
  console.log('Fetching all posts from database...');
  if (minimumPostId) {
    console.log(`Resuming from post ID: ${minimumPostId}`);
  }

  const posts = await prisma.post.findMany({
    where: minimumPostId ? { id: { gte: minimumPostId } } : undefined,
    select: { id: true, externalId: true, title: true },
    orderBy: { id: 'asc' },
  });

  console.log(`Found ${posts.length} posts to process\n`);

  let processed = 0;
  let newMediaCount = 0;
  let errorCount = 0;
  let lastSuccessfulPostId: number | null = null;
  let lastSuccessfulExternalId: string | null = null;

  for (const dbPost of posts) {
    try {
      processed++;

      if (processed % 10 === 0) {
        console.log(`[${processed}/${posts.length}] Processing...`);
      }

      // Fetch post from Reddit
      // @ts-ignore - snoowrap has circular type references
      const submission: any = await r.getSubmission(dbPost.externalId).fetch();

      // Extract media URLs
      const mediaFiles = extractMediaUrls(submission);

      if (mediaFiles.length === 0) {
        lastSuccessfulPostId = dbPost.id;
        lastSuccessfulExternalId = dbPost.externalId;
        continue;
      }

      // Check which media files already exist
      const mediaFileKeys = mediaFiles.map((m: { url: string }) => ({
        postId: dbPost.id,
        fileUrl: m.url,
      }));

      const existingMediaFiles = await prisma.file.findMany({
        where: {
          OR: mediaFileKeys,
        },
        select: { postId: true, fileUrl: true },
      });

      const existingMediaSet = new Set(
        existingMediaFiles.map((m) => `${m.postId}:${m.fileUrl}`)
      );

      const newMediaFiles = [];

      for (const media of mediaFiles) {
        const key = `${dbPost.id}:${media.url}`;
        if (!existingMediaSet.has(key)) {
          newMediaFiles.push({
            postId: dbPost.id,
            fileUrl: media.url,
            fileType: media.type,
            metadata: media.metadata,
          });
        }
      }

      // Batch create new media files (skip updates since we're only adding missing gallery images)
      if (newMediaFiles.length > 0) {
        await prisma.file.createMany({
          data: newMediaFiles,
          skipDuplicates: true,
        });
        newMediaCount += newMediaFiles.length;

        console.log(
          `   [${dbPost.externalId}] Added ${newMediaFiles.length} new media files (${mediaFiles.length} total)`
        );
      }

      lastSuccessfulPostId = dbPost.id;
      lastSuccessfulExternalId = dbPost.externalId;
    } catch (error: any) {
      // Check for rate limiting errors
      if (
        error.message?.toLowerCase().includes('ratelimit') ||
        error.statusCode === 429 ||
        error.message?.toLowerCase().includes('429')
      ) {
        console.error(
          `\n🚨 RATE LIMIT ERROR at post ${dbPost.externalId} (ID: ${dbPost.id})`
        );
        console.error('Waiting 60 seconds before continuing...');
        await new Promise((resolve) => setTimeout(resolve, 60000));
        console.log('Resuming...\n');
        continue; // Skip to next post after waiting
      }

      errorCount++;
      console.error(
        `   ❌ Error processing post ${dbPost.id} (${dbPost.externalId}):`,
        error.message
      );
      break;
    }
  }

  console.log('\n=== Summary ===');
  console.log(`Total posts processed: ${processed}`);
  console.log(`New media files added: ${newMediaCount}`);
  console.log(`Errors: ${errorCount}`);
  console.log(
    `Last successful post: ${lastSuccessfulExternalId} (ID: ${lastSuccessfulPostId})`
  );
}

// Get minimumPostId from command line argument if provided
const minimumPostId = process.argv[2]
  ? parseInt(process.argv[2], 10)
  : undefined;

refetchAllPostMedia(minimumPostId)
  .catch(console.error)
  .finally(() => prisma.$disconnect());
