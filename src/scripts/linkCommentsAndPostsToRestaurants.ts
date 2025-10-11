import dotenv from '@dotenvx/dotenvx';
import { PrismaClient } from '@prisma/client';
import Fuse, { FuseResult } from 'fuse.js';
import { lookupAndAddRestaurant } from '../utils/googlePlaces';
dotenv.config();

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

async function linkCommentsAndPostsToRestaurants() {
  try {
    // Check for --clear flag
    const shouldClear = process.argv.includes('--clear');

    if (shouldClear) {
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

    // Process posts using RestaurantExtraction data
    const postExtractions = await prisma.restaurantExtraction.findMany({
      where: {
        postId: { not: null },
        ...(!reattemptAll && { attemptedLinkToRestaurantsMentioned: false }),
      },
      select: {
        postId: true,
        restaurantsMentioned: true,
        primaryRestaurant: true,
      },
    });

    console.log(
      `Found ${postExtractions.length} post extractions to process\n`
    );

    for (const extraction of postExtractions) {
      if (!extraction.postId) continue;

      stats.postsProcessed++;

      // Parse comma-separated restaurant names
      const extractedNames = extraction.restaurantsMentioned
        .split(',')
        .map((name) => name.trim())
        .filter((name) => name && name !== 'NONE');

      if (extractedNames.length === 0) {
        continue;
      }

      const matchedRestaurantIds = new Set<number>();
      let hadGooglePlacesError = false;

      // Fuzzy match each extracted restaurant name
      for (const extractedName of extractedNames) {
        const matchResult = findRestaurantMatch(extractedName, fuse);

        if (matchResult) {
          matchedRestaurantIds.add(matchResult.item.id);
          stats.fuzzyMatches++;
          console.log(
            `✅ Post ${extraction.postId}: "${extractedName}" → "${matchResult.item.name}" (score: ${matchResult.score!.toFixed(3)})`
          );
        } else {
          // Try Google Places API as fallback (for posts, always try)
          console.log(
            `🔍 Post ${extraction.postId}: "${extractedName}" → no fuzzy match, trying Google Places...`
          );
          const result = await lookupAndAddRestaurant(
            extractedName,
            prisma,
            stats,
            fuse,
            restaurants,
            addressFuse
          );

          if (result.hadError) {
            hadGooglePlacesError = true;
            console.log(
              `⚠️  Post ${extraction.postId}: "${extractedName}" → Google Places error`
            );
          } else if (result.restaurantId) {
            matchedRestaurantIds.add(result.restaurantId);
            stats.fuzzyMatches++;
          } else {
            stats.unmatchedMentions++;
            stats.unmatchedNames.add(extractedName);
            console.log(
              `❌ Post ${extraction.postId}: "${extractedName}" → not found anywhere`
            );
          }
        }
      }

      stats.totalMentions += extractedNames.length;

      // Update post with matched restaurants (replace existing links)
      await prisma.post.update({
        where: { id: extraction.postId },
        data: {
          restaurantsMentioned: {
            set: Array.from(matchedRestaurantIds).map((id) => ({ id })),
          },
        },
      });

      // Mark extraction as attempted only if no Google Places errors
      if (!hadGooglePlacesError) {
        await prisma.restaurantExtraction.update({
          where: { postId: extraction.postId },
          data: {
            attemptedLinkToRestaurantsMentioned: true,
          },
        });
      } else {
        console.log(
          `   ⏸️  Post ${extraction.postId}: Not marking as attempted due to Google Places error`
        );
      }

      if (matchedRestaurantIds.size > 0) {
        stats.postsLinked++;
        if (matchedRestaurantIds.size > 0) {
          stats.postsWithUnmatched++;
        }
      }

      // Progress update
      if (stats.postsProcessed % 100 === 0) {
        console.log(
          `Progress: ${stats.postsProcessed} posts processed, ${stats.postsLinked} linked`
        );
      }
    }

    // Process comments using RestaurantExtraction data
    const commentExtractions = await prisma.restaurantExtraction.findMany({
      where: {
        commentId: { not: null },
        ...(!reattemptAll && { attemptedLinkToRestaurantsMentioned: false }),
      },
      select: {
        commentId: true,
        restaurantsMentioned: true,
        primaryRestaurant: true,
        isSubjective: true,
      },
    });

    console.log(
      `\nFound ${commentExtractions.length} comment extractions to process\n`
    );

    for (const extraction of commentExtractions) {
      if (!extraction.commentId) continue;

      stats.commentsProcessed++;

      // Parse comma-separated restaurant names
      const extractedNames = extraction.restaurantsMentioned
        .split(',')
        .map((name) => name.trim())
        .filter((name) => name && name !== 'NONE');

      if (extractedNames.length === 0) {
        continue;
      }

      const matchedRestaurantIds = new Set<number>();
      let hadGooglePlacesError = false;

      // Check if there's a primary restaurant
      const hasPrimaryRestaurant =
        extraction.primaryRestaurant && extraction.primaryRestaurant !== 'NONE';

      // If there's a primary restaurant, only link that one
      const namesToProcess = hasPrimaryRestaurant
        ? [extraction.primaryRestaurant!]
        : extractedNames;

      if (hasPrimaryRestaurant) {
        console.log(
          `   🎯 Comment ${extraction.commentId}: Using primary restaurant only: "${extraction.primaryRestaurant}"`
        );
      }

      // Fuzzy match each extracted restaurant name
      for (const extractedName of namesToProcess) {
        const matchResult = findRestaurantMatch(extractedName, fuse);

        if (matchResult) {
          matchedRestaurantIds.add(matchResult.item.id);
          stats.fuzzyMatches++;
          console.log(
            `✅ Comment ${extraction.commentId}: "${extractedName}" → "${matchResult.item.name}" (score: ${matchResult.score!.toFixed(3)})`
          );
        } else if (extraction.isSubjective) {
          // Try Google Places API as fallback (only for subjective comments)
          console.log(
            `🔍 Comment ${extraction.commentId}: "${extractedName}" → no fuzzy match, trying Google Places (subjective)...`
          );
          const result = await lookupAndAddRestaurant(
            extractedName,
            prisma,
            stats,
            fuse,
            restaurants,
            addressFuse
          );

          if (result.hadError) {
            hadGooglePlacesError = true;
            console.log(
              `⚠️  Comment ${extraction.commentId}: "${extractedName}" → Google Places error`
            );
          } else if (result.restaurantId) {
            matchedRestaurantIds.add(result.restaurantId);
            stats.fuzzyMatches++;
          } else {
            stats.unmatchedMentions++;
            stats.unmatchedNames.add(extractedName);
            console.log(
              `❌ Comment ${extraction.commentId}: "${extractedName}" → not found anywhere`
            );
          }
        } else {
          // Non-subjective comment - skip Google Places lookup
          stats.unmatchedMentions++;
          stats.unmatchedNames.add(extractedName);
          console.log(
            `⏭️  Comment ${extraction.commentId}: "${extractedName}" → no match`
          );
        }
      }

      // Update comment with matched restaurants (replace existing links)
      await prisma.comment.update({
        where: { id: extraction.commentId },
        data: {
          restaurantsMentioned: {
            set: Array.from(matchedRestaurantIds).map((id) => ({ id })),
          },
        },
      });

      // Mark extraction as attempted only if no Google Places errors
      if (!hadGooglePlacesError) {
        await prisma.restaurantExtraction.update({
          where: { commentId: extraction.commentId },
          data: {
            attemptedLinkToRestaurantsMentioned: true,
          },
        });
      } else {
        console.log(
          `   ⏸️  Comment ${extraction.commentId}: Not marking as attempted due to Google Places error`
        );
      }

      if (matchedRestaurantIds.size > 0) {
        stats.commentsLinked++;
      }

      // Progress update
      if (stats.commentsProcessed % 100 === 0) {
        console.log(
          `Progress: ${stats.commentsProcessed} comments processed, ${stats.commentsLinked} linked`
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
  -h, --help        Show this help message

Examples:
  # Process only new extractions (default behavior)
  tsx src/scripts/linkCommentsAndPostsToRestaurants.ts

  # Clear all connections and start fresh
  tsx src/scripts/linkCommentsAndPostsToRestaurants.ts --clear

  # Reprocess everything including previously attempted
  tsx src/scripts/linkCommentsAndPostsToRestaurants.ts --reattempt-all

Features:
  ✅ Fuzzy matching using Fuse.js (threshold 0.3)
  ✅ Google Places API fallback for unmatched restaurants
  ✅ Dynamic Fuse index updates (newly added restaurants immediately available)
  ✅ Tracks attempted linkings to avoid reprocessing (use --reattempt-all to override)
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
