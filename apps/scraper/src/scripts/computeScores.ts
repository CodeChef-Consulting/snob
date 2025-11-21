import { config } from '@dotenvx/dotenvx';
config({ path: ['../../.env'] });

import { PrismaClient } from '@repo/db';
import {
  getRestaurantGroupsWithSentiment,
  loadRestaurantGroupItems,
} from '../scoring/dataLoader';
import {
  aggregateRestaurant,
  normalizeScores,
  type RestaurantScore,
  type NormalizedScore,
} from '../scoring/engine';

const prisma = new PrismaClient();

async function computeScores() {
  // Parse command-line arguments
  const args = process.argv.slice(2);

  // Show help
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Restaurant Group Scoring Engine

Usage:
  npm run compute-scores [groupIds] [options]

Options:
  --raw-only         Compute only raw scores (skip normalization)
  --normalized-only  Compute only normalized scores (requires existing raw scores)
  -h, --help         Show this help message

Examples:
  npm run compute-scores                    # Compute both raw and normalized for all restaurant groups
  npm run compute-scores -- --raw-only      # Compute only raw scores
  npm run compute-scores -- --normalized-only  # Compute only normalized scores
  npm run compute-scores -- 1,2,3           # Compute for specific restaurant group IDs
  npm run compute-scores -- 1,2,3 --raw-only   # Compute raw scores for specific IDs

Scoring:
  - Raw scores: Unbounded mathematical scores (typically -20 to +20)
  - Normalized scores: 0-10 scale with power-law distribution
    * Most restaurants cluster between 4-6 (median = 5)
    * High scores (7-10) are exponentially rarer
    * Distribution: 50th%→5.0, 75th%→6.2, 90th%→7.9, 95th%→8.8, 99th%→9.7
    `);
    process.exit(0);
  }

  console.log('='.repeat(80));
  console.log('RESTAURANT GROUP SCORING ENGINE');
  console.log('='.repeat(80));
  console.log();

  const rawOnly = args.includes('--raw-only');
  const normalizedOnly = args.includes('--normalized-only');

  // Filter out flags to get group IDs
  const idArgs = args.filter((arg) => !arg.startsWith('--'));
  let groupIds: number[];

  if (idArgs.length > 0) {
    // Parse comma-separated group IDs from command line
    groupIds = idArgs[0]
      .split(',')
      .map((id) => parseInt(id.trim()))
      .filter((id) => !isNaN(id));
    console.log(
      `Computing scores for ${groupIds.length} specific restaurant groups: ${groupIds.join(', ')}`
    );
    console.log();
  } else {
    // Get all restaurant groups with sentiment data
    console.log('Finding restaurant groups with sentiment data...');
    groupIds = await getRestaurantGroupsWithSentiment();
    console.log(
      `✓ Found ${groupIds.length} restaurant groups with sentiment data`
    );
    console.log();
  }

  if (groupIds.length === 0) {
    console.log('No restaurant groups found. Make sure you have:');
    console.log('  1. Posts/comments with sentiment extractions');
    console.log('  2. Restaurant groups linked to posts/comments');
    return;
  }

  // Step 1: Compute raw scores (if not normalized-only)
  let scores: RestaurantScore[] = [];

  if (!normalizedOnly) {
    console.log('Computing raw scores...');

    for (let i = 0; i < groupIds.length; i++) {
      const groupId = groupIds[i];

      if (i % 100 === 0) {
        console.log(`  Progress: ${i}/${groupIds.length}`);
      }

      const items = await loadRestaurantGroupItems(groupId);
      const score = aggregateRestaurant(items, String(groupId));
      scores.push(score);

      // Save raw score to database
      await prisma.restaurantGroup.update({
        where: { id: groupId },
        data: { rawScore: score.score },
      });
    }

    console.log(
      `✓ Computed and saved raw scores for ${scores.length} restaurant groups`
    );
    console.log();
  } else {
    // Load existing raw scores for normalization
    console.log('Loading existing raw scores for normalization...');
    const groups = await prisma.restaurantGroup.findMany({
      where: {
        id: { in: groupIds },
        rawScore: { not: null },
      },
      select: { id: true, rawScore: true },
    });

    scores = groups.map((r) => ({
      restaurantId: String(r.id),
      score: r.rawScore!,
      itemCount: 0,
      totalWeight: 0,
      threadCount: 0,
    }));

    console.log(`✓ Loaded ${scores.length} existing raw scores`);
    console.log();
  }

  // Step 2: Normalize scores (if not raw-only)
  let normalizedScores: NormalizedScore[] = [];

  if (!rawOnly) {
    console.log('Computing normalized scores...');
    normalizedScores = normalizeScores(scores);

    // Save normalized scores to database
    for (const normalized of normalizedScores) {
      await prisma.restaurantGroup.update({
        where: { id: parseInt(normalized.restaurantId) },
        data: { normalizedScore: normalized.normalizedScore },
      });
    }

    console.log(
      `✓ Computed and saved normalized scores for ${normalizedScores.length} restaurant groups`
    );
    console.log();
  }

  // Sort by score descending (use normalized if available, otherwise raw)
  if (normalizedScores.length > 0) {
    normalizedScores.sort((a, b) => b.normalizedScore - a.normalizedScore);
  } else {
    scores.sort((a, b) => b.score - a.score);
  }

  // Display top 20 restaurants
  console.log('='.repeat(80));
  console.log('TOP 20 RESTAURANTS BY SCORE');
  console.log('='.repeat(80));
  console.log();

  const displayCount = Math.min(
    20,
    normalizedScores.length > 0 ? normalizedScores.length : scores.length
  );

  for (let i = 0; i < displayCount; i++) {
    let restaurantId: string;
    let rawScore: number;
    let normalizedScore: number | undefined;
    let itemCount: number;
    let threadCount: number;
    let totalWeight: number;

    if (normalizedScores.length > 0) {
      const normalized = normalizedScores[i];
      restaurantId = normalized.restaurantId;
      rawScore = normalized.rawScore;
      normalizedScore = normalized.normalizedScore;

      // Find matching raw score for metadata
      const matchingRaw = scores.find((s) => s.restaurantId === restaurantId);
      itemCount = matchingRaw?.itemCount ?? 0;
      threadCount = matchingRaw?.threadCount ?? 0;
      totalWeight = matchingRaw?.totalWeight ?? 0;
    } else {
      const raw = scores[i];
      restaurantId = raw.restaurantId;
      rawScore = raw.score;
      normalizedScore = undefined;
      itemCount = raw.itemCount;
      threadCount = raw.threadCount;
      totalWeight = raw.totalWeight;
    }

    // Fetch restaurant group details
    const group = await prisma.restaurantGroup.findUnique({
      where: { id: parseInt(restaurantId) },
      select: {
        name: true,
        locations: {
          select: {
            address: true,
            city: true,
          },
          take: 1,
        },
      },
    });

    if (!group) continue;

    const locationCount = await prisma.restaurantLocation.count({
      where: { groupId: parseInt(restaurantId) },
    });

    console.log(`${i + 1}. ${group.name}${locationCount > 1 ? ` (${locationCount} locations)` : ''}`);
    if (normalizedScore !== undefined) {
      console.log(
        `   Normalized Score: ${normalizedScore.toFixed(3)} | Raw Score: ${rawScore.toFixed(2)}`
      );
    } else {
      console.log(`   Raw Score: ${rawScore.toFixed(2)}`);
    }
    if (group.locations[0]) {
      console.log(
        `   Location: ${group.locations[0].address ?? 'N/A'}${group.locations[0].city ? `, ${group.locations[0].city}` : ''}`
      );
    }
    console.log(
      `   Items: ${itemCount} | Threads: ${threadCount} | Weight: ${totalWeight.toFixed(2)}`
    );
    console.log();
  }

  // Display bottom 20 restaurants (most negative)
  console.log('='.repeat(80));
  console.log('BOTTOM 20 RESTAURANTS BY SCORE');
  console.log('='.repeat(80));
  console.log();

  const bottomCount = Math.min(
    20,
    normalizedScores.length > 0 ? normalizedScores.length : scores.length
  );
  const bottomItems =
    normalizedScores.length > 0
      ? normalizedScores.slice(-bottomCount).reverse()
      : scores.slice(-bottomCount).reverse();

  for (let i = 0; i < bottomItems.length; i++) {
    let restaurantId: string;
    let rawScore: number;
    let normalizedScore: number | undefined;
    let itemCount: number;
    let threadCount: number;
    let totalWeight: number;

    if (normalizedScores.length > 0) {
      const normalized = bottomItems[i] as NormalizedScore;
      restaurantId = normalized.restaurantId;
      rawScore = normalized.rawScore;
      normalizedScore = normalized.normalizedScore;

      const matchingRaw = scores.find((s) => s.restaurantId === restaurantId);
      itemCount = matchingRaw?.itemCount ?? 0;
      threadCount = matchingRaw?.threadCount ?? 0;
      totalWeight = matchingRaw?.totalWeight ?? 0;
    } else {
      const raw = bottomItems[i] as RestaurantScore;
      restaurantId = raw.restaurantId;
      rawScore = raw.score;
      normalizedScore = undefined;
      itemCount = raw.itemCount;
      threadCount = raw.threadCount;
      totalWeight = raw.totalWeight;
    }

    // Fetch restaurant group details
    const group = await prisma.restaurantGroup.findUnique({
      where: { id: parseInt(restaurantId) },
      select: {
        name: true,
        locations: {
          select: {
            address: true,
            city: true,
          },
          take: 1,
        },
      },
    });

    if (!group) continue;

    const locationCount = await prisma.restaurantLocation.count({
      where: { groupId: parseInt(restaurantId) },
    });

    console.log(`${i + 1}. ${group.name}${locationCount > 1 ? ` (${locationCount} locations)` : ''}`);
    if (normalizedScore !== undefined) {
      console.log(
        `   Normalized Score: ${normalizedScore.toFixed(3)} | Raw Score: ${rawScore.toFixed(2)}`
      );
    } else {
      console.log(`   Raw Score: ${rawScore.toFixed(2)}`);
    }
    if (group.locations[0]) {
      console.log(
        `   Location: ${group.locations[0].address ?? 'N/A'}${group.locations[0].city ? `, ${group.locations[0].city}` : ''}`
      );
    }
    console.log(
      `   Items: ${itemCount} | Threads: ${threadCount} | Weight: ${totalWeight.toFixed(2)}`
    );
    console.log();
  }

  // Statistics
  console.log('='.repeat(80));
  console.log('SCORE STATISTICS');
  console.log('='.repeat(80));
  console.log();

  if (normalizedScores.length > 0) {
    // Show both raw and normalized stats
    const allRawScores = scores.map((s) => s.score);
    const rawMean =
      allRawScores.reduce((sum, s) => sum + s, 0) / allRawScores.length;
    const sortedRawScores = [...allRawScores].sort((a, b) => a - b);
    const rawMedian = sortedRawScores[Math.floor(sortedRawScores.length / 2)];
    const rawMin = sortedRawScores[0];
    const rawMax = sortedRawScores[sortedRawScores.length - 1];

    const allNormalizedScores = normalizedScores.map((s) => s.normalizedScore);
    const normMean =
      allNormalizedScores.reduce((sum, s) => sum + s, 0) /
      allNormalizedScores.length;
    const sortedNormScores = [...allNormalizedScores].sort((a, b) => a - b);
    const normMedian =
      sortedNormScores[Math.floor(sortedNormScores.length / 2)];
    const normMin = sortedNormScores[0];
    const normMax = sortedNormScores[sortedNormScores.length - 1];

    console.log(`Total restaurants: ${scores.length}`);
    console.log();
    console.log('RAW SCORES:');
    console.log(
      `  Mean: ${rawMean.toFixed(2)} | Median: ${rawMedian.toFixed(2)}`
    );
    console.log(`  Min: ${rawMin.toFixed(2)} | Max: ${rawMax.toFixed(2)}`);
    console.log();
    console.log('NORMALIZED SCORES (0-10 scale, power-law distribution):');
    console.log(
      `  Mean: ${normMean.toFixed(3)} | Median: ${normMedian.toFixed(3)}`
    );
    console.log(`  Min: ${normMin.toFixed(3)} | Max: ${normMax.toFixed(3)}`);
    console.log();
    console.log('DISTRIBUTION (percentile → normalized score):');
    console.log(
      `  50th → 5.0 | 75th → 6.2 | 90th → 7.9 | 95th → 8.8 | 99th → 9.7`
    );
  } else {
    // Show only raw stats
    const allScores = scores.map((s) => s.score);
    const mean = allScores.reduce((sum, s) => sum + s, 0) / allScores.length;
    const sortedScores = [...allScores].sort((a, b) => a - b);
    const median = sortedScores[Math.floor(sortedScores.length / 2)];
    const min = sortedScores[0];
    const max = sortedScores[sortedScores.length - 1];

    console.log(`Total restaurants: ${scores.length}`);
    console.log(`Mean score: ${mean.toFixed(2)}`);
    console.log(`Median score: ${median.toFixed(2)}`);
    console.log(`Min score: ${min.toFixed(2)}`);
    console.log(`Max score: ${max.toFixed(2)}`);
  }
  console.log();
}

computeScores()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Error:', error);
    process.exit(1);
  });
