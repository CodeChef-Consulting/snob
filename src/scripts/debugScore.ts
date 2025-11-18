import dotenv from '@dotenvx/dotenvx';
dotenv.config();

import { PrismaClient } from '@prisma/client';
import { loadRestaurantItems } from '../scoring/dataLoader';
import { aggregateRestaurant, itemWeight, threadNormalization } from '../scoring/engine';

const prisma = new PrismaClient();

async function debug() {
  // Pick a restaurant with many items - In N Out Burger
  const restaurant = await prisma.restaurant.findFirst({
    where: { name: { contains: 'In N Out Burger' } }
  });

  if (!restaurant) {
    console.log('Restaurant not found');
    return;
  }

  console.log(`Debugging: ${restaurant.name} (ID ${restaurant.id})`);
  console.log();

  const items = await loadRestaurantItems(restaurant.id);
  console.log(`Items loaded: ${items.length}`);
  console.log();

  // Check weights for first few items
  console.log('Sample items:');
  for (let i = 0; i < Math.min(5, items.length); i++) {
    const item = items[i];
    const w = itemWeight(item);
    console.log(`  Item ${i}:`);
    console.log(`    rawAiScore: ${item.rawAiScore}`);
    console.log(`    upvotes: ${item.upvotes}`);
    console.log(`    ageDays: ${item.ageDays.toFixed(2)}`);
    console.log(`    depth: ${item.depth}`);
    console.log(`    mentions: ${item.mentions}`);
    console.log(`    weight: ${w}`);
    console.log();
  }

  // Check normalization for first thread
  const firstThread = items[0]?.postId;
  if (firstThread) {
    console.log(`Checking thread normalization for: ${firstThread}`);
    const norm = threadNormalization(items, firstThread);
    console.log(`  Normalization factor: ${norm}`);
    console.log();
  }

  // Aggregate manually to debug
  console.log('Computing restaurant score manually...');
  const restaurantItems = items;
  const threadMap = new Map<string, typeof items>();
  for (const item of restaurantItems) {
    const threadItems = threadMap.get(item.postId) ?? [];
    threadItems.push(item);
    threadMap.set(item.postId, threadItems);
  }

  let totalScore = 0;
  let totalWeight = 0;
  let threadNum = 0;

  for (const [postId, threadItems] of threadMap) {
    const normFactor = threadNormalization(restaurantItems, postId);

    let threadWeight = 0;
    const threadScore = threadItems.reduce((sum, item) => {
      const w = itemWeight(item);
      threadWeight += w;
      return sum + item.rawAiScore * w;
    }, 0);

    totalWeight += threadWeight;
    totalScore += normFactor * threadScore;

    // Find the thread that causes NaN
    if (isNaN(totalWeight) || isNaN(totalScore) || isNaN(normFactor)) {
      console.log(`  ⚠️  NaN detected at Thread ${threadNum} (${postId}):`);
      console.log(`    items: ${threadItems.length}`);
      console.log(`    normFactor: ${normFactor}`);
      console.log(`    threadWeight: ${threadWeight}`);
      console.log(`    threadScore: ${threadScore}`);
      console.log(`    totalWeight: ${totalWeight}`);
      console.log(`    totalScore: ${totalScore}`);
      console.log(`    Sample items from this thread:`);
      for (let i = 0; i < Math.min(3, threadItems.length); i++) {
        const item = threadItems[i];
        console.log(`      Item ${i}: score=${item.rawAiScore}, upvotes=${item.upvotes}, age=${item.ageDays}, depth=${item.depth}, mentions=${item.mentions}`);
      }
      console.log();
      break;
    }

    threadNum++;
  }

  console.log(`Final totalWeight: ${totalWeight}`);
  console.log(`Final totalScore: ${totalScore}`);
  console.log();

  const score = aggregateRestaurant(items, String(restaurant.id));
  console.log('Result from function:', JSON.stringify(score, null, 2));
}

debug()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Error:', error);
    process.exit(1);
  });
