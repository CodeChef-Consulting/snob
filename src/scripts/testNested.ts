import dotenv from '@dotenvx/dotenvx';
dotenv.config();

import snoowrap, { Comment } from 'snoowrap';

const r = new snoowrap({
  userAgent: process.env.REDDIT_USER_AGENT!,
  clientId: process.env.REDDIT_CLIENT_ID!,
  clientSecret: process.env.REDDIT_CLIENT_SECRET!,
  username: process.env.REDDIT_USERNAME!,
  password: process.env.REDDIT_PASSWORD!,
});

async function testNestedComments() {
  console.log('Fetching Tommy\'s post...');
  const post = await r.getSubmission('1c4mw27');

  // Test with depth: Infinity to get all nested comments
  console.log('Expanding all replies...');
  const expanded = await post.expandReplies({ limit: Infinity, depth: Infinity });

  console.log('Total top-level comments:', expanded.comments.length);

  // Flatten all nested comments
  const flatComments: any[] = [];
  function flatten(comment: Comment, currentDepth: number = 0) {
    flatComments.push({
      id: comment.id,
      depth: currentDepth,
      apiDepth: comment.depth,
      author: comment.author?.name || '[deleted]',
      body: comment.body?.substring(0, 60) || '',
      parent_id: comment.parent_id,
      hasReplies: comment.replies && comment.replies.length > 0
    });

    if (comment.replies && comment.replies.length > 0) {
      comment.replies.forEach((reply: Comment) => flatten(reply, currentDepth + 1));
    }
  }

  expanded.comments.forEach((c: Comment) => flatten(c, 0));

  console.log('Total flattened comments:', flatComments.length);
  console.log('\nDepth distribution:');
  const depthCounts = flatComments.reduce((acc, c) => {
    acc[c.depth] = (acc[c.depth] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  Object.entries(depthCounts)
    .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
    .forEach(([depth, count]) => {
      console.log(`  Depth ${depth}: ${count} comments`);
    });

  console.log('\nSample nested comments (depth > 0):');
  flatComments
    .filter(c => c.depth > 0)
    .slice(0, 10)
    .forEach(c => {
      console.log(`  [Depth ${c.depth}] ${c.author}: ${c.body}`);
      console.log(`    parent_id: ${c.parent_id}, apiDepth: ${c.apiDepth}`);
    });
}

testNestedComments()
  .catch(console.error)
  .finally(() => process.exit());
