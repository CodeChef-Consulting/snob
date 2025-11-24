import { config } from '@dotenvx/dotenvx';
import { PrismaClient } from '@repo/db';

config({ path: ['../../.env'] });

const prisma = new PrismaClient();

/**
 * Fix quotes in restaurantsMentioned, primaryRestaurant, and dishesMentioned fields.
 * Handles:
 * - \' → ' (unescape)
 * - \" → " (unescape)
 * - Remove surrounding quotes like 'Name' or "Name"
 *
 * Usage: tsx src/scripts/fixQuotesInExtractions.ts [--dry-run]
 */

function cleanValue(value: string): string {
  return value
    .replace(/\\'/g, "'") // Unescape \' to '
    .replace(/\\"/g, '"') // Unescape \" to "
    .replace(/^["']|["']$/g, ''); // Remove surrounding quotes
}

function cleanArray(arr: string[]): string[] {
  return arr.map(cleanValue);
}

function hasQuoteIssue(value: string): boolean {
  // Check for escaped quotes (\' or \")
  if (/\\'|\\"/.test(value)) return true;
  // Check for surrounding quotes ('Name' or "Name") - must have both leading AND trailing
  if (/^["'].*["']$/.test(value)) return true;
  return false;
}

function arrayHasQuoteIssue(arr: string[]): boolean {
  return arr.some(hasQuoteIssue);
}

async function fixQuotesInExtractions() {
  const isDryRun = process.argv.includes('--dry-run');

  if (isDryRun) {
    console.log('🔍 DRY RUN MODE - No changes will be made\n');
  }

  console.log('Searching for extractions with quote issues...\n');

  // Find all extractions
  const extractions = await prisma.restaurantExtraction.findMany({
    select: {
      id: true,
      postId: true,
      commentId: true,
      restaurantsMentioned: true,
      primaryRestaurant: true,
      dishesMentioned: true,
    },
  });

  console.log(`Found ${extractions.length} total extractions\n`);

  let fixedCount = 0;
  const issues: Array<{
    id: number;
    field: string;
    before: string | string[];
    after: string | string[];
  }> = [];

  for (const extraction of extractions) {
    const updates: {
      restaurantsMentioned?: string[];
      primaryRestaurant?: string | null;
      dishesMentioned?: string[];
    } = {};

    // Check restaurantsMentioned
    if (arrayHasQuoteIssue(extraction.restaurantsMentioned)) {
      const cleaned = cleanArray(extraction.restaurantsMentioned);
      updates.restaurantsMentioned = cleaned;
      issues.push({
        id: extraction.id,
        field: 'restaurantsMentioned',
        before: extraction.restaurantsMentioned,
        after: cleaned,
      });
    }

    // Check primaryRestaurant
    if (extraction.primaryRestaurant && hasQuoteIssue(extraction.primaryRestaurant)) {
      const cleaned = cleanValue(extraction.primaryRestaurant);
      updates.primaryRestaurant = cleaned || null;
      issues.push({
        id: extraction.id,
        field: 'primaryRestaurant',
        before: extraction.primaryRestaurant,
        after: cleaned,
      });
    }

    // Check dishesMentioned
    if (arrayHasQuoteIssue(extraction.dishesMentioned)) {
      const cleaned = cleanArray(extraction.dishesMentioned);
      updates.dishesMentioned = cleaned;
      issues.push({
        id: extraction.id,
        field: 'dishesMentioned',
        before: extraction.dishesMentioned,
        after: cleaned,
      });
    }

    // Apply updates if any
    if (Object.keys(updates).length > 0) {
      if (!isDryRun) {
        await prisma.restaurantExtraction.update({
          where: { id: extraction.id },
          data: updates,
        });
      }
      fixedCount++;
    }
  }

  // Print summary
  console.log('=== Issues Found ===\n');

  for (const issue of issues) {
    console.log(`ID: ${issue.id} | Field: ${issue.field}`);
    console.log(`  Before: ${JSON.stringify(issue.before)}`);
    console.log(`  After:  ${JSON.stringify(issue.after)}`);
    console.log();
  }

  console.log('=== Summary ===');
  console.log(`Total extractions: ${extractions.length}`);
  console.log(`Extractions with issues: ${fixedCount}`);
  console.log(`Total fields fixed: ${issues.length}`);

  if (isDryRun) {
    console.log('\n⚠️  DRY RUN - No changes were made. Run without --dry-run to apply fixes.');
  } else {
    console.log(`\n✅ Fixed ${fixedCount} extractions`);
  }
}

fixQuotesInExtractions()
  .then(() => {
    console.log('\nDone!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Failed:', error);
    process.exit(1);
  });
