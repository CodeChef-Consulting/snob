import dotenv from '@dotenvx/dotenvx';
dotenv.config();

import { loadRestaurantItems } from '../scoring/dataLoader';
import { aggregateRestaurant, recencyWeight, upvoteWeight, depthWeight, mentionsWeight, itemWeight } from '../scoring/engine';

async function analyzeInNOut() {
  const restaurantId = 16668; // In-N-Out Sunset Blvd

  console.log('='.repeat(80));
  console.log('IN-N-OUT BURGER SCORING ANALYSIS');
  console.log('Location: 7009 Sunset Boulevard, Los Angeles');
  console.log('='.repeat(80));
  console.log();

  const items = await loadRestaurantItems(restaurantId);
  console.log(`Total items: ${items.length}`);
  console.log();

  // Group by thread
  const threadMap = new Map<string, typeof items>();
  for (const item of items) {
    const threadItems = threadMap.get(item.postId) ?? [];
    threadItems.push(item);
    threadMap.set(item.postId, threadItems);
  }

  console.log(`Total threads: ${threadMap.size}`);
  console.log();

  // Analyze top threads by item count
  const threadStats = Array.from(threadMap.entries())
    .map(([postId, items]) => {
      const avgSentiment = items.reduce((sum, i) => sum + i.rawAiScore, 0) / items.length;
      const totalWeight = items.reduce((sum, i) => sum + itemWeight(i), 0);
      const weightedScore = items.reduce((sum, i) => sum + i.rawAiScore * itemWeight(i), 0);

      return {
        postId,
        itemCount: items.length,
        avgSentiment,
        totalWeight,
        weightedScore,
        avgAge: items.reduce((sum, i) => sum + i.ageDays, 0) / items.length,
        avgUpvotes: items.reduce((sum, i) => sum + i.upvotes, 0) / items.length
      };
    })
    .sort((a, b) => b.itemCount - a.itemCount);

  console.log('TOP 10 THREADS BY COMMENT COUNT:');
  console.log('='.repeat(80));

  for (let i = 0; i < Math.min(10, threadStats.length); i++) {
    const thread = threadStats[i];
    console.log(`${i + 1}. Thread ${thread.postId}`);
    console.log(`   Comments: ${thread.itemCount}`);
    console.log(`   Avg Sentiment: ${thread.avgSentiment.toFixed(3)}`);
    console.log(`   Avg Age (days): ${thread.avgAge.toFixed(1)}`);
    console.log(`   Avg Upvotes: ${thread.avgUpvotes.toFixed(1)}`);
    console.log(`   Total Weight: ${thread.totalWeight.toFixed(2)}`);
    console.log(`   Weighted Score: ${thread.weightedScore.toFixed(2)}`);
    console.log();
  }

  // Compute final score
  const score = aggregateRestaurant(items, String(restaurantId));

  console.log('='.repeat(80));
  console.log('FINAL SCORE BREAKDOWN:');
  console.log('='.repeat(80));
  console.log(`Total Score: ${score.score.toFixed(2)}`);
  console.log(`Total Weight: ${score.totalWeight.toFixed(2)}`);
  console.log(`Thread Count: ${score.threadCount}`);
  console.log(`Item Count: ${score.itemCount}`);
  console.log();

  // Sentiment distribution
  const positive = items.filter(i => i.rawAiScore > 0).length;
  const negative = items.filter(i => i.rawAiScore < 0).length;
  const neutral = items.filter(i => i.rawAiScore === 0).length;

  console.log('SENTIMENT DISTRIBUTION:');
  console.log(`Positive: ${positive} (${(positive/items.length*100).toFixed(1)}%)`);
  console.log(`Negative: ${negative} (${(negative/items.length*100).toFixed(1)}%)`);
  console.log(`Neutral: ${neutral} (${(neutral/items.length*100).toFixed(1)}%)`);
  console.log();

  // Explain why score is negative despite more positive comments
  console.log('='.repeat(80));
  console.log('WHY IS THE SCORE NEGATIVE?');
  console.log('='.repeat(80));
  console.log();
  console.log('The two largest threads are CONTROVERSY threads (not food reviews):');
  console.log('- Thread 1m44tq9: 768 comments about owner hating California');
  console.log('- Thread 1m443ki: 471 comments about heiress on conservative podcast');
  console.log();
  console.log('These threads have:');
  console.log('1. RECENT timing (~121 days old) = HIGH recency weight');
  console.log('2. HIGH upvotes (avg 5-14, max 900+) = HIGH upvote weight');
  console.log('3. NEGATIVE average sentiment (-0.236 and -0.366)');
  console.log();
  console.log('Result: The controversy threads DOMINATE the score because:');
  console.log('- Recency weight at 121 days: ~' + recencyWeight(121).toFixed(4));
  console.log('- Upvote weight for 900 ups: ~' + upvoteWeight(900).toFixed(2));
  console.log('- Combined: These threads get 10-100x more weight than old posts');
  console.log();
  console.log('Even though there are more positive comments overall, the negative');
  console.log('comments in these high-profile controversy threads carry much more weight!');
}

analyzeInNOut()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Error:', error);
    process.exit(1);
  });
