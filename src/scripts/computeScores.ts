import dotenv from '@dotenvx/dotenvx';
dotenv.config();

import { PrismaClient } from '@prisma/client';
import { getRestaurantsWithSentiment, loadRestaurantItems } from '../scoring/dataLoader';
import { aggregateRestaurant, type RestaurantScore } from '../scoring/engine';

const prisma = new PrismaClient();

async function computeScores() {
  console.log('='.repeat(80));
  console.log('RESTAURANT SCORING ENGINE');
  console.log('='.repeat(80));
  console.log();

  // Check if specific restaurant IDs were provided as command-line arguments
  const args = process.argv.slice(2);
  let restaurantIds: number[];

  if (args.length > 0) {
    // Parse comma-separated restaurant IDs from command line
    restaurantIds = args[0].split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id));
    console.log(`Computing scores for ${restaurantIds.length} specific restaurants: ${restaurantIds.join(', ')}`);
    console.log();
  } else {
    // Get all restaurants with sentiment data
    console.log('Finding restaurants with sentiment data...');
    restaurantIds = await getRestaurantsWithSentiment();
    console.log(`✓ Found ${restaurantIds.length} restaurants with sentiment data`);
    console.log();
  }

  if (restaurantIds.length === 0) {
    console.log('No restaurants found. Make sure you have:');
    console.log('  1. Posts/comments with sentiment extractions');
    console.log('  2. Restaurants linked to posts/comments');
    return;
  }

  // Compute scores for each restaurant
  console.log('Computing and saving restaurant scores...');
  const scores: RestaurantScore[] = [];

  for (let i = 0; i < restaurantIds.length; i++) {
    const restaurantId = restaurantIds[i];

    if (i % 100 === 0) {
      console.log(`  Progress: ${i}/${restaurantIds.length}`);
    }

    const items = await loadRestaurantItems(restaurantId);
    const score = aggregateRestaurant(items, String(restaurantId));
    scores.push(score);

    // Save score to database
    await prisma.restaurant.update({
      where: { id: restaurantId },
      data: { rawScore: score.score }
    });
  }

  // Sort by score descending
  scores.sort((a, b) => b.score - a.score);

  console.log(`✓ Computed and saved scores for ${scores.length} restaurants`);
  console.log();

  // Display top 20 restaurants
  console.log('='.repeat(80));
  console.log('TOP 20 RESTAURANTS BY SCORE');
  console.log('='.repeat(80));
  console.log();

  const top20 = scores.slice(0, 20);

  for (let i = 0; i < top20.length; i++) {
    const restaurantScore = top20[i];

    // Fetch restaurant details
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: parseInt(restaurantScore.restaurantId) },
      select: {
        name: true,
        address: true,
        city: true
      }
    });

    if (!restaurant) continue;

    console.log(`${i + 1}. ${restaurant.name}`);
    console.log(`   Score: ${restaurantScore.score.toFixed(2)}`);
    console.log(`   Location: ${restaurant.address ?? 'N/A'}${restaurant.city ? `, ${restaurant.city}` : ''}`);
    console.log(`   Items: ${restaurantScore.itemCount} | Threads: ${restaurantScore.threadCount} | Weight: ${restaurantScore.totalWeight.toFixed(2)}`);
    console.log();
  }

  // Display bottom 20 restaurants (most negative)
  console.log('='.repeat(80));
  console.log('BOTTOM 20 RESTAURANTS BY SCORE');
  console.log('='.repeat(80));
  console.log();

  const bottom20 = scores.slice(-20).reverse();

  for (let i = 0; i < bottom20.length; i++) {
    const restaurantScore = bottom20[i];

    // Fetch restaurant details
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: parseInt(restaurantScore.restaurantId) },
      select: {
        name: true,
        address: true,
        city: true
      }
    });

    if (!restaurant) continue;

    console.log(`${i + 1}. ${restaurant.name}`);
    console.log(`   Score: ${restaurantScore.score.toFixed(2)}`);
    console.log(`   Location: ${restaurant.address ?? 'N/A'}${restaurant.city ? `, ${restaurant.city}` : ''}`);
    console.log(`   Items: ${restaurantScore.itemCount} | Threads: ${restaurantScore.threadCount} | Weight: ${restaurantScore.totalWeight.toFixed(2)}`);
    console.log();
  }

  // Statistics
  console.log('='.repeat(80));
  console.log('SCORE STATISTICS');
  console.log('='.repeat(80));
  console.log();

  const allScores = scores.map(s => s.score);
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
  console.log();
}

computeScores()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Error:', error);
    process.exit(1);
  });
