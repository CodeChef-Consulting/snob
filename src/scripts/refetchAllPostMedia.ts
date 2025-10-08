import dotenv from '@dotenvx/dotenvx';
dotenv.config();

import { PrismaClient } from '@prisma/client';
import { createRedditClient, extractMediaUrls } from '../utils/reddit';

const prisma = new PrismaClient();
const r = createRedditClient();

async function refetchAllPostMedia() {
  console.log('Fetching all posts from database...');

  const posts = await prisma.post.findMany({
    select: { id: true, externalId: true, title: true },
    orderBy: { id: 'asc' },
  });

  console.log(`Found ${posts.length} posts to process\n`);

  let processed = 0;
  let newMediaCount = 0;
  let updatedMediaCount = 0;
  let errorCount = 0;

  for (const dbPost of posts) {
    try {
      processed++;

      if (processed % 10 === 0) {
        console.log(`[${processed}/${posts.length}] Processing...`);
      }

      // Fetch post from Reddit
      const submission = await r.getSubmission(dbPost.externalId).fetch();

      // Extract media URLs
      const mediaFiles = extractMediaUrls(submission);

      if (mediaFiles.length === 0) {
        continue;
      }

      // Check which media files already exist
      const mediaFileKeys = mediaFiles.map((m) => ({
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
      const existingMediaUpdates = [];

      for (const media of mediaFiles) {
        const key = `${dbPost.id}:${media.url}`;
        if (existingMediaSet.has(key)) {
          existingMediaUpdates.push({
            postId: dbPost.id,
            fileUrl: media.url,
            fileType: media.type,
            metadata: media.metadata,
          });
        } else {
          newMediaFiles.push({
            postId: dbPost.id,
            fileUrl: media.url,
            fileType: media.type,
            metadata: media.metadata,
          });
        }
      }

      // Batch create new media files
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

      // Batch update existing media files
      if (existingMediaUpdates.length > 0) {
        await Promise.all(
          existingMediaUpdates.map((media) =>
            prisma.file.update({
              where: {
                postId_fileUrl: {
                  postId: media.postId,
                  fileUrl: media.fileUrl,
                },
              },
              data: {
                fileType: media.fileType,
                metadata: media.metadata,
              },
            })
          )
        );
        updatedMediaCount += existingMediaUpdates.length;
      }
    } catch (error: any) {
      errorCount++;
      console.error(
        `   ❌ Error processing post ${dbPost.externalId}:`,
        error.message
      );
      continue;
    }
  }

  console.log('\n=== Summary ===');
  console.log(`Total posts processed: ${processed}`);
  console.log(`New media files added: ${newMediaCount}`);
  console.log(`Existing media files updated: ${updatedMediaCount}`);
  console.log(`Errors: ${errorCount}`);
}

refetchAllPostMedia()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
