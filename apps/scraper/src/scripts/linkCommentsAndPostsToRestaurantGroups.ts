import { config } from '@dotenvx/dotenvx';
import { PrismaClient } from '@repo/db';
import Fuse, { FuseResult } from 'fuse.js';
import _, { indexOf } from 'lodash';
import {
  checkExistingLocationByPlaceId,
  findPlaceByName,
  lookupAndAddRestaurantLocationAndGroup,
} from '../utils/googlePlaces';
config({ path: ['../../.env'] });

const prisma = new PrismaClient();

interface LinkingStats {
  postsProcessed: number;
  postsLinked: number;
  postsWithUnmatched: number;
  totalMentions: number;
  fuzzyMatches: number;
  unmatchedMentions: number;
  unmatchedNames: Set<string>;
  commentsProcessed: number;
  commentsLinked: number;
  // Google Places stats (required by lookupAndAddRestaurantLocationAndGroup)
  googlePlacesLookups: number;
  googlePlacesAdded: number;
  googlePlacesFailed: number;
}

// Common restaurant name suffixes and prefixes to strip for normalization
const COMMON_SUFFIXES = [
  'Restaurant',
  'Cafe',
  'Grill',
  'Kitchen',
  'Bar',
  'Food',
  'House',
  'Sushi',
  'BBQ',
  'Bbq',
  'Tacos',
  'Burgers',
  'Bakery',
  'Pizzeria',
  'Bistro',
  'Market',
  'Shop',
  'Place',
  'Spot',
  'Eatery',
  'Steakhouse',
];

const COMMON_PREFIXES = ['The', 'Los', 'Las', 'El', 'La'];

/**
 * Normalizes a restaurant name by removing common prefixes and suffixes
 * @param name Original restaurant name
 * @returns Normalized name without common prefixes/suffixes
 */
function normalizeRestaurantName(name: string): string {
  let normalized = name.trim();

  // Remove common prefixes (case-insensitive)
  for (const prefix of COMMON_PREFIXES) {
    const pattern = new RegExp(`^${prefix}\\s+`, 'i');
    normalized = normalized.replace(pattern, '');
  }

  // Remove common suffixes (case-insensitive)
  for (const suffix of COMMON_SUFFIXES) {
    const pattern = new RegExp(`\\s+${suffix}$`, 'i');
    normalized = normalized.replace(pattern, '');
  }

  return normalized.trim();
}

/**
 * Two-pass fuzzy matching for restaurant locations. Doesnt need to be too exact now that we have restaurant groups.
 * @param extractedName Original restaurant name from extraction
 * @param fuse Fuse.js instance for searching locations
 * @param threshold Score threshold for matching (default 0.3)
 * @returns Best match result with groupId if found, null otherwise
 */
function findRestaurantLocationMatch(
  extractedName: string,
  fuse: Fuse<{ id: number; name: string; groupId: number }>,
  threshold: number = 0.3
): FuseResult<{ id: number; name: string; groupId: number }> | null {
  // Pass 1: Search with original name
  const originalResults = fuse.search(extractedName);
  if (
    originalResults.length > 0 &&
    originalResults[0].score !== undefined &&
    originalResults[0].score < threshold
  ) {
    return originalResults[0];
  }

  // Pass 2: Search with normalized name (suffixes/prefixes removed)
  const normalized = normalizeRestaurantName(extractedName);
  if (normalized !== extractedName && normalized.length > 0) {
    const normalizedResults = fuse.search(normalized);
    if (
      normalizedResults.length > 0 &&
      normalizedResults[0].score !== undefined &&
      normalizedResults[0].score < threshold
    ) {
      return normalizedResults[0];
    }
  }

  return null;
}

/**
 * Check if a restaurant name matches any RestaurantLocation lookupAlias exactly
 * @param restaurantName Original restaurant name from extraction
 * @param prisma Prisma client instance
 * @returns groupId if exact alias match found, null otherwise
 */
async function findLocationByExactNameOrAlias(
  restaurantName: string,
  prisma: PrismaClient
): Promise<{ groupId: number; locationName: string } | null> {
  const normalizedName = restaurantName.trim().toLowerCase();
  const locationMatches = await prisma.restaurantLocation.findMany({
    where: {
      OR: [
        {
          name: {
            equals: restaurantName,
          },
        },
        {
          lookupAliases: {
            has: normalizedName,
          },
        },
      ],
    },
    select: {
      id: true,
      name: true,
      lookupAliases: true,
      groupId: true,
    },
  });

  for (const location of locationMatches) {
    if (location?.name === restaurantName) {
      console.log(
        `   🔗 Exact NAME match: "${restaurantName}" → Location "${location.name}" (Group ID: ${location.groupId})`
      );
      // Exact match
      return { groupId: location.groupId, locationName: location.name };
    }

    if (location?.lookupAliases && location.lookupAliases.length > 0) {
      // Verify it's an exact match (not just a substring)
      if (location.lookupAliases.find((alias) => alias === normalizedName)) {
        console.log(
          `   🔗 Exact ALIAS match: "${restaurantName}" → Location "${location.name}" (Group ID: ${location.groupId})`
        );
        return { groupId: location.groupId, locationName: location.name };
      }
    }
  }

  return null;
}

/**
 * Split extractions into primary and secondary groups based on restaurant names
 */
function createExtractionGroups<
  T extends {
    postId?: number | null;
    commentId?: number | null;
    restaurantsMentioned: string[];
    primaryRestaurant: string | null;
  },
>(extractions: T[], contentType: 'post' | 'comment') {
  const idField = contentType === 'post' ? 'postId' : 'commentId';

  // Separate into primary and secondary extractions
  const withPrimary = extractions.filter(
    (e) => e[idField] && e.primaryRestaurant
  );
  const withoutPrimary = extractions.filter(
    (e) =>
      e[idField] &&
      !e.primaryRestaurant &&
      e.restaurantsMentioned &&
      e.restaurantsMentioned.length >= 1
  );

  // Group by restaurant name(s) - join array to create unique group key
  // Using ^ as delimiter since it won't appear in restaurant names
  const primaryGroups = _.groupBy(withPrimary, (e) => e.primaryRestaurant);
  const secondaryGroups = _.groupBy(withoutPrimary, (e) =>
    e.restaurantsMentioned.join('^')
  );

  return { primaryGroups, secondaryGroups };
}

/**
 * Process a group of extractions that share the same restaurant name(s)
 * Works for both posts and comments
 */
async function processExtractionGroup(options: {
  groupKey: string;
  extractions: Array<{
    postId?: number | null;
    commentId?: number | null;
    restaurantsMentioned: string[];
    primaryRestaurant: string | null;
  }>;
  groupType: 'primary' | 'secondary';
  contentType: 'post' | 'comment';
  stats: LinkingStats;
  restaurantLocationNameFuse: Fuse<{
    id: number;
    name: string;
    groupId: number;
  }>;
  prisma: PrismaClient;
}) {
  const {
    groupKey,
    extractions,
    groupType,
    contentType,
    stats,
    restaurantLocationNameFuse,
    prisma,
  } = options;
  const icon = groupType === 'primary' ? '🎯' : '📍';
  console.log(
    `\n${icon} Processing ${groupType} ${contentType} group: "${groupKey}" (${extractions.length} ${contentType}s)`
  );

  // Parse restaurant names (primary has single name, secondary has array joined by ^)
  const restaurantNames =
    groupType === 'primary'
      ? [groupKey]
      : groupKey.split('^').filter((n) => n.trim());

  const matchedGroupIds = new Set<number>();
  let hadGooglePlacesErrorOrDidntTryGooglePlaces = false;

  // Look up each restaurant name
  for (const restaurantName of restaurantNames) {
    // Step 1: Check if any RestaurantLocation has this as a lookupAlias (exact match)
    const exactAliasMatch = await findLocationByExactNameOrAlias(
      restaurantName,
      prisma
    );
    if (exactAliasMatch) {
      matchedGroupIds.add(exactAliasMatch.groupId);
      stats.fuzzyMatches++; // Reusing this stat for alias matches
      continue;
    }

    const idOnlyPlace = await findPlaceByName(
      restaurantName,
      'Los Angeles, CA',
      'places.id'
    );

    console.log('idOnlyPlace', idOnlyPlace?.id);

    if (idOnlyPlace?.id) {
      const result = await checkExistingLocationByPlaceId(
        idOnlyPlace?.id || '',
        restaurantName,
        prisma
      );
      if (result.groupId) {
        console.log(
          `   🔗 Google Places ID match (FREE): "${restaurantName}" → (Group ID: ${result.groupId})`
        );
        matchedGroupIds.add(result.groupId);
        stats.fuzzyMatches++;
        continue;
      }
    }

    // Step 2: Try fuzzy matching on RestaurantLocation names
    const locationFuzzyMatch = findRestaurantLocationMatch(
      restaurantName,
      restaurantLocationNameFuse,
      0.1
    );
    if (locationFuzzyMatch) {
      matchedGroupIds.add(locationFuzzyMatch.item.groupId);
      stats.fuzzyMatches++;
      console.log(
        `✅ Fuzzy match: "${restaurantName}" → Location "${locationFuzzyMatch.item.name}" (Group ID: ${locationFuzzyMatch.item.groupId}, score: ${locationFuzzyMatch.score!.toFixed(3)})`
      );
    } else if (idOnlyPlace?.id) {
      console.log(
        `🔍 "${restaurantName}" → no fuzzy match, trying Google Places...`
      );
      const result = {
        hadError: true,
        groupId: null,
      };

      // const result = await lookupAndAddRestaurantLocationAndGroup(
      //   restaurantName,
      //   idOnlyPlace.id,
      //   prisma,
      //   stats,
      //   restaurantLocationNameFuse
      // );

      if (result.hadError) {
        hadGooglePlacesErrorOrDidntTryGooglePlaces = true;
        console.log(`⚠️  "${restaurantName}" → Google Places error`);
      } else if (result.groupId) {
        matchedGroupIds.add(result.groupId);
        stats.fuzzyMatches++;
      } else {
        stats.unmatchedMentions++;
        stats.unmatchedNames.add(restaurantName);
        console.log(`❌ "${restaurantName}" → not found anywhere`);
      }
    } else if (!idOnlyPlace?.id) {
      hadGooglePlacesErrorOrDidntTryGooglePlaces = true;
      console.log(`❌ "${restaurantName}" → no Google Places ID found`);
    }
  }

  // Batch update all posts/comments in this group
  const ids =
    contentType === 'post'
      ? extractions.map((e) => e.postId!)
      : extractions.map((e) => e.commentId!);

  if (contentType === 'post') {
    stats.postsProcessed += ids.length;
  } else {
    stats.commentsProcessed += ids.length;
  }

  if (matchedGroupIds.size > 0) {
    await Promise.all(
      ids.map((id) =>
        contentType === 'post'
          ? prisma.post.update({
              where: { id },
              data: {
                restaurantGroupsMentioned: {
                  set: Array.from(matchedGroupIds).map((groupId) => ({
                    id: groupId,
                  })),
                },
              },
            })
          : prisma.comment.update({
              where: { id },
              data: {
                restaurantGroupsMentioned: {
                  set: Array.from(matchedGroupIds).map((groupId) => ({
                    id: groupId,
                  })),
                },
              },
            })
      )
    );

    if (contentType === 'post') {
      stats.postsLinked += ids.length;
    } else {
      stats.commentsLinked += ids.length;
    }
  }

  // Mark extractions as attempted, if there wasn't a place we should have looked up using google places
  if (!hadGooglePlacesErrorOrDidntTryGooglePlaces) {
    await Promise.all(
      ids.map((id) =>
        prisma.restaurantExtraction.update({
          where: contentType === 'post' ? { postId: id } : { commentId: id },
          data: { attemptedLinkToRestaurantsMentioned: true },
        })
      )
    );
  }

  console.log(
    `   Updated ${ids.length} ${contentType}s with ${matchedGroupIds.size} restaurant group(s)`
  );
}

async function clearExistingConnections() {
  console.log('Clearing existing restaurant group connections...\n');

  // Get all posts and clear their restaurant group connections
  const allPosts = await prisma.post.findMany({
    select: { id: true },
  });

  for (const post of allPosts) {
    await prisma.post.update({
      where: { id: post.id },
      data: {
        restaurantGroupsMentioned: {
          set: [],
        },
      },
    });
  }

  // Get all comments and clear their restaurant group connections
  const allComments = await prisma.comment.findMany({
    select: { id: true },
  });

  for (const comment of allComments) {
    await prisma.comment.update({
      where: { id: comment.id },
      data: {
        restaurantGroupsMentioned: {
          set: [],
        },
      },
    });
  }

  console.log(
    `Cleared restaurant group connections for ${allPosts.length} posts and ${allComments.length} comments.\n`
  );
}

async function linkCommentsAndPostsToRestaurantGroups() {
  try {
    // Check for --clear flag
    const shouldClear = process.argv.includes('--clear');

    if (shouldClear) {
      await clearExistingConnections();
    }

    console.log('Starting restaurant group linking process...\n');

    const stats: LinkingStats = {
      postsProcessed: 0,
      postsLinked: 0,
      postsWithUnmatched: 0,
      totalMentions: 0,
      fuzzyMatches: 0,
      unmatchedMentions: 0,
      unmatchedNames: new Set(),
      commentsProcessed: 0,
      commentsLinked: 0,
      googlePlacesLookups: 0,
      googlePlacesAdded: 0,
      googlePlacesFailed: 0,
    };

    // Get all restaurant locations for fuzzy matching
    const restaurantLocations = await prisma.restaurantLocation.findMany({
      select: {
        id: true,
        name: true,
        groupId: true,
      },
    });

    console.log(
      `Loaded ${restaurantLocations.length} restaurant locations from database\n`
    );

    // Create Fuse.js instance for fuzzy matching on location names
    const restaurantLocationNameFuse = new Fuse(restaurantLocations, {
      keys: ['name'],
      threshold: 0.3, // Lower = more strict (0.0 = exact, 1.0 = match anything)
      ignoreLocation: true,
      includeScore: true,
    });

    // Check for --reattempt-all flag (default is to skip already attempted)
    const reattemptAll = process.argv.includes('--reattempt-all');

    // Check for content type flags
    const postsOnly = process.argv.includes('--posts-only');
    const commentsOnly = process.argv.includes('--comments-only');

    // Check for group type flags
    const primaryOnly = process.argv.includes('--primary-only');
    const secondaryOnly = process.argv.includes('--secondary-only');

    // Determine which content types to process
    let submissionTypes: Array<'post' | 'comment'> = ['post', 'comment'];
    if (postsOnly) {
      submissionTypes = ['post'];
    } else if (commentsOnly) {
      submissionTypes = ['comment'];
    }

    for (const contentType of submissionTypes) {
      const idField = contentType === 'post' ? 'postId' : 'commentId';

      // Fetch extractions for this content type
      const extractions = await prisma.restaurantExtraction.findMany({
        where: {
          [idField]: { not: null },
          ...(!reattemptAll && { attemptedLinkToRestaurantsMentioned: false }),
          isSubjective: true,
        },
        select: {
          postId: true,
          commentId: true,
          restaurantsMentioned: true,
          primaryRestaurant: true,
        },
      });

      console.log(
        `${contentType === 'post' ? '' : '\n'}Found ${extractions.length} ${contentType} extractions to process\n`
      );

      // Create extraction groups
      const { primaryGroups, secondaryGroups } = createExtractionGroups(
        extractions,
        contentType
      );

      console.log(
        `Split ${contentType}s into ${Object.keys(primaryGroups).length} primary groups, ${Object.keys(secondaryGroups).length} secondary groups\n`
      );

      // Process primary groups (unless --secondary-only is set)
      let indexStart = false;
      console.log(
        'INDEX OF Szechuan Impresssion',
        indexOf(Object.keys(primaryGroups), 'Szechuan Impression')
      );
      if (!secondaryOnly) {
        for (const [groupKey, groupExtractions] of Object.entries(
          primaryGroups
        )) {
          if (groupKey === 'Szechuan Impression') {
            indexStart = true;
          } else if (!indexStart) {
            continue;
          }

          await processExtractionGroup({
            groupKey,
            extractions: groupExtractions,
            groupType: 'primary',
            contentType,
            stats,
            restaurantLocationNameFuse,
            prisma,
          });
        }
      }

      // Process secondary groups (unless --primary-only is set)
      if (!primaryOnly) {
        for (const [groupKey, groupExtractions] of Object.entries(
          secondaryGroups
        )) {
          await processExtractionGroup({
            groupKey,
            extractions: groupExtractions,
            groupType: 'secondary',
            contentType,
            stats,
            restaurantLocationNameFuse,
            prisma,
          });
        }
      }
    }

    // Print summary
    console.log('\n=== Linking Complete ===');
    console.log(`\nPosts:`);
    console.log(`  Processed: ${stats.postsProcessed}`);
    console.log(`  Linked to restaurant groups: ${stats.postsLinked}`);
    console.log(`\nComments:`);
    console.log(`  Processed: ${stats.commentsProcessed}`);
    console.log(`  Linked to restaurant groups: ${stats.commentsLinked}`);
    console.log(`\nMentions statistics:`);
    console.log(`  Total mentions: ${stats.totalMentions}`);
    console.log(`  Fuzzy matches: ${stats.fuzzyMatches}`);
    console.log(`  Unmatched mentions: ${stats.unmatchedMentions}`);
    console.log(`  Unique unmatched names: ${stats.unmatchedNames.size}`);
  } catch (error) {
    console.error('Error linking restaurant groups:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Help text
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(`
Usage: tsx src/scripts/linkCommentsAndPostsToRestaurantGroups.ts [options]

Options:
  --clear            Clear all existing restaurant group connections before linking
  --reattempt-all    Reprocess ALL extractions (default: skip already attempted)
  --posts-only       Only process posts (skip comments)
  --comments-only    Only process comments (skip posts)
  --primary-only     Only process primary restaurant mentions (skip secondary)
  --secondary-only   Only process secondary restaurant mentions (skip primary)
  -h, --help         Show this help message

Examples:
  # Process only new extractions (default behavior)
  tsx src/scripts/linkCommentsAndPostsToRestaurantGroups.ts

  # Clear all connections and start fresh
  tsx src/scripts/linkCommentsAndPostsToRestaurantGroups.ts --clear

  # Reprocess everything including previously attempted
  tsx src/scripts/linkCommentsAndPostsToRestaurantGroups.ts --reattempt-all

  # Process only posts
  tsx src/scripts/linkCommentsAndPostsToRestaurantGroups.ts --posts-only

  # Process only comments
  tsx src/scripts/linkCommentsAndPostsToRestaurantGroups.ts --comments-only

  # Process only primary restaurant mentions
  tsx src/scripts/linkCommentsAndPostsToRestaurantGroups.ts --primary-only

  # Process only secondary restaurant mentions
  tsx src/scripts/linkCommentsAndPostsToRestaurantGroups.ts --secondary-only

Features:
  ✅ Fuzzy matching using Fuse.js (threshold 0.3)
  ✅ Links to RestaurantGroup (brand/chain level) instead of individual locations
  ✅ Alias matching for exact lookups
  ✅ Tracks attempted linkings to avoid reprocessing (use --reattempt-all to override)
  ✅ Batch processing by restaurant name for optimal performance

Note:
  Run migrateToRestaurantGroups.ts BEFORE running this script to ensure
  all Restaurant records have been migrated to RestaurantGroups.
  `);
  process.exit(0);
}

linkCommentsAndPostsToRestaurantGroups()
  .then(() => {
    console.log('\nRestaurant group linking completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Restaurant group linking failed:', error);
    process.exit(1);
  });
