import { config } from '@dotenvx/dotenvx';
config({ path: ['../../.env'] });

import { PrismaClient } from '@repo/db';
import _ from 'lodash';
import * as readline from 'readline';

const prisma = new PrismaClient();

type Restaurant = {
  id: number;
  name: string;
  address: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  latitude: number | null;
  longitude: number | null;
  source: string;
  googlePlaceId: string | null;
  lookupAliases: string[];
  metadata: any;
  rawScore: number | null;
  normalizedScore: number | null;
  createdAt: Date;
  updatedAt: Date;
};

type RestaurantGroupDuplicate = Restaurant & {
  nameSimilarity: number;
  addressSimilarity: number | null;
};

/**
 * Find duplicates in a batch of restaurants
 */
async function findDuplicatesInBatch(
  batch: Restaurant[],
  processed: Set<number>
): Promise<RestaurantGroupDuplicate[][]> {
  const duplicateGroups: RestaurantGroupDuplicate[][] = [];

  for (const r1 of batch) {
    if (processed.has(r1.id)) continue; // Skip if already in a group

    // Find ALL candidates similar to r1
    const candidates = await prisma.$queryRaw<
      Array<
        Restaurant & {
          name_sim: number;
          addr_sim: number | null;
        }
      >
    >`
      SELECT
        r.*,
        similarity(r.name, ${r1.name}) as name_sim,
        CASE
          WHEN r.address IS NOT NULL AND ${r1.address}::text IS NOT NULL
          THEN similarity(r.address, ${r1.address}::text)
          ELSE NULL
        END as addr_sim
      FROM "Restaurant" r
      WHERE r.id != ${r1.id}
        AND similarity(r.name, ${r1.name}) > 0.85
    `;

    // Start with r1 as anchor (similarity to itself is 1.0)
    const matchingRestaurants: RestaurantGroupDuplicate[] = [
      {
        ...r1,
        nameSimilarity: 1.0,
        addressSimilarity: r1.address ? 1.0 : null,
      },
    ];

    for (const candidate of candidates) {
      if (processed.has(candidate.id)) continue; // Skip if already in a group

      const nameSim = candidate.name_sim;
      const addrSim = candidate.addr_sim;

      // If both have addresses, require high address similarity too
      const isAddressMatch =
        r1.address && candidate.address
          ? addrSim !== null && addrSim > 0.85
          : true;

      if (isAddressMatch) {
        const { name_sim, addr_sim, ...rest } = candidate;
        matchingRestaurants.push({
          ...rest,
          nameSimilarity: nameSim,
          addressSimilarity: addrSim,
        });
        processed.add(candidate.id); // Mark as processed immediately
      }
    }

    // Create group only if we found duplicates
    if (matchingRestaurants.length > 1) {
      duplicateGroups.push(matchingRestaurants);
      processed.add(r1.id); // Mark r1 as processed too
    }
  }

  return duplicateGroups;
}

/**
 * Display a duplicate group for review
 */
async function displayGroup(group: RestaurantGroupDuplicate[], index: number) {
  console.log(`\n${'='.repeat(80)}`);
  console.log(`GROUP ${index + 1} (${group.length} restaurants)`);
  console.log(`${'='.repeat(80)}`);

  // Sort to identify winner: Open Data Portal first, then by createdAt
  const sorted = _.sortBy(group, [
    (r) => (r.source === 'Open Data Portal' ? 0 : 1),
    (r) => r.createdAt.getTime(),
  ]);
  const winner = _.first(sorted)!;
  const losers = _.tail(sorted);

  // Get relation counts for each restaurant
  const restaurantIds = _.map(sorted, 'id');
  const relationCounts = await prisma.$queryRaw<
    Array<{
      restaurant_id: number;
      post_count: bigint;
      comment_count: bigint;
    }>
  >`
    SELECT
      r.id as restaurant_id,
      (SELECT COUNT(*) FROM "_PostToRestaurant" WHERE "B" = r.id) as post_count,
      (SELECT COUNT(*) FROM "_CommentToRestaurant" WHERE "B" = r.id) as comment_count
    FROM "Restaurant" r
    WHERE r.id = ANY(${restaurantIds})
  `;

  const relationMap = new Map(
    relationCounts.map((rc) => [
      rc.restaurant_id,
      {
        postCount: Number(rc.post_count),
        commentCount: Number(rc.comment_count),
      },
    ])
  );

  sorted.forEach((r, i) => {
    const isWinner = r.id === winner.id;
    const prefix = isWinner ? '👑 WINNER' : '  LOSER';
    const relations = relationMap.get(r.id) || {
      postCount: 0,
      commentCount: 0,
    };

    console.log(`\n${prefix} ${i + 1}. [ID: ${r.id}] ${r.name}`);
    console.log(`   Source: ${r.source}`);
    console.log(`   Created: ${r.createdAt.toISOString()}`);
    console.log(`   Name Similarity: ${(r.nameSimilarity * 100).toFixed(1)}%`);
    if (r.addressSimilarity !== null) {
      console.log(
        `   Address Similarity: ${(r.addressSimilarity * 100).toFixed(1)}%`
      );
    }
    if (r.address) {
      console.log(
        `   Address: ${r.address}, ${r.city}, ${r.state} ${r.zipCode}`
      );
    }
    if (r.googlePlaceId) {
      console.log(`   Google Place ID: ${r.googlePlaceId}`);
    }
    if (r.lookupAliases.length > 0) {
      console.log(`   Aliases: ${r.lookupAliases.join(', ')}`);
    }
    if (r.normalizedScore !== null) {
      console.log(`   Score: ${r.normalizedScore.toFixed(2)}`);
    }
    console.log(
      `   Posts: ${relations.postCount}, Comments: ${relations.commentCount}`
    );
  });

  // Show what will be merged
  console.log(`\n--- MERGE PREVIEW ---`);

  // Determine final name
  const googlePlaceLoser = losers.find((l) => l.source === 'Google Places API');
  const finalName =
    winner.source === 'Open Data Portal' && googlePlaceLoser
      ? googlePlaceLoser.name
      : winner.name;

  // Determine final googlePlaceId (oldest non-null)
  const finalGooglePlaceId =
    winner.googlePlaceId ||
    losers.find((l) => l.googlePlaceId)?.googlePlaceId ||
    null;

  // Merge lookupAliases
  const allAliases = _.flatMap(sorted, (r) => r.lookupAliases);
  const finalAliases = _.compact(_.uniq(allAliases));

  // Merge metadata
  const allMetadata = _.map(sorted, (r) => r.metadata || {});
  const finalMetadata = _.merge(
    {},
    ..._.reverse([...allMetadata]),
    winner.metadata
  ); // Winner takes priority

  // Calculate total relations being moved from losers
  const loserRelations = losers.map(
    (l) => relationMap.get(l.id) || { postCount: 0, commentCount: 0 }
  );
  const totalPostsToMove = _.sumBy(loserRelations, 'postCount');
  const totalCommentsToMove = _.sumBy(loserRelations, 'commentCount');

  console.log(
    `Final Name: ${finalName} ${finalName !== winner.name ? '(changed from Google Place)' : ''}`
  );
  console.log(`Final Google Place ID: ${finalGooglePlaceId || 'null'}`);
  if (finalAliases.length > 0) {
    console.log(`Final Aliases: ${finalAliases.join(', ')}`);
  }
  console.log(
    `Will move ${totalPostsToMove} post link(s) and ${totalCommentsToMove} comment link(s) to winner`
  );
  console.log(
    `Will delete ${losers.length} duplicate(s): IDs ${_.map(losers, 'id').join(', ')}`
  );
}

/**
 * Merge a duplicate group
 */
async function mergeGroup(
  group: RestaurantGroupDuplicate[],
  dryRun: boolean = false
): Promise<void> {
  // Sort to identify winner: Open Data Portal first, then by createdAt
  const sorted = _.sortBy(group, [
    (r) => (r.source === 'Open Data Portal' ? 0 : 1),
    (r) => r.createdAt.getTime(),
  ]);
  const winner = _.first(sorted)!;
  const losers = _.tail(sorted);
  const loserIds = _.map(losers, 'id');

  // Calculate merge data (used for both dry-run and actual merge)
  const googlePlaceLoser = losers.find((l) => l.source === 'Google Places API');
  const finalName =
    winner.source === 'Open Data Portal' && googlePlaceLoser
      ? googlePlaceLoser.name
      : winner.name;

  const finalGooglePlaceId =
    winner.googlePlaceId ||
    losers.find((l) => l.googlePlaceId)?.googlePlaceId ||
    null;

  const allAliases = _.flatMap(sorted, (r) => r.lookupAliases);
  const finalAliases = _.compact(_.uniq(allAliases));

  const allMetadata = _.map(sorted, (r) => r.metadata || {});
  const finalMetadata = _.merge(
    {},
    ..._.reverse([...allMetadata]),
    winner.metadata
  );

  if (dryRun) {
    console.log(
      `\n[DRY RUN] Would merge ${losers.length} restaurant(s) into ID ${winner.id}`
    );
    console.log(
      `  Winner: "${winner.name}" (ID: ${winner.id}, Source: ${winner.source})`
    );
    console.log(
      `  Losers: ${_.map(losers, (l) => `"${l.name}" (ID: ${l.id})`).join(', ')}`
    );
    console.log(`  Final data:`);
    console.log(
      `    name: "${finalName}"${finalName !== winner.name ? ' (changed from Google Place)' : ''}`
    );
    console.log(`    googlePlaceId: ${finalGooglePlaceId || 'null'}`);
    console.log(`    lookupAliases: ${finalAliases.length > 0 ? finalAliases.join(', ') : 'null'}`);
    console.log(
      `    metadata keys: ${_.keys(finalMetadata).join(', ') || 'none'}`
    );
    return;
  }

  try {
    await prisma.$transaction(async (tx) => {
      // 1. Clear googlePlaceId from losers first to avoid constraint conflicts
      if (finalGooglePlaceId) {
        await tx.restaurant.updateMany({
          where: {
            id: { in: loserIds },
            googlePlaceId: finalGooglePlaceId,
          },
          data: { googlePlaceId: null },
        });
      }

      // 2. Migrate relations from losers to winner
      for (const loserId of loserIds) {
        // Migrate posts - use raw SQL to avoid conflicts
        await tx.$executeRaw`
          INSERT INTO "_PostToRestaurant" ("A", "B")
          SELECT DISTINCT "A", ${winner.id}
          FROM "_PostToRestaurant"
          WHERE "B" = ${loserId}
          ON CONFLICT DO NOTHING
        `;

        // Delete old relations
        await tx.$executeRaw`
          DELETE FROM "_PostToRestaurant" WHERE "B" = ${loserId}
        `;

        // Migrate comments
        await tx.$executeRaw`
          INSERT INTO "_CommentToRestaurant" ("A", "B")
          SELECT DISTINCT "A", ${winner.id}
          FROM "_CommentToRestaurant"
          WHERE "B" = ${loserId}
          ON CONFLICT DO NOTHING
        `;

        // Delete old relations
        await tx.$executeRaw`
          DELETE FROM "_CommentToRestaurant" WHERE "B" = ${loserId}
        `;
      }

      // 3. Update winner with merged data
      await tx.restaurant.update({
        where: { id: winner.id },
        data: {
          name: finalName,
          googlePlaceId: finalGooglePlaceId,
          lookupAliases: finalAliases,
          metadata: finalMetadata,
        },
      });

      // 4. Delete losers
      await tx.restaurant.deleteMany({
        where: { id: { in: loserIds } },
      });
    });

    console.log(`✅ Successfully merged group into ID ${winner.id}`);
  } catch (error) {
    console.error(`❌ Failed to merge group:`, error);
    throw error;
  }
}

/**
 * Prompt user for input
 */
function prompt(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase());
    });
  });
}

/**
 * Manual merge mode - merge specific restaurant IDs
 */
async function manualMerge(restaurantIds: number[], dryRun: boolean) {
  console.log(
    `\n🔧 MANUAL MERGE MODE - Merging ${restaurantIds.length} restaurants\n`
  );

  // Fetch all restaurants
  const restaurants = await prisma.restaurant.findMany({
    where: { id: { in: restaurantIds } },
  });

  if (restaurants.length === 0) {
    console.log('❌ No restaurants found with the provided IDs');
    return;
  }

  if (restaurants.length !== restaurantIds.length) {
    const foundIds = restaurants.map((r) => r.id);
    const missingIds = restaurantIds.filter((id) => !foundIds.includes(id));
    console.log(
      `⚠️  Warning: Could not find restaurants with IDs: ${missingIds.join(', ')}`
    );
  }

  if (restaurants.length < 2) {
    console.log('❌ Need at least 2 restaurants to merge');
    return;
  }

  // Create a group with 100% similarity (manual merge)
  const group: RestaurantGroupDuplicate[] = restaurants.map((r) => ({
    ...r,
    nameSimilarity: 1.0,
    addressSimilarity: r.address ? 1.0 : null,
  }));

  // Display the merge preview
  await displayGroup(group, 0);

  // Prompt for confirmation
  console.log(`\n${'='.repeat(80)}`);
  const answer = await prompt('\nProceed with merge? (yes/no): ');

  if (answer !== 'yes' && answer !== 'y') {
    console.log('\nMerge cancelled.');
    return;
  }

  // Perform the merge
  await mergeGroup(group, dryRun);
  console.log('\n✅ Manual merge complete');
}

/**
 * Main execution
 */
async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const reviewAll = args.includes('--review-all');

  // Check for manual merge mode: --ids=1,2,3
  const idsArg = args.find((arg) => arg.startsWith('--ids='));
  if (idsArg) {
    const idsStr = idsArg.split('=')[1];
    const restaurantIds = idsStr
      .split(',')
      .map((id) => parseInt(id.trim(), 10));

    if (restaurantIds.some((id) => isNaN(id))) {
      console.error('❌ Invalid restaurant IDs. Use: --ids=1,2,3');
      process.exit(1);
    }

    await manualMerge(restaurantIds, dryRun);
    return;
  }

  if (dryRun) {
    console.log('🔍 DRY RUN MODE - No changes will be made\n');
  }
  if (reviewAll) {
    console.log(
      '📋 REVIEW ALL MODE - All duplicates require manual approval\n'
    );
  }

  console.log('Processing restaurants in batches of 50...\n');

  const totalCount = await prisma.restaurant.count();
  const RESTAURANT_BATCH_SIZE = 1000;
  const processed = new Set<number>();

  let totalGroupsFound = 0;
  let totalGroupsMerged = 0;
  let batchNumber = 0;
  let lastProcessedId = 0;
  let hasMore = true;

  while (hasMore) {
    batchNumber++;

    // Fetch batch of restaurants using cursor-based pagination
    const restaurantBatch = await prisma.restaurant.findMany({
      where: { id: { gt: lastProcessedId } },
      orderBy: { id: 'asc' },
      take: RESTAURANT_BATCH_SIZE,
    });

    if (restaurantBatch.length === 0) {
      hasMore = false;
      break;
    }

    console.log(`\n${'='.repeat(80)}`);
    console.log(
      `Processing batch ${batchNumber} (${restaurantBatch.length} restaurants)`
    );
    console.log(`${'='.repeat(80)}\n`);

    // Find duplicates in this batch
    const duplicateGroups = await findDuplicatesInBatch(
      restaurantBatch,
      processed
    );

    if (duplicateGroups.length === 0) {
      console.log('No duplicates found in this batch.\n');
      lastProcessedId = _.last(restaurantBatch)!.id;
      continue;
    }

    totalGroupsFound += duplicateGroups.length;

    // Separate perfect matches (100% similarity) from groups needing review
    const perfectMatches: RestaurantGroupDuplicate[][] = [];
    const needsReview: RestaurantGroupDuplicate[][] = [];

    // If --review-all flag is set, review everything. Otherwise auto-merge perfect matches.
    if (reviewAll) {
      needsReview.push(...duplicateGroups);
    } else {
      for (const group of duplicateGroups) {
        // Check if all members have 100% name and address similarity
        const allPerfect = group.every(
          (r) =>
            r.nameSimilarity === 1.0 &&
            (r.addressSimilarity === null || r.addressSimilarity === 1.0)
        );

        if (allPerfect) {
          perfectMatches.push(group);
        } else {
          needsReview.push(group);
        }
      }

      // Auto-merge perfect matches
      if (perfectMatches.length > 0) {
        console.log(
          `\n🔄 Auto-merging ${perfectMatches.length} perfect match group(s) (100% similarity)...`
        );
        for (const group of perfectMatches) {
          const sorted = _.sortBy(group, [
            (r) => (r.source === 'Open Data Portal' ? 0 : 1),
            (r) => r.createdAt.getTime(),
          ]);
          const winner = _.first(sorted)!;
          const losers = _.tail(sorted);
          console.log(
            `  ✓ Merging ${group.length} restaurants into "${winner.name}" (ID: ${winner.id})`
          );
          await mergeGroup(group, dryRun);
          totalGroupsMerged++;
        }
      }
    }

    // If no groups need review, continue to next batch
    if (needsReview.length === 0) {
      console.log('No groups need manual review in this batch.\n');
      lastProcessedId = _.last(restaurantBatch)!.id;
      continue;
    }

    console.log(
      `\nFound ${needsReview.length} duplicate group(s) requiring review:\n`
    );

    // Display groups needing review
    for (let idx = 0; idx < needsReview.length; idx++) {
      await displayGroup(needsReview[idx], idx);
    }

    // Calculate average similarity for each group
    const groupSimilarities = needsReview.map((group) => {
      const similarities = group.map((r) => ({
        name: r.nameSimilarity,
        address: r.addressSimilarity,
      }));
      const avgName = _.meanBy(similarities, 'name');
      const addressValues = similarities
        .map((s) => s.address)
        .filter((a) => a !== null) as number[];
      const avgAddress =
        addressValues.length > 0 ? _.mean(addressValues) : null;

      // Combined average (name + address if available, otherwise just name)
      return avgAddress !== null
        ? ((avgName + avgAddress) / 2) * 100
        : avgName * 100;
    });

    const similarityList = groupSimilarities
      .map((pct) => `${pct.toFixed(0)}%`)
      .join(', ');

    // Prompt for batch approval
    console.log(`\n${'='.repeat(80)}`);
    const answer = await prompt(
      `\nMerge these ${needsReview.length} group(s) (${similarityList})? (yes/no): `
    );

    if (answer !== 'yes' && answer !== 'y') {
      console.log('\nExiting...');
      break;
    }

    // Merge approved groups
    console.log(`\nMerging ${needsReview.length} group(s)...`);
    for (const group of needsReview) {
      await mergeGroup(group, dryRun);
      totalGroupsMerged++;
    }
    console.log(`\n✅ Batch complete`);

    // Update cursor to last processed ID
    lastProcessedId = _.last(restaurantBatch)!.id;
  }

  // Summary
  console.log(`\n${'='.repeat(80)}`);
  console.log(`MERGE SUMMARY`);
  console.log(`${'='.repeat(80)}`);
  console.log(`Total duplicate groups found: ${totalGroupsFound}`);
  console.log(`Groups merged: ${totalGroupsMerged}`);
  console.log(`Groups skipped: ${totalGroupsFound - totalGroupsMerged}`);
  console.log(`${dryRun ? '(DRY RUN - no actual changes made)' : ''}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
