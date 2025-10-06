import { PrismaClient } from '@prisma/client';
import { intersection } from 'lodash';

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

// Helper function to normalize text - remove all non-letter characters and lowercase
function normalizeText(text: string): string {
  return text.toLowerCase().replace(/[^a-z]/g, '');
}

// Helper function to extract words from normalized text
function extractWords(normalizedText: string): string[] {
  // Split by spaces from original text, then normalize each word
  const words: string[] = [];
  let currentWord = '';

  for (let i = 0; i < normalizedText.length; i++) {
    const char = normalizedText[i];
    if (char.match(/[a-z]/)) {
      currentWord += char;
    } else if (currentWord) {
      words.push(currentWord);
      currentWord = '';
    }
  }

  if (currentWord) {
    words.push(currentWord);
  }

  return words;
}

// Convert normalized restaurant name to word array
function getRestaurantWords(text: string): string[] {
  // First normalize to remove special chars, keeping spaces
  const normalized = text.toLowerCase().replace(/[^a-z\s]/g, '');
  // Split by whitespace and filter empty strings
  return normalized.split(/\s+/).filter(word => word.length > 0);
}

// Get essential words from restaurant name (remove common filler words)
function getEssentialRestaurantWords(restaurantName: string): string[] {
  const commonWords = new Set([
    'restaurant', 'cafe', 'bar', 'grill', 'kitchen', 'bistro', 'eatery',
    'diner', 'pizzeria', 'bakery', 'the', 'and', 'of', 'at', 'in'
  ]);

  const words = getRestaurantWords(restaurantName);
  // Filter out common filler words, but keep at least one word
  const essentialWords = words.filter(word => !commonWords.has(word));

  // If all words were filtered out, return original words
  return essentialWords.length > 0 ? essentialWords : words;
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
      exactMatches: 0,
      unmatchedMentions: 0,
      unmatchedNames: new Set(),
      commentsProcessed: 0,
      commentsLinked: 0,
    };

    // Get all restaurants and create a lookup map
    const restaurants = await prisma.restaurant.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    console.log(`Loaded ${restaurants.length} restaurants from database\n`);

    // Create lookup with restaurant words
    const validRestaurants = [];

    for (const restaurant of restaurants) {
      const essentialWords = getEssentialRestaurantWords(restaurant.name);
      // Skip restaurants with no valid words in their name
      if (essentialWords.length === 0) {
        continue;
      }
      validRestaurants.push({ ...restaurant, words: essentialWords });
    }

    console.log(`Using ${validRestaurants.length} restaurants with valid names for matching\n`);

    // Process posts - search for restaurant names in title and body
    const posts = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        body: true,
      },
    });

    console.log(`Found ${posts.length} posts to analyze\n`);

    for (const post of posts) {
      stats.postsProcessed++;

      const matchedRestaurantIds: number[] = [];
      const unmatchedForThisPost: string[] = [];

      // Combine title and body for searching
      const searchText = `${post.title || ''} ${post.body || ''}`;
      const searchWords = getRestaurantWords(searchText);

      if (searchWords.length === 0) {
        continue;
      }

      // Search for restaurant names using word intersection
      for (const restaurant of validRestaurants) {
        // Check if all restaurant words appear in the search text
        const commonWords = intersection(restaurant.words, searchWords);

        // Match only if all restaurant words are found
        if (commonWords.length === restaurant.words.length) {
          matchedRestaurantIds.push(restaurant.id);
          stats.exactMatches++;
        }
      }

      stats.totalMentions += matchedRestaurantIds.length;

      // Update post with all matched restaurants (many-to-many)
      if (matchedRestaurantIds.length > 0) {
        await prisma.post.update({
          where: { id: post.id },
          data: {
            restaurantsMentioned: {
              connect: matchedRestaurantIds.map((id) => ({ id })),
            },
          },
        });
        stats.postsLinked++;
      }

      // Progress update
      if (stats.postsProcessed % 100 === 0) {
        console.log(
          `Progress: ${stats.postsProcessed} posts processed, ${stats.postsLinked} linked`
        );
      }
    }

    // Process comments - search for restaurant names in body
    const comments = await prisma.comment.findMany({
      select: {
        id: true,
        body: true,
      },
    });

    console.log(`\nFound ${comments.length} comments to analyze\n`);

    for (const comment of comments) {
      stats.commentsProcessed++;

      const matchedRestaurantIds: number[] = [];

      // Get comment body text
      const searchText = comment.body || '';
      const searchWords = getRestaurantWords(searchText);

      if (searchWords.length === 0) {
        continue;
      }

      // Search for restaurant names using word intersection
      for (const restaurant of validRestaurants) {
        // Check if all restaurant words appear in the search text
        const commonWords = intersection(restaurant.words, searchWords);

        // Match only if all restaurant words are found
        if (commonWords.length === restaurant.words.length) {
          matchedRestaurantIds.push(restaurant.id);
        }
      }

      // Update comment with all matched restaurants (many-to-many)
      if (matchedRestaurantIds.length > 0) {
        await prisma.comment.update({
          where: { id: comment.id },
          data: {
            restaurantsMentioned: {
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
