import { config } from '@dotenvx/dotenvx';
config({ path: ['../../.env'] });

import { exec } from 'child_process';
import { promisify } from 'util';
import { readFileSync } from 'fs';
import { join } from 'path';

const execAsync = promisify(exec);

interface ScrapeTask {
  mode: 'new' | 'top' | 'controversial' | 'search';
  timeframe?: 'all' | 'year';
  searchQuery?: string;
  description: string;
}

// Read search queries from file
const searchQueriesPath = join(process.cwd(), 'search-queries.txt');
const searchQueriesContent = readFileSync(searchQueriesPath, 'utf-8');
const searchQueries = searchQueriesContent
  .split('\n')
  .map((line) => line.trim())
  .filter((line) => line.length > 0);

const tasks: ScrapeTask[] = [
  // New posts (no timeframe)
  { mode: 'new', description: 'New posts (latest 1000)' },

  // Top posts
  { mode: 'top', timeframe: 'all', description: 'Top posts (all time)' },
  { mode: 'top', timeframe: 'year', description: 'Top posts (past year)' },

  // Controversial posts
  {
    mode: 'controversial',
    timeframe: 'all',
    description: 'Controversial posts (all time)',
  },
  {
    mode: 'controversial',
    timeframe: 'year',
    description: 'Controversial posts (past year)',
  },

  // Search queries (from search-queries.txt)
  ...searchQueries.map((query) => ({
    mode: 'search' as const,
    searchQuery: query,
    timeframe: 'all' as const,
    description: `Search: "${query}"`,
  })),

  // Additional sentiment-based search queries
  {
    mode: 'search',
    searchQuery: 'best',
    timeframe: 'all',
    description: 'Search: "best"',
  },
  {
    mode: 'search',
    searchQuery: 'underrated',
    timeframe: 'all',
    description: 'Search: "underrated"',
  },
  {
    mode: 'search',
    searchQuery: 'overrated',
    timeframe: 'all',
    description: 'Search: "overrated"',
  },
  {
    mode: 'search',
    searchQuery: 'hidden gem',
    timeframe: 'all',
    description: 'Search: "hidden gem"',
  },
  {
    mode: 'search',
    searchQuery: 'recommend',
    timeframe: 'all',
    description: 'Search: "recommend"',
  },
  {
    mode: 'search',
    searchQuery: 'disappointing',
    timeframe: 'all',
    description: 'Search: "disappointing"',
  },
  {
    mode: 'search',
    searchQuery: 'amazing',
    timeframe: 'all',
    description: 'Search: "amazing"',
  },
];

async function runAllScrapes() {
  console.log(`\n🚀 Starting post scraping for ${tasks.length} tasks...\n`);

  let completed = 0;
  let failed = 0;

  for (const task of tasks) {
    const taskNum = completed + failed + 1;
    console.log(`\n[${taskNum}/${tasks.length}] ${task.description}`);
    console.log('─'.repeat(60));

    try {
      const args: string[] = [task.mode];
      if (task.searchQuery) {
        args.push(`"${task.searchQuery}"`);
      } else {
        args.push('""');
      }
      if (task.timeframe) {
        args.push(task.timeframe);
      }

      const command = `npx tsx src/scripts/fetchPosts.ts ${args.join(' ')}`;
      console.log(`Running: ${command}\n`);

      const { stdout, stderr } = await execAsync(command, {
        maxBuffer: 10 * 1024 * 1024, // 10MB buffer
      });

      if (stdout) console.log(stdout);
      if (stderr) console.error(stderr);

      completed++;
      console.log(`✅ Completed ${task.description}`);

      // Only delay if we actually scraped (not skipped)
      const wasSkipped =
        stdout?.includes('Already scraped') || stdout?.includes('Skipping');
      if (taskNum < tasks.length && !wasSkipped) {
        console.log('\nWaiting 5 seconds before next task...');
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    } catch (error: any) {
      failed++;
      console.error(`❌ Failed ${task.description}`);
      console.error(`Error: ${error.message}`);
      if (error.stdout) console.log(error.stdout);
      if (error.stderr) console.error(error.stderr);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`\n📊 Summary:`);
  console.log(`   ✅ Completed: ${completed}/${tasks.length}`);
  console.log(`   ❌ Failed: ${failed}/${tasks.length}`);
  console.log('\n' + '='.repeat(60));
}

runAllScrapes()
  .catch(console.error)
  .finally(() => process.exit(0));
