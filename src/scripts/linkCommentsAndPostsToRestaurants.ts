import { PrismaClient } from '@prisma/client';
import Fuse from 'fuse.js';
import { lookupAndAddRestaurant } from '../utils/googlePlaces';

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

    // Get all restaurants and create Fuse.js index
    const restaurants = await prisma.restaurant.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    console.log(`Loaded ${restaurants.length} restaurants from database\n`);

    // Create Fuse.js instance for fuzzy matching
    const fuse = new Fuse(restaurants, {
      keys: ['name'],
      threshold: 0.3, // Lower = more strict (0.0 = exact, 1.0 = match anything)
      ignoreLocation: true,
      includeScore: true,
    });

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

      // Fuzzy match each extracted restaurant name
      for (const extractedName of extractedNames) {
        const results = fuse.search(extractedName);

        if (
          results.length > 0 &&
          results[0].score !== undefined &&
          results[0].score < 0.3
        ) {
          matchedRestaurantIds.add(results[0].item.id);
          stats.fuzzyMatches++;
          console.log(
            `✅ Post ${extraction.postId}: "${extractedName}" → "${results[0].item.name}" (score: ${results[0].score.toFixed(3)})`
          );
        } else {
          // Try Google Places API as fallback (for posts, always try)
          console.log(
            `🔍 Post ${extraction.postId}: "${extractedName}" → no fuzzy match, trying Google Places...`
          );
          const restaurantId = await lookupAndAddRestaurant(
            extractedName,
            prisma,
            stats,
            fuse,
            restaurants
          );

          if (restaurantId) {
            matchedRestaurantIds.add(restaurantId);
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

      // Mark extraction as attempted
      await prisma.restaurantExtraction.update({
        where: { postId: extraction.postId },
        data: {
          attemptedLinkToRestaurantsMentioned: true,
        },
      });

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
        const results = fuse.search(extractedName);

        if (
          results.length > 0 &&
          results[0].score !== undefined &&
          results[0].score < 0.3
        ) {
          matchedRestaurantIds.add(results[0].item.id);
          stats.fuzzyMatches++;
          console.log(
            `✅ Comment ${extraction.commentId}: "${extractedName}" → "${results[0].item.name}" (score: ${results[0].score.toFixed(3)})`
          );
        } else if (extraction.isSubjective) {
          // Try Google Places API as fallback (only for subjective comments)
          console.log(
            `🔍 Comment ${extraction.commentId}: "${extractedName}" → no fuzzy match, trying Google Places (subjective)...`
          );
          const restaurantId = await lookupAndAddRestaurant(
            extractedName,
            prisma,
            stats,
            fuse,
            restaurants
          );

          if (restaurantId) {
            matchedRestaurantIds.add(restaurantId);
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
            `⏭️  Comment ${extraction.commentId}: "${extractedName}" → no match (non-subjective, skipping Google Places)`
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

      // Mark extraction as attempted
      await prisma.restaurantExtraction.update({
        where: { commentId: extraction.commentId },
        data: {
          attemptedLinkToRestaurantsMentioned: true,
        },
      });

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
