import { PrismaClient } from '@prisma/client';

// Configuration types
export interface BatchConfig {
  batchSize: number;
  minBatchDurationMs: number;
  staggerDelayMs: number;
}

export interface ProcessConfig {
  limit?: number;
  skipExisting: boolean;
}

// Generic batch processor types
export interface BatchResult<T> {
  processed: number;
  errors: number;
  data?: T[];
}

/**
 * Generic batch processor for parallel API calls with rate limiting
 * Handles staggered starts, batch timing, and progress reporting
 */
export async function processBatch<TInput, TResult>(
  items: TInput[],
  processor: (item: TInput, index: number) => Promise<TResult | null>,
  config: BatchConfig,
  batchNumber: number,
  currentProcessed: number,
  totalItems: number
): Promise<{ successful: TResult[]; errors: number; elapsed: number }> {
  console.log(
    `\n   Batch ${batchNumber} (${items.length} items)...`
  );

  const batchStartTime = Date.now();

  // Process all items in parallel with staggered starts
  const promises = items.map(
    (item, index) =>
      new Promise<TResult | null>((resolve) => {
        setTimeout(async () => {
          try {
            const result = await processor(item, index);
            resolve(result);
          } catch (error) {
            console.error(`      Error processing item at index ${index}:`, error);
            resolve(null);
          }
        }, index * config.staggerDelayMs);
      })
  );

  // Wait for all API calls to complete
  const results = await Promise.all(promises);

  // Filter out errors
  const successful = results.filter((r): r is TResult => r !== null);
  const errors = items.length - successful.length;

  const batchElapsedTime = Date.now() - batchStartTime;
  console.log(
    `      ✅ Success: ${successful.length}, ❌ Errors: ${errors}`
  );
  console.log(`      Progress: ${currentProcessed + items.length}/${totalItems}`);
  console.log(
    `      ⏱️  Batch completed in ${(batchElapsedTime / 1000).toFixed(1)}s`
  );

  return { successful, errors, elapsed: batchElapsedTime };
}

/**
 * Wait for remainder of minimum batch duration to respect rate limits
 */
export async function waitForRateLimit(
  elapsed: number,
  minDuration: number,
  hasMore: boolean
): Promise<void> {
  if (!hasMore) return;

  const waitTime = Math.max(0, minDuration - elapsed);
  if (waitTime > 0) {
    console.log(
      `      ⏳ Waiting ${(waitTime / 1000).toFixed(1)}s before next batch (rate limit)...`
    );
    await new Promise((resolve) => setTimeout(resolve, waitTime));
  }
}

/**
 * Generic batch save function that separates creates and updates
 */
export async function batchSaveResults<T extends { id: number }>(
  prisma: PrismaClient,
  results: T[],
  options: {
    tableName: string;
    existingIdField: 'postId' | 'commentId';
    getCreateData: (item: T) => any;
    getUpdateData: (item: T) => any;
    updateWhere: (id: number) => any;
  }
): Promise<void> {
  // Get existing IDs
  const ids = results.map((r) => r.id);
  const table = (prisma as any)[options.tableName];

  const existing = await table.findMany({
    where: { [options.existingIdField]: { in: ids } },
    select: { [options.existingIdField]: true },
  });

  const existingIdSet = new Set(
    existing.map((e: any) => e[options.existingIdField])
  );

  // Separate creates and updates
  const creates = results.filter((r) => !existingIdSet.has(r.id));
  const updates = results.filter((r) => existingIdSet.has(r.id));

  // Execute creates and updates in parallel
  await Promise.all([
    // Create new records
    creates.length > 0
      ? table.createMany({
          data: creates.map(options.getCreateData),
          skipDuplicates: true,
        })
      : Promise.resolve(),

    // Update existing records in parallel
    ...updates.map((item) =>
      table.update({
        where: options.updateWhere(item.id),
        data: options.getUpdateData(item),
      })
    ),
  ]);
}

/**
 * Print summary statistics
 */
export function printSummary(
  title: string,
  stats: {
    posts: { processed: number; errors: number };
    comments: { processed: number; errors: number };
  }
): void {
  console.log('\n' + '='.repeat(80));
  console.log(`🎉 ${title} Complete!`);
  console.log('='.repeat(80));
  console.log(
    `   Posts: ${stats.posts.processed} processed, ${stats.posts.errors} errors`
  );
  console.log(
    `   Comments: ${stats.comments.processed} processed, ${stats.comments.errors} errors`
  );
  console.log(
    `   Total: ${stats.posts.processed + stats.comments.processed} extracted`
  );
}

/**
 * Parse CLI arguments
 */
export function parseCliArgs(args: string[]): {
  processPosts: boolean;
  processComments: boolean;
  skipExisting: boolean;
  limit?: number;
} {
  const config = {
    processPosts: !args.includes('--comments-only'),
    processComments: !args.includes('--posts-only'),
    skipExisting: !args.includes('--reprocess-all'),
    limit: undefined as number | undefined,
  };

  const limitArg = args.find((arg) => arg.startsWith('--limit='));
  if (limitArg) {
    config.limit = parseInt(limitArg.split('=')[1], 10);
  }

  return config;
}

/**
 * Print CLI help
 */
export function printHelp(
  scriptName: string,
  description: string,
  tableName: string
): void {
  console.log(`
Usage: tsx src/scripts/${scriptName} [options]

Options:
  --posts-only        Only process posts
  --comments-only     Only process comments
  --reprocess-all     Don't skip existing ${tableName.toLowerCase()}
  --limit=<number>    Limit items to process
  -h, --help          Show help

Examples:
  npm run ${scriptName.replace('.ts', '').replace(/[A-Z]/g, (m) => '-' + m.toLowerCase())}
  npm run ${scriptName.replace('.ts', '').replace(/[A-Z]/g, (m) => '-' + m.toLowerCase())} -- --posts-only --limit=100
  npm run ${scriptName.replace('.ts', '').replace(/[A-Z]/g, (m) => '-' + m.toLowerCase())} -- --comments-only

Features:
  ✅ OPTIMIZED FOR PAID TIER - 1000 RPM rate limit
  ✅ Parallel API calls (1000 concurrent with 60ms stagger)
  ✅ Batch database operations (createMany + parallel updates)
  ✅ Time-based rate limiting (each batch takes ≥60s)
  ✅ Progress tracking and error handling
  ✅ Saves to ${tableName} table

Performance:
  • Batch size: Up to 1000 items per batch
  • Rate limit: 1000 requests/minute (enforced via timing)
  • DB operations: Bulk creates + parallel updates per batch
  • Expected speed: ~60,000 items/hour maximum

Note: For 50% cost savings, use Batch API instead:
  npm run init-batch (submit batch job)
  npm run check-batch (retrieve results)
  `);
}
