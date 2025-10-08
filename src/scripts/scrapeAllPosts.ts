import dotenv from '@dotenvx/dotenvx';
dotenv.config();

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

interface ScrapeTask {
  mode: 'new' | 'top' | 'controversial' | 'search';
  timeframe?: 'all' | 'year';
  searchQuery?: string;
  description: string;
}

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

  // Search queries (from runSearchQueries)
  {
    mode: 'search',
    searchQuery: 'best',
    timeframe: 'all',
    description: 'Search: "best"',
  },
  {
    mode: 'search',
    searchQuery: 'worst',
    timeframe: 'all',
    description: 'Search: "worst"',
  },
  {
    mode: 'search',
    searchQuery: 'overrated',
    timeframe: 'all',
    description: 'Search: "overrated"',
  },
  {
    mode: 'search',
    searchQuery: 'underrated',
    timeframe: 'all',
    description: 'Search: "underrated"',
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
    searchQuery: 'avoid',
    timeframe: 'all',
    description: 'Search: "avoid"',
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
  {
    mode: 'search',
    searchQuery: 'terrible',
    timeframe: 'all',
    description: 'Search: "terrible"',
  },
];

async function runAllScrapes() {
  console.log(`\n🚀 Starting post scraping for ${tasks.length} tasks...\n`);

  let completed = 0;
  let failed = 0;

  for (const task of tasks) {
    const taskNum = completed + failed + 1;
    console.log(`\n[${ taskNum}/${tasks.length}] ${task.description}`);
    console.log('─'.repeat(60));

    try {
      const args = [task.mode];
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
    } catch (error: any) {
      failed++;
      console.error(`❌ Failed ${task.description}`);
      console.error(`Error: ${error.message}`);
      if (error.stdout) console.log(error.stdout);
      if (error.stderr) console.error(error.stderr);
    }

    // Add delay between tasks to avoid rate limiting
    if (taskNum < tasks.length) {
      console.log('\nWaiting 5 seconds before next task...');
      await new Promise((resolve) => setTimeout(resolve, 5000));
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
