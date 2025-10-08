import dotenv from '@dotenvx/dotenvx';
dotenv.config();

import { createRedditClient, extractMediaUrls } from '../utils/reddit';

const r = createRedditClient();

async function testPostMedia() {
  const postId = process.argv[2] || '1c4mw27';
  console.log(`Fetching post ${postId}...`);

  const submission = await r.getSubmission(postId).fetch();

  console.log('\n=== Post Info ===');
  console.log('Title:', submission.title);
  console.log('URL:', submission.url);
  console.log('is_gallery:', submission.is_gallery);
  console.log('is_video:', submission.is_video);

  console.log('\n=== Gallery Data ===');
  if (submission.is_gallery) {
    console.log('gallery_data:', JSON.stringify(submission.gallery_data, null, 2));
    console.log('\n=== Media Metadata ===');
    const mediaMetadata = submission.media_metadata;
    if (mediaMetadata) {
      console.log('Number of media items:', Object.keys(mediaMetadata).length);
      Object.entries(mediaMetadata).forEach(([id, data]: [string, any]) => {
        console.log(`\n${id}:`);
        console.log('  status:', data.status);
        console.log('  e:', data.e);
        console.log('  m:', data.m);
        if (data.s) {
          console.log('  source url:', data.s.u || data.s.gif || data.s.mp4);
          console.log('  dimensions:', `${data.s.x}x${data.s.y}`);
        }
      });
    }
  }

  console.log('\n=== Preview ===');
  if (submission.preview?.images) {
    console.log('Preview images count:', submission.preview.images.length);
  }

  console.log('\n=== Current extractMediaUrls Result ===');
  const media = extractMediaUrls(submission);
  console.log(`Found ${media.length} media files:`);
  media.forEach((m, i) => {
    console.log(`${i + 1}. ${m.type}: ${m.url.substring(0, 100)}...`);
  });
}

testPostMedia()
  .catch(console.error)
  .finally(() => process.exit());
