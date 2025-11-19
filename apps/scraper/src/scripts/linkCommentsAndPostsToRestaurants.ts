import { config } from '@dotenvx/dotenvx';
import { PrismaClient } from '@repo/db';
import Fuse, { FuseResult } from 'fuse.js';
import _ from 'lodash';
import { lookupAndAddRestaurant } from '../utils/googlePlaces';
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
 * Two-pass fuzzy matching: first with original name, then with normalized name
 * @param extractedName Original restaurant name from extraction
 * @param fuse Fuse.js instance for searching
 * @param threshold Score threshold for matching (default 0.3)
 * @returns Best match result if found, null otherwise
 */
function findRestaurantMatch(
  extractedName: string,
  fuse: Fuse<{ id: number; name: string }>,
  threshold: number = 0.3
): FuseResult<{ id: number; name: string }> | null {
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
 * Split extractions into primary and secondary groups based on restaurant names
 */
function createRestaurantGroups<
  T extends {
    postId?: number | null;
    commentId?: number | null;
    restaurantsMentioned: string;
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
      e.restaurantsMentioned.split(',').filter((n) => n.trim()).length >= 1
  );

  // Group by restaurant name
  const primaryGroups = _.groupBy(withPrimary, (e) => e.primaryRestaurant);
  const secondaryGroups = _.groupBy(withoutPrimary, (e) =>
    e.restaurantsMentioned.trim()
  );

  return { primaryGroups, secondaryGroups };
}

/**
 * Process a group of extractions that share the same restaurant name(s)
 * Works for both posts and comments
 */
async function processRestaurantGroup(
  groupKey: string,
  extractions: Array<{
    postId?: number | null;
    commentId?: number | null;
    restaurantsMentioned: string;
    primaryRestaurant: string | null;
  }>,
  groupType: 'primary' | 'secondary',
  contentType: 'post' | 'comment',
  stats: LinkingStats,
  fuse: Fuse<{ id: number; name: string }>,
  restaurants: { id: number; name: string }[],
  addressFuse: Fuse<{ id: number; address: string }> | null,
  prisma: PrismaClient
) {
  const icon = groupType === 'primary' ? '🎯' : '📍';
  console.log(
    `\n${icon} Processing ${groupType} ${contentType} group: "${groupKey}" (${extractions.length} ${contentType}s)`
  );

  // Parse restaurant names (primary has single name, secondary may have comma-separated)
  const restaurantNames =
    groupType === 'primary'
      ? [groupKey]
      : groupKey
          .split(',')
          .map((n) => n.trim())
          .filter((n) => !!n);

  const matchedRestaurantIds = new Set<number>();
  let hadGooglePlacesError = false;

  // Look up each restaurant name
  for (const restaurantName of restaurantNames) {
    //handle alias match first, it's the strongest match. later we'll manually configure some alias matches to make sure they're linked to the correct restaurant
    const normalizedName = restaurantName.trim().toLowerCase();
    const aliasMatch = await prisma.restaurant.findMany({
      where: {
        lookupAliases: {
          contains: normalizedName, // This will do a case-insensitive LIKE search
        },
      },
      select: { id: true, name: true, lookupAliases: true },
    });

    let hasExactAliasMatch = false;
    for (const alias of aliasMatch) {
      if (alias && alias.lookupAliases) {
        // Verify it's an exact match (not just a substring)
        const aliases = alias.lookupAliases.split(',');
        if (aliases.includes(normalizedName)) {
          console.log(
            `   🔗 Exact alias match: "${restaurantName}" → "${alias.name}"`
          );
          matchedRestaurantIds.add(alias.id);
          stats.fuzzyMatches++;
          hasExactAliasMatch = true;
          break;
        }
      }
    }
    if (hasExactAliasMatch) {
      continue;
    }

    const matchResult = findRestaurantMatch(restaurantName, fuse);

    if (matchResult) {
      matchedRestaurantIds.add(matchResult.item.id);
      stats.fuzzyMatches++;
      console.log(
        `✅ "${restaurantName}" → "${matchResult.item.name}" (score: ${matchResult.score!.toFixed(3)})`
      );
    } else {
      console.log(
        `🔍 "${restaurantName}" → no fuzzy match, trying Google Places...`
      );
      const result = {
        hadError: true,
        restaurantId: null,
      };

      // await lookupAndAddRestaurant(
      //   restaurantName,
      //   prisma,
      //   stats,
      //   fuse,
      //   restaurants,
      //   addressFuse
      // );

      if (result.hadError) {
        hadGooglePlacesError = true;
        console.log(`⚠️  "${restaurantName}" → Google Places error`);
      } else if (result.restaurantId) {
        matchedRestaurantIds.add(result.restaurantId);
        stats.fuzzyMatches++;
      } else {
        stats.unmatchedMentions++;
        stats.unmatchedNames.add(restaurantName);
        console.log(`❌ "${restaurantName}" → not found anywhere`);
      }
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

  if (matchedRestaurantIds.size > 0) {
    await Promise.all(
      ids.map((id) =>
        contentType === 'post'
          ? prisma.post.update({
              where: { id },
              data: {
                restaurantsMentioned: {
                  set: Array.from(matchedRestaurantIds).map((restId) => ({
                    id: restId,
                  })),
                },
              },
            })
          : prisma.comment.update({
              where: { id },
              data: {
                restaurantsMentioned: {
                  set: Array.from(matchedRestaurantIds).map((restId) => ({
                    id: restId,
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

  // Mark extractions as attempted (unless there was an error)
  if (!hadGooglePlacesError) {
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
    `   Updated ${ids.length} ${contentType}s with ${matchedRestaurantIds.size} restaurant(s)`
  );
}

async function clearExistingConnections() {
  console.log('Clearing existing restaurant connections...\n');

  // Get all posts and clear their restaurant connections
  const allPosts = await prisma.post.findMany({
    select: { id: true },
  });

  for (const post of allPosts) {
    await prisma.post.update({
      where: { id: post.id },
      data: {
        restaurantsMentioned: {
          set: [],
        },
      },
    });
  }

  // Get all comments and clear their restaurant connections
  const allComments = await prisma.comment.findMany({
    select: { id: true },
  });

  for (const comment of allComments) {
    await prisma.comment.update({
      where: { id: comment.id },
      data: {
        restaurantsMentioned: {
          set: [],
        },
      },
    });
  }

  console.log(
    `Cleared connections for ${allPosts.length} posts and ${allComments.length} comments.\n`
  );
}

async function linkCommentsAndPostsToRestaurants() {
  try {
    // Check for --clear flag
    const shouldClear = process.argv.includes('--clear');

    if (shouldClear) {
      await clearExistingConnections();
    }

    console.log('Starting restaurant linking process...\n');

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

    // Get all restaurants and create Fuse.js index for name matching
    const restaurants = await prisma.restaurant.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    console.log(`Loaded ${restaurants.length} restaurants from database\n`);

    // Create Fuse.js instance for name-based fuzzy matching
    const fuse = new Fuse(restaurants, {
      keys: ['name'],
      threshold: 0.3, // Lower = more strict (0.0 = exact, 1.0 = match anything)
      ignoreLocation: true,
      includeScore: true,
    });

    // Get non-Google Places restaurants with addresses for address-based matching
    const restaurantsWithAddress = await prisma.restaurant.findMany({
      where: {
        source: { not: 'Google Places API' },
        OR: [{ address: { not: null } }],
      },
      select: {
        id: true,
        address: true,
        city: true,
        state: true,
        zipCode: true,
        metadata: true,
      },
    });

    console.log(
      `Loaded ${restaurantsWithAddress.length} non-Google Places restaurants with addresses for deduplication\n`
    );

    // Create address array for Fuse (prefer metadata.formattedAddress, fallback to constructed address)
    const restaurantAddresses = restaurantsWithAddress
      .map((r) => {
        // Try metadata.formattedAddress first
        const formattedAddress =
          (r.metadata as any)?.formattedAddress ||
          [r.address, r.city, r.state, r.zipCode].filter(Boolean).join(', ');

        return formattedAddress
          ? { id: r.id, address: formattedAddress }
          : null;
      })
      .filter((r): r is { id: number; address: string } => r !== null);

    // Create Fuse.js instance for address-based fuzzy matching
    const addressFuse =
      restaurantAddresses.length > 0
        ? new Fuse(restaurantAddresses, {
            keys: ['address'],
            threshold: 0.3,
            ignoreLocation: true,
            includeScore: true,
          })
        : null;

    console.log(
      `Created address-based Fuse index with ${restaurantAddresses.length} addresses\n`
    );

    // Check for --reattempt-all flag (default is to skip already attempted)
    const reattemptAll = process.argv.includes('--reattempt-all');

    // Check for content type flags
    const postsOnly = process.argv.includes('--posts-only');
    const commentsOnly = process.argv.includes('--comments-only');

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

      // Create restaurant groups
      const { primaryGroups, secondaryGroups } = createRestaurantGroups(
        extractions,
        contentType
      );

      console.log(
        `Split ${contentType}s into ${Object.keys(primaryGroups).length} primary groups, ${Object.keys(secondaryGroups).length} secondary groups\n`
      );

      // Process primary groups
      for (const [groupKey, groupExtractions] of Object.entries(
        primaryGroups
      )) {
        await processRestaurantGroup(
          groupKey,
          groupExtractions,
          'primary',
          contentType,
          stats,
          fuse,
          restaurants,
          addressFuse,
          prisma
        );
      }

      // Process secondary groups
      for (const [groupKey, groupExtractions] of Object.entries(
        secondaryGroups
      )) {
        await processRestaurantGroup(
          groupKey,
          groupExtractions,
          'secondary',
          contentType,
          stats,
          fuse,
          restaurants,
          addressFuse,
          prisma
        );
      }
    }

    // Print summary
    console.log('\n=== Linking Complete ===');
    console.log(`\nPosts:`);
    console.log(`  Processed: ${stats.postsProcessed}`);
    console.log(`  Linked to restaurants: ${stats.postsLinked}`);
    console.log(`\nComments:`);
    console.log(`  Processed: ${stats.commentsProcessed}`);
    console.log(`  Linked to restaurants: ${stats.commentsLinked}`);
    console.log(`\nMentions statistics:`);
    console.log(`  Total mentions: ${stats.totalMentions}`);
    console.log(`  Fuzzy matches: ${stats.fuzzyMatches}`);
    console.log(`  Unmatched mentions: ${stats.unmatchedMentions}`);
    console.log(`  Unique unmatched names: ${stats.unmatchedNames.size}`);
    console.log(`\nGoogle Places API:`);
    console.log(`  Lookups attempted: ${stats.googlePlacesLookups}`);
    console.log(`  Restaurants added: ${stats.googlePlacesAdded}`);
    console.log(`  Failed lookups: ${stats.googlePlacesFailed}`);
  } catch (error) {
    console.error('Error linking restaurants:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Help text
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(`
Usage: tsx src/scripts/linkCommentsAndPostsToRestaurants.ts [options]

Options:
  --clear           Clear all existing restaurant connections before linking
  --reattempt-all   Reprocess ALL extractions (default: skip already attempted)
  --posts-only      Only process posts (skip comments)
  --comments-only   Only process comments (skip posts)
  -h, --help        Show this help message

Examples:
  # Process only new extractions (default behavior)
  tsx src/scripts/linkCommentsAndPostsToRestaurants.ts

  # Clear all connections and start fresh
  tsx src/scripts/linkCommentsAndPostsToRestaurants.ts --clear

  # Reprocess everything including previously attempted
  tsx src/scripts/linkCommentsAndPostsToRestaurants.ts --reattempt-all

  # Process only posts
  tsx src/scripts/linkCommentsAndPostsToRestaurants.ts --posts-only

  # Process only comments
  tsx src/scripts/linkCommentsAndPostsToRestaurants.ts --comments-only

Features:
  ✅ Fuzzy matching using Fuse.js (threshold 0.3)
  ✅ Google Places API fallback for unmatched restaurants
  ✅ Dynamic Fuse index updates (newly added restaurants immediately available)
  ✅ Tracks attempted linkings to avoid reprocessing (use --reattempt-all to override)
  ✅ Batch processing by restaurant name for optimal performance
  `);
  process.exit(0);
}

linkCommentsAndPostsToRestaurants()
  .then(() => {
    console.log('\nRestaurant linking completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Restaurant linking failed:', error);
    process.exit(1);
  });
