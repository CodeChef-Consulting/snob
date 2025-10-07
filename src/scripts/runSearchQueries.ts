import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs/promises';

const execAsync = promisify(exec);

async function runSearchQueries() {
  // Read queries from file
  const queriesFile = await fs.readFile('search-queries.txt', 'utf-8');
  const queries = queriesFile
    .split('\n')
    .map((q) => q.trim())
    .filter((q) => q.length > 0);

  console.log(`Found ${queries.length} search queries to run\n`);

  const results = [];
  let completed = 0;
  let skipped = 0;
  let failed = 0;

  for (let i = 0; i < queries.length; i++) {
    const query = queries[i];
    console.log(`\n[${i + 1}/${queries.length}] Running: "${query}"`);

    try {
      const { stdout, stderr } = await execAsync(
        `npx tsx src/scripts/fetchComments.ts search "${query}" all`,
        { timeout: 300000 }
      );

      // Check if already scraped
      if (stdout.includes('Already scraped')) {
        console.log(`  ⏭️  Skipped (already scraped)`);
        skipped++;
      } else {
        // Extract completion info
        const match = stdout.match(/✅ Completed: (\d+) posts, (\d+) comments/);
        if (match) {
          console.log(`  ✅ Completed: ${match[1]} posts, ${match[2]} comments`);
          completed++;
          results.push({ query, posts: parseInt(match[1]), comments: parseInt(match[2]) });
        }
      }

      // Check for rate limiting warnings
      if (stderr.includes('rate') || stderr.includes('limit') || stdout.includes('rate')) {
        console.log(`  ⚠️  Rate limiting detected - adding 30s delay`);
        await new Promise((resolve) => setTimeout(resolve, 30000));
      } else {
        // Normal delay between queries
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    } catch (error: any) {
      console.log(`  ❌ Failed: ${error.message}`);
      failed++;

      // If rate limited, wait longer
      if (error.message.includes('rate') || error.message.includes('429')) {
        console.log(`  ⚠️  Rate limit error - waiting 60s before continuing`);
        await new Promise((resolve) => setTimeout(resolve, 60000));
      }
    }
  }

  console.log(`\n\n=== SUMMARY ===`);
  console.log(`Total queries: ${queries.length}`);
  console.log(`Completed: ${completed}`);
  console.log(`Skipped (already scraped): ${skipped}`);
  console.log(`Failed: ${failed}`);

  if (results.length > 0) {
    console.log(`\n=== NEW DATA SCRAPED ===`);
    const totalPosts = results.reduce((sum, r) => sum + r.posts, 0);
    const totalComments = results.reduce((sum, r) => sum + r.comments, 0);
    console.log(`Total new posts: ${totalPosts}`);
    console.log(`Total new comments: ${totalComments}`);
  }
}

runSearchQueries();
