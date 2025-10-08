import dotenv from '@dotenvx/dotenvx';
dotenv.config();

import { createRedditClient } from '../utils/reddit';

const r = createRedditClient();

async function testCommentMedia() {
  const postId = process.argv[2] || '1c4mw27';
  console.log(`Fetching post ${postId} comments...`);

  const submission = await r.getSubmission(postId).fetch();
  const comments = await submission.comments.fetchAll();

  console.log(`\nFound ${comments.length} top-level comments\n`);

  // Find first few comments and inspect their structure
  let inspected = 0;
  for (const comment of comments as any[]) {
    if (inspected >= 3) break;

    console.log(`\n=== Comment ${comment.id} ===`);
    console.log('Author:', comment.author?.name);
    console.log('Body (first 100 chars):', comment.body?.substring(0, 100));
    console.log('\nChecking for media fields:');
    console.log('- media_metadata:', comment.media_metadata ? 'EXISTS' : 'undefined');
    console.log('- media:', comment.media ? 'EXISTS' : 'undefined');
    console.log('- gallery_data:', comment.gallery_data ? 'EXISTS' : 'undefined');
    console.log('- preview:', comment.preview ? 'EXISTS' : 'undefined');
    console.log('- is_gallery:', comment.is_gallery);

    if (comment.media_metadata) {
      console.log('\nMedia metadata found:');
      console.log(JSON.stringify(comment.media_metadata, null, 2));
    }

    if (comment.media) {
      console.log('\nMedia found:');
      console.log(JSON.stringify(comment.media, null, 2));
    }

    inspected++;
  }

  console.log(`\n\nInspected ${inspected} comments`);
}

testCommentMedia()
  .catch(console.error)
  .finally(() => process.exit());
