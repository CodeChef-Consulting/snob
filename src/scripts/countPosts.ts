import dotenv from '@dotenvx/dotenvx';
dotenv.config();

import snoowrap from 'snoowrap';

const r = new snoowrap({
  userAgent: process.env.REDDIT_USER_AGENT!,
  clientId: process.env.REDDIT_CLIENT_ID!,
  clientSecret: process.env.REDDIT_CLIENT_SECRET!,
  username: process.env.REDDIT_USERNAME!,
  password: process.env.REDDIT_PASSWORD!,
});

async function countPosts(subredditName: string = 'FoodLosAngeles') {
  console.log(`Counting total posts in r/${subredditName}...`);

  let totalPosts = 0;
  let after: string | undefined = undefined;
  const batchSize = 100; // Reddit API max limit per request

  try {
    while (true) {
      const options: any = { limit: batchSize };
      if (after) {
        options.after = after;
      }

      const posts = await r.getSubreddit(subredditName).getNew(options);

      if (posts.length === 0) {
        break;
      }

      totalPosts += posts.length;
      console.log(`Fetched ${posts.length} posts (total: ${totalPosts})`);

      // Check if there's more data
      if (posts.length < batchSize) {
        break;
      }

      // Get the 'after' token for pagination
      // @ts-ignore - accessing internal property
      after = posts._query.after;

      if (!after) {
        break;
      }

      // Small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    console.log(`\n✅ Total posts in r/${subredditName}: ${totalPosts}`);
    return totalPosts;
  } catch (error) {
    console.error('Error counting posts:', error);
    throw error;
  }
}

countPosts().catch(console.error);
