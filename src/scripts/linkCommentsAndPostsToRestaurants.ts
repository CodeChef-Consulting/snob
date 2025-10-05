import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface LinkingStats {
  postsProcessed: number;
  postsLinked: number;
  postsWithUnmatched: number;
  totalMentions: number;
  exactMatches: number;
  unmatchedMentions: number;
  unmatchedNames: Set<string>;
  commentsProcessed: number;
  commentsLinked: number;
}

async function linkCommentsAndPostsToRestaurants() {
  try {
    console.log('Starting restaurant linking process...\n');

    const stats: LinkingStats = {
      postsProcessed: 0,
      postsLinked: 0,
      postsWithUnmatched: 0,
      totalMentions: 0,
      exactMatches: 0,
      unmatchedMentions: 0,
      unmatchedNames: new Set(),
      commentsProcessed: 0,
      commentsLinked: 0,
    };

    // Get all restaurants and create a lookup map (case-insensitive)
    const restaurants = await prisma.restaurant.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    console.log(`Loaded ${restaurants.length} restaurants from database\n`);

    // Create lookup maps for exact matching
    const restaurantByName = new Map<string, number>();
    const restaurantByLowerName = new Map<string, number>();

    for (const restaurant of restaurants) {
      restaurantByName.set(restaurant.name, restaurant.id);
      restaurantByLowerName.set(
        restaurant.name.toLowerCase().trim(),
        restaurant.id
      );
    }

    // Process posts with restaurantsMentioned
    const posts = await prisma.post.findMany({
      select: {
        id: true,
        restaurantsMentioned: true,
      },
    });

    console.log(`Found ${posts.length} posts with restaurant mentions\n`);

    for (const post of posts) {
      // Skip posts with no mentions
      if (!post.restaurantsMentioned || post.restaurantsMentioned.length === 0) {
        continue;
      }

      stats.postsProcessed++;
      stats.totalMentions += post.restaurantsMentioned.length;

      const matchedRestaurantIds: number[] = [];
      const unmatchedForThisPost: string[] = [];

      // restaurantsMentioned now contains restaurant IDs
      for (const restaurantId of post.restaurantsMentioned) {
        if (restaurantId) {
          matchedRestaurantIds.push(restaurantId);
          stats.exactMatches++;
        }
      }

      // Update post with all matched restaurants (many-to-many)
      if (matchedRestaurantIds.length > 0) {
        await prisma.post.update({
          where: { id: post.id },
          data: {
            restaurants: {
              connect: matchedRestaurantIds.map((id) => ({ id })),
            },
          },
        });
        stats.postsLinked++;
      }

      // Track posts with unmatched mentions
      if (unmatchedForThisPost.length > 0) {
        stats.postsWithUnmatched++;
      }

      // Progress update
      if (stats.postsProcessed % 100 === 0) {
        console.log(
          `Progress: ${stats.postsProcessed} posts processed, ${stats.postsLinked} linked`
        );
      }
    }

    // Process comments with restaurantsMentioned
    const comments = await prisma.comment.findMany({
      select: {
        id: true,
        restaurantsMentioned: true,
      },
    });

    console.log(
      `\nFound ${comments.length} comments with restaurant mentions\n`
    );

    for (const comment of comments) {
      // Skip comments with no mentions
      if (!comment.restaurantsMentioned || comment.restaurantsMentioned.length === 0) {
        continue;
      }

      stats.commentsProcessed++;

      const matchedRestaurantIds: number[] = [];

      // restaurantsMentioned now contains restaurant IDs
      for (const restaurantId of comment.restaurantsMentioned) {
        if (restaurantId) {
          matchedRestaurantIds.push(restaurantId);
        }
      }

      // Update comment with all matched restaurants (many-to-many)
      if (matchedRestaurantIds.length > 0) {
        await prisma.comment.update({
          where: { id: comment.id },
          data: {
            restaurants: {
              connect: matchedRestaurantIds.map((id) => ({ id })),
            },
          },
        });
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
    console.log(`  With unmatched mentions: ${stats.postsWithUnmatched}`);
    console.log(`\nComments:`);
    console.log(`  Processed: ${stats.commentsProcessed}`);
    console.log(`  Linked to restaurants: ${stats.commentsLinked}`);
    console.log(`\nMentions statistics:`);
    console.log(`  Total mentions: ${stats.totalMentions}`);
    console.log(`  Exact matches: ${stats.exactMatches}`);
    console.log(`  Unmatched mentions: ${stats.unmatchedMentions}`);
    console.log(`  Unique unmatched names: ${stats.unmatchedNames.size}`);

    // Print sample of unmatched names
    if (stats.unmatchedNames.size > 0) {
      console.log('\n=== Sample Unmatched Restaurant Names (first 20) ===');
      const unmatchedArray = Array.from(stats.unmatchedNames).slice(0, 20);
      unmatchedArray.forEach((name, index) => {
        console.log(`${index + 1}. "${name}"`);
      });

      if (stats.unmatchedNames.size > 20) {
        console.log(`... and ${stats.unmatchedNames.size - 20} more`);
      }

      console.log(
        '\nNote: Unmatched restaurants will need AI analysis for fuzzy matching.'
      );
    }
  } catch (error) {
    console.error('Error linking restaurants:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
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
