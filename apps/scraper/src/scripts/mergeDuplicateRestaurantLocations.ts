import { config } from '@dotenvx/dotenvx';
config({ path: ['../../.env'] });

import { PrismaClient, Prisma } from '@repo/db';
import _ from 'lodash';
import * as readline from 'readline';
import { haversineDistanceSQL } from '../utils/haversineQuery';
import {
  sortByWinnerPriority as sortByWinnerPriorityUtil,
  calculateMergedData as calculateMergedDataUtil,
} from '../utils/restaurantLocationMerge';

const prisma = new PrismaClient();

type RestaurantLocation = {
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
  groupId: number;
  createdAt: Date;
  updatedAt: Date;
};

type RestaurantLocationDuplicate = RestaurantLocation & {
  nameSimilarity: number;
  distanceMeters: number | null;
  groupName: string;
};

// Re-export utils with type-specific wrappers
const sortByWinnerPriority = (locations: RestaurantLocationDuplicate[]) =>
  sortByWinnerPriorityUtil(locations);

const calculateMergedData = (locations: RestaurantLocationDuplicate[]) =>
  calculateMergedDataUtil(locations);

/**
 * Get group information for multiple group IDs, sorted by winner priority (oldest first)
 */
async function getGroupsInfo(
  groupIds: number[]
): Promise<Array<{ id: number; name: string; createdAt: Date }>> {
  return prisma.restaurantGroup.findMany({
    where: { id: { in: groupIds } },
    select: { id: true, name: true, createdAt: true },
    orderBy: { createdAt: 'asc' },
  });
}

/**
 * Find duplicates in a batch of locations
 */
async function findDuplicatesInBatch(
  batch: RestaurantLocation[],
  processedLocations: Set<number>,
  processedGroups: Set<number>
): Promise<RestaurantLocationDuplicate[][]> {
  const duplicateFindings: RestaurantLocationDuplicate[][] = [];

  for (const l1 of batch) {
    if (processedLocations.has(l1.id)) continue; // Skip if already in a finding
    if (processedGroups.has(l1.groupId)) continue; // Skip if group already processed

    // Skip if no coordinates - can't match by location
    if (!l1.latitude || !l1.longitude) continue;

    // Find ALL candidates with similar coordinates (within ~100m) and similar name
    const distanceSQL = haversineDistanceSQL(
      l1.latitude,
      l1.longitude,
      'rl.latitude',
      'rl.longitude'
    );

    let candidates: Array<RestaurantLocation & { group_name: string; distance_meters: number }> = [];

    try {
      candidates = await prisma.$queryRaw<
        Array<
          RestaurantLocation & { group_name: string; distance_meters: number }
        >
      >`
        SELECT
          rl.*,
          rg.name as group_name,
          ${Prisma.raw(distanceSQL)} as distance_meters
        FROM "RestaurantLocation" rl
        JOIN "RestaurantGroup" rg ON rl."groupId" = rg.id
        WHERE rl.id != ${l1.id}
          AND rl.latitude IS NOT NULL
          AND rl.longitude IS NOT NULL
          AND similarity(rl.name, ${l1.name}) > 0.7
          AND ${Prisma.raw(distanceSQL)} < 100
        ORDER BY distance_meters ASC
      `;
    } catch (error) {
      console.error(`⚠️  Error finding candidates for location ${l1.id} (${l1.name}) at (${l1.latitude}, ${l1.longitude}):`, error);
      continue; // Skip this location and move to next
    }

    // Get group name for l1
    const l1Group = await prisma.restaurantGroup.findUnique({
      where: { id: l1.groupId },
      select: { name: true },
    });

    // Start with l1 as anchor (similarity to itself is 1.0, distance is 0)
    const matchingLocations: RestaurantLocationDuplicate[] = [
      {
        ...l1,
        nameSimilarity: 1.0,
        distanceMeters: 0,
        groupName: l1Group?.name || 'Unknown',
      },
    ];

    for (const candidate of candidates) {
      if (processedLocations.has(candidate.id)) continue; // Skip if already in a finding
      if (processedGroups.has(candidate.groupId)) continue; // Skip if group already processed

      // Calculate name similarity using pg_trgm
      const nameSimilarityResult = await prisma.$queryRaw<
        Array<{ similarity: number }>
      >`
        SELECT similarity(${l1.name}, ${candidate.name}) as similarity
      `;
      const nameSim = nameSimilarityResult[0]?.similarity ?? 0;

      // All candidates already meet the distance and name similarity criteria from the query
      matchingLocations.push({
        ...candidate,
        nameSimilarity: nameSim,
        distanceMeters: candidate.distance_meters,
        groupName: candidate.group_name,
      });
      processedLocations.add(candidate.id); // Mark as processed immediately
    }

    // Create finding only if we found duplicates
    if (matchingLocations.length > 1) {
      duplicateFindings.push(matchingLocations);
      processedLocations.add(l1.id); // Mark l1 as processed too

      // Mark all involved groups as processed to prevent cross-finding group conflicts
      const uniqueGroupIds = _.uniq(matchingLocations.map((l) => l.groupId));
      uniqueGroupIds.forEach((groupId) => processedGroups.add(groupId));
    }
  }

  return duplicateFindings;
}

/**
 * Display a duplicate group for review
 */
async function displayFinding(
  group: RestaurantLocationDuplicate[],
  index: number
) {
  console.log(`\n${'='.repeat(80)}`);
  console.log(`FINDING ${index + 1} (${group.length} locations)`);
  console.log(`${'='.repeat(80)}`);

  const sorted = sortByWinnerPriority(group);
  const winner = _.first(sorted)!;
  const losers = _.tail(sorted);

  // Check if locations belong to different groups
  const uniqueGroupIds = _.uniq(sorted.map((l) => l.groupId));
  const multipleGroups = uniqueGroupIds.length > 1;

  let winnerGroup: { id: number; name: string; createdAt: Date } | null = null;
  let loserGroups: Array<{ id: number; name: string; createdAt: Date }> = [];

  if (multipleGroups) {
    console.log(
      `⚠️  WARNING: These locations belong to ${uniqueGroupIds.length} different restaurant groups!`
    );

    const allGroups = await getGroupsInfo(uniqueGroupIds);
    winnerGroup = _.first(allGroups)!;
    loserGroups = _.tail(allGroups);

    console.log(
      `   👑 Winner Group: "${winnerGroup.name}" (ID: ${winnerGroup.id}, created: ${winnerGroup.createdAt.toISOString()})`
    );
    if (loserGroups.length > 0) {
      loserGroups.forEach((g) => {
        console.log(
          `   🗑️  Loser Group: "${g.name}" (ID: ${g.id}, created: ${g.createdAt.toISOString()})`
        );
      });
    }
  }

  sorted.forEach((l, i) => {
    const isWinner = l.id === winner.id;
    const prefix = isWinner ? '👑 WINNER' : '  LOSER';

    console.log(`\n${prefix} ${i + 1}. [ID: ${l.id}] ${l.name}`);
    console.log(`   Group: ${l.groupName} (Group ID: ${l.groupId})`);
    console.log(`   Source: ${l.source}`);
    console.log(`   Created: ${l.createdAt.toISOString()}`);
    console.log(`   Name Similarity: ${(l.nameSimilarity * 100).toFixed(1)}%`);
    if (l.distanceMeters !== null) {
      console.log(`   Distance: ${l.distanceMeters.toFixed(1)}m`);
    }
    if (l.address) {
      console.log(
        `   Address: ${l.address}, ${l.city}, ${l.state} ${l.zipCode}`
      );
    }
    if (l.latitude && l.longitude) {
      console.log(
        `   Coordinates: ${l.latitude.toFixed(6)}, ${l.longitude.toFixed(6)}`
      );
    }
    if (l.googlePlaceId) {
      console.log(`   Google Place ID: ${l.googlePlaceId}`);
    }
    if (l.lookupAliases.length > 0) {
      console.log(`   Aliases: ${l.lookupAliases.join(', ')}`);
    }
  });

  // Show what will be merged
  console.log(`\n--- MERGE PREVIEW ---`);

  const { finalName, finalGooglePlaceId, finalAliases, finalMetadata } =
    calculateMergedData(sorted);

  console.log(
    `Final Location Name: ${finalName} ${finalName !== winner.name ? '(changed from Google Place)' : ''}`
  );
  console.log(`Final Google Place ID: ${finalGooglePlaceId || 'null'}`);
  if (finalAliases.length > 0) {
    console.log(`Final Aliases: ${finalAliases.join(', ')}`);
  }
  console.log(
    `Will delete ${losers.length} duplicate location(s): IDs ${_.map(losers, 'id').join(', ')}`
  );

  if (multipleGroups && winnerGroup) {
    console.log(`\n⚠️  FINDING MERGE DETAILS:`);
    console.log(
      `   Winner Group: "${winnerGroup.name}" (ID: ${winnerGroup.id})`
    );
    console.log(
      `   Will merge ${loserGroups.length} group(s) into winner group: IDs ${loserGroups.map((g) => g.id).join(', ')}`
    );
    console.log(
      `   All locations and posts/comments from loser groups will be reassigned to winner group`
    );
  } else if (!multipleGroups) {
    console.log(
      `\nFinal Group: ${winner.groupName} (Group ID: ${winner.groupId})`
    );
  }
}

/**
 * Merge a duplicate group
 */
async function mergeFinding(
  group: RestaurantLocationDuplicate[],
  dryRun: boolean = false
): Promise<void> {
  const sorted = sortByWinnerPriority(group);
  const winner = _.first(sorted)!;
  const losers = _.tail(sorted);
  const loserIds = _.map(losers, 'id');

  const { finalName, finalGooglePlaceId, finalAliases, finalMetadata } =
    calculateMergedData(sorted);

  if (dryRun) {
    console.log(
      `\n[DRY RUN] Would merge ${losers.length} location(s) into ID ${winner.id}`
    );
    console.log(
      `  Winner: "${winner.name}" (ID: ${winner.id}, Source: ${winner.source}, Group: ${winner.groupName})`
    );
    console.log(
      `  Losers: ${_.map(losers, (l) => `"${l.name}" (ID: ${l.id}, Group: ${l.groupName})`).join(', ')}`
    );
    console.log(`  Final data:`);
    console.log(
      `    name: "${finalName}"${finalName !== winner.name ? ' (changed from Google Place)' : ''}`
    );
    console.log(`    googlePlaceId: ${finalGooglePlaceId || 'null'}`);
    console.log(
      `    lookupAliases: ${finalAliases.length > 0 ? finalAliases.join(', ') : 'null'}`
    );
    console.log(
      `    metadata keys: ${_.keys(finalMetadata).join(', ') || 'none'}`
    );
    return;
  }

  // Check if we need to merge groups
  const uniqueGroupIds = _.uniq(sorted.map((l) => l.groupId));
  const multipleGroups = uniqueGroupIds.length > 1;

  try {
    await prisma.$transaction(async (tx) => {
      // If multiple groups, merge them first
      if (multipleGroups) {
        const allGroups = await getGroupsInfo(uniqueGroupIds);
        const winnerGroup = _.first(allGroups)!;
        const loserGroupIds = _.tail(allGroups).map((g) => g.id);

        console.log(
          `   Merging ${loserGroupIds.length} group(s) into group "${winnerGroup.name}" (ID: ${winnerGroup.id})...`
        );

        // Migrate all locations from loser groups to winner group
        if (loserGroupIds.length > 0) {
          await tx.restaurantLocation.updateMany({
            where: { groupId: { in: loserGroupIds } },
            data: { groupId: winnerGroup.id },
          });
        }

        // Migrate all posts from loser groups to winner group
        await tx.$executeRaw`
          INSERT INTO "_PostToRestaurantGroup" ("A", "B")
          SELECT DISTINCT "A", ${winnerGroup.id}
          FROM "_PostToRestaurantGroup"
          WHERE "B" = ANY(${loserGroupIds})
          ON CONFLICT DO NOTHING
        `;

        // Delete old post relations
        await tx.$executeRaw`
          DELETE FROM "_PostToRestaurantGroup" WHERE "B" = ANY(${loserGroupIds})
        `;

        // Migrate all comments from loser groups to winner group
        await tx.$executeRaw`
          INSERT INTO "_CommentToRestaurantGroup" ("A", "B")
          SELECT DISTINCT "A", ${winnerGroup.id}
          FROM "_CommentToRestaurantGroup"
          WHERE "B" = ANY(${loserGroupIds})
          ON CONFLICT DO NOTHING
        `;

        // Delete old comment relations
        await tx.$executeRaw`
          DELETE FROM "_CommentToRestaurantGroup" WHERE "B" = ANY(${loserGroupIds})
        `;

        // Delete loser groups
        await tx.restaurantGroup.deleteMany({
          where: { id: { in: loserGroupIds } },
        });

        console.log(`   ✅ Group merge complete`);
      }

      // Now handle location merging

      // 1. Clear googlePlaceId from losers first to avoid constraint conflicts
      if (finalGooglePlaceId) {
        await tx.restaurantLocation.updateMany({
          where: {
            id: { in: loserIds },
            googlePlaceId: finalGooglePlaceId,
          },
          data: { googlePlaceId: null },
        });
      }

      // 2. Update winner with merged data
      await tx.restaurantLocation.update({
        where: { id: winner.id },
        data: {
          name: finalName,
          googlePlaceId: finalGooglePlaceId,
          lookupAliases: finalAliases,
          metadata: finalMetadata,
        },
      });

      // 3. Delete losers
      await tx.restaurantLocation.deleteMany({
        where: { id: { in: loserIds } },
      });
    });

    console.log(`✅ Successfully merged locations into ID ${winner.id}`);
  } catch (error) {
    console.error(`❌ Failed to merge:`, error);
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
 * Manual merge mode - merge specific location IDs
 */
async function manualMerge(locationIds: number[], dryRun: boolean) {
  console.log(
    `\n🔧 MANUAL MERGE MODE - Merging ${locationIds.length} locations\n`
  );

  // Fetch all locations with their group names
  const locations = await prisma.restaurantLocation.findMany({
    where: { id: { in: locationIds } },
    include: {
      group: {
        select: { name: true },
      },
    },
  });

  if (locations.length === 0) {
    console.log('❌ No locations found with the provided IDs');
    return;
  }

  if (locations.length !== locationIds.length) {
    const foundIds = locations.map((l) => l.id);
    const missingIds = locationIds.filter((id) => !foundIds.includes(id));
    console.log(
      `⚠️  Warning: Could not find locations with IDs: ${missingIds.join(', ')}`
    );
  }

  if (locations.length < 2) {
    console.log('❌ Need at least 2 locations to merge');
    return;
  }

  // Create a group with 100% similarity (manual merge)
  const group: RestaurantLocationDuplicate[] = locations.map((l) => ({
    ...l,
    nameSimilarity: 1.0,
    distanceMeters: 0,
    groupName: l.group.name,
  }));

  // Display the merge preview
  await displayFinding(group, 0);

  // Prompt for confirmation
  console.log(`\n${'='.repeat(80)}`);
  const answer = await prompt('\nProceed with merge? (yes/no): ');

  if (answer !== 'yes' && answer !== 'y') {
    console.log('\nMerge cancelled.');
    return;
  }

  // Perform the merge
  await mergeFinding(group, dryRun);
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
    const locationIds = idsStr.split(',').map((id) => parseInt(id.trim(), 10));

    if (locationIds.some((id) => isNaN(id))) {
      console.error('❌ Invalid location IDs. Use: --ids=1,2,3');
      process.exit(1);
    }

    await manualMerge(locationIds, dryRun);
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

  console.log('Processing restaurant locations in batches of 1000...\n');

  const totalCount = await prisma.restaurantLocation.count();
  const LOCATION_BATCH_SIZE = 1000;
  const processedLocations = new Set<number>();
  const processedGroups = new Set<number>();

  let totalGroupsFound = 0;
  let totalGroupsMerged = 0;
  let batchNumber = 0;
  let lastProcessedId = 0;
  let hasMore = true;

  while (hasMore) {
    batchNumber++;

    // Fetch batch of locations using cursor-based pagination
    const locationBatch = await prisma.restaurantLocation.findMany({
      where: { id: { gt: lastProcessedId } },
      orderBy: { id: 'asc' },
      take: LOCATION_BATCH_SIZE,
    });

    if (locationBatch.length === 0) {
      hasMore = false;
      break;
    }

    console.log(`\n${'='.repeat(80)}`);
    console.log(
      `Processing batch ${batchNumber} (${locationBatch.length} locations)`
    );
    console.log(`${'='.repeat(80)}\n`);

    // Find duplicates in this batch
    const duplicateFindings = await findDuplicatesInBatch(
      locationBatch,
      processedLocations,
      processedGroups
    );

    if (duplicateFindings.length === 0) {
      console.log('No duplicates found in this batch.\n');
      lastProcessedId = _.last(locationBatch)!.id;
      continue;
    }

    totalGroupsFound += duplicateFindings.length;

    // Separate perfect matches (100% similarity) from groups needing review
    const perfectMatches: RestaurantLocationDuplicate[][] = [];
    const needsReview: RestaurantLocationDuplicate[][] = [];

    // If --review-all flag is set, review everything. Otherwise auto-merge perfect matches.
    if (reviewAll) {
      needsReview.push(...duplicateFindings);
    } else {
      for (const finding of duplicateFindings) {
        // Check if all members have 100% name similarity and 0 distance
        const allPerfect = finding.every(
          (l) =>
            l.nameSimilarity === 1.0 &&
            (l.distanceMeters === null || l.distanceMeters === 0)
        );

        if (allPerfect) {
          perfectMatches.push(finding);
        } else {
          needsReview.push(finding);
        }
      }

      // Auto-merge perfect matches
      if (perfectMatches.length > 0) {
        console.log(
          `\n🔄 Auto-merging ${perfectMatches.length} perfect match group(s) (100% similarity)...`
        );
        for (const finding of perfectMatches) {
          const sorted = sortByWinnerPriority(finding);
          const winner = _.first(sorted)!;
          console.log(
            `  ✓ Merging ${finding.length} locations into "${winner.name}" (ID: ${winner.id})`
          );
          await mergeFinding(finding, dryRun);
          totalGroupsMerged++;
        }
      }
    }

    // If no groups need review, continue to next batch
    if (needsReview.length === 0) {
      console.log('No groups need manual review in this batch.\n');
      lastProcessedId = _.last(locationBatch)!.id;
      continue;
    }

    console.log(
      `\nFound ${needsReview.length} duplicate group(s) requiring review:\n`
    );

    // Display groups needing review
    for (let idx = 0; idx < needsReview.length; idx++) {
      await displayFinding(needsReview[idx], idx);
    }

    // Calculate average similarity for each group
    const groupSimilarities = needsReview.map((group) => {
      const avgName = _.meanBy(group, 'nameSimilarity');
      const distances = group
        .map((l) => l.distanceMeters)
        .filter((d) => d !== null) as number[];
      const avgDistance = distances.length > 0 ? _.mean(distances) : null;

      // Use name similarity percentage for display
      return avgName * 100;
    });

    const groupDescriptions = needsReview.map((group, idx) => {
      const avgName = _.meanBy(group, 'nameSimilarity');
      const distances = group
        .map((l) => l.distanceMeters)
        .filter((d) => d !== null) as number[];
      const avgDistance = distances.length > 0 ? _.mean(distances) : null;

      return avgDistance !== null
        ? `${(avgName * 100).toFixed(0)}% name, ${avgDistance.toFixed(0)}m`
        : `${(avgName * 100).toFixed(0)}% name`;
    });

    const descriptionList = groupDescriptions.join(', ');

    // Prompt for batch approval
    console.log(`\n${'='.repeat(80)}`);
    const answer = await prompt(
      `\nMerge these ${needsReview.length} group(s) (${descriptionList})? (yes/no): `
    );

    if (answer !== 'yes' && answer !== 'y') {
      console.log('\nExiting...');
      break;
    }

    // Merge approved groups
    console.log(`\nMerging ${needsReview.length} group(s)...`);
    for (const finding of needsReview) {
      await mergeFinding(finding, dryRun);
      totalGroupsMerged++;
    }
    console.log(`\n✅ Batch complete`);

    // Update cursor to last processed ID
    lastProcessedId = _.last(locationBatch)!.id;
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
