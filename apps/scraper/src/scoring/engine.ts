// ===============================================
// Restaurant Scoring Engine (Raw Mathematical Score)
// ===============================================

// ------------ Types ----------------------------

export interface RedditItem {
  restaurantId: string;
  rawAiScore: number; // -1 to 1
  upvotes: number;
  ageDays: number;
  depth: number; // 0 for post, 1+ for comments
  mentions: number; // number of restaurants mentioned
  postId: string; // thread ID
}

export interface RestaurantScore {
  restaurantId: string;
  score: number; // final raw score (unbounded, typically -20 to +20)
  itemCount: number; // number of items contributing
  totalWeight: number; // sum of all weights
  threadCount: number; // number of unique threads
}

export interface NormalizedScore {
  restaurantId: string;
  rawScore: number;
  normalizedScore: number; // 0-10 scale, centered around 7
  zScore: number; // standard deviations from median
}

// ------------ Weight Functions ----------------

// Half-life = 90 days
const HALF_LIFE_DAYS = 90;

export const recencyWeight = (ageDays: number): number => {
  return Math.pow(2, -ageDays / HALF_LIFE_DAYS);
};

export const upvoteWeight = (upvotes: number): number => {
  return Math.log(1 + upvotes);
};

export const depthWeight = (depth: number): number => {
  return 1 / (1 + depth);
};

export const mentionsWeight = (mentions: number): number => {
  // Single mention gets weight of 1.0
  // 2 mentions: 0.2 (5x penalty)
  // 3 mentions: 0.125 (8x penalty)
  // Formula: 1 / mentions^2 for mentions >= 2
  if (mentions === 1) {
    return 1.0;
  }
  return 1 / Math.pow(mentions, 1.5);
};

export const itemWeight = (item: RedditItem): number => {
  return (
    recencyWeight(item.ageDays) *
    upvoteWeight(item.upvotes) *
    depthWeight(item.depth) *
    mentionsWeight(item.mentions)
  );
};

// ------------ Thread Clustering Protection -----

const THREAD_CAP = 5;

/**
 * Compute normalization factor for a thread to prevent any single thread
 * from dominating the restaurant's score
 */
export const threadNormalization = (
  items: RedditItem[],
  postId: string
): number => {
  const threadItems = items.filter((item) => item.postId === postId);

  const rawThreadWeight = threadItems.reduce((sum, item) => {
    const w = itemWeight(item);
    const contribution = Math.abs(item.rawAiScore) * w;
    return sum + contribution;
  }, 0);

  // Cap the thread's contribution
  // If rawThreadWeight is 0 or NaN, no normalization needed (return 1)
  if (!rawThreadWeight || rawThreadWeight === 0 || !isFinite(rawThreadWeight)) {
    return 1;
  }

  return Math.min(1, THREAD_CAP / rawThreadWeight);
};

// ------------ Core Aggregation ------------------

export const aggregateRestaurant = (
  items: RedditItem[],
  restaurantId: string
): RestaurantScore => {
  const restaurantItems = items.filter(
    (item) => item.restaurantId === restaurantId
  );

  if (restaurantItems.length === 0) {
    return {
      restaurantId,
      score: 0,
      itemCount: 0,
      totalWeight: 0,
      threadCount: 0,
    };
  }

  // Group items by thread (postId)
  const threadMap = new Map<string, RedditItem[]>();
  for (const item of restaurantItems) {
    const threadItems = threadMap.get(item.postId) ?? [];
    threadItems.push(item);
    threadMap.set(item.postId, threadItems);
  }

  let totalScore = 0;
  let totalWeight = 0;

  // Process each thread
  for (const [postId, threadItems] of threadMap) {
    const normFactor = threadNormalization(restaurantItems, postId);

    // Sum weighted contributions for this thread
    let threadWeight = 0;
    const threadScore = threadItems.reduce((sum, item) => {
      const w = itemWeight(item);
      if (isFinite(w)) {
        threadWeight += w;
        return sum + item.rawAiScore * w;
      }
      return sum;
    }, 0);

    // Only add if values are finite
    if (isFinite(threadWeight)) {
      totalWeight += threadWeight;
    }

    // Apply normalization and add to total
    const contribution = normFactor * threadScore;
    if (isFinite(contribution)) {
      totalScore += contribution;
    }
  }

  return {
    restaurantId,
    score: totalScore,
    itemCount: restaurantItems.length,
    totalWeight,
    threadCount: threadMap.size,
  };
};

// ------------ Aggregate All Restaurants ----------

export const aggregateAllRestaurants = (
  items: RedditItem[]
): RestaurantScore[] => {
  const restaurantIds = Array.from(
    new Set(items.map((item) => item.restaurantId))
  );

  return restaurantIds
    .map((id) => aggregateRestaurant(items, id))
    .sort((a, b) => b.score - a.score); // Sort by score descending
};

// ------------ Score Normalization ------------------

/**
 * Normalize scores using percentile-based power-law distribution
 * Creates a steep distribution where:
 * - 1–4: 60% (most restaurants are mediocre/bad)
 * - 5–6: 30% (decent restaurants)
 * - 7: 7% (good restaurants)
 * - 8: 2% (excellent restaurants)
 * - 9–10: <1% (exceptional restaurants)
 *
 * Uses percentile ranks with aggressive power-law transformation
 */
export const normalizeScores = (
  scores: RestaurantScore[]
): NormalizedScore[] => {
  if (scores.length === 0) {
    return [];
  }

  const rawScores = scores.map((s) => s.score);

  // Calculate median for z-score reference
  const sortedScores = [...rawScores].sort((a, b) => a - b);
  const median = sortedScores[Math.floor(sortedScores.length / 2)];

  // Calculate MAD for z-score
  const absoluteDeviations = rawScores.map((s) => Math.abs(s - median!));
  const sortedDeviations = [...absoluteDeviations].sort((a, b) => a - b);
  const mad = sortedDeviations[Math.floor(sortedDeviations.length / 2)];
  const robustStdDev = mad! * 1.4826;

  return scores.map((score, idx) => {
    // Calculate z-score for reference
    const zScore =
      robustStdDev === 0 ? 0 : (score.score - median!) / robustStdDev;

    // Find percentile rank (0-1)
    const rank = sortedScores.filter((s) => s < score.score).length;
    const percentile = rank / (sortedScores.length - 1);

    // Aggressive power-law mapping for steep distribution
    let normalizedScore: number;

    if (percentile < 0.6) {
      // Bottom 60%: Map to 1-4 (linear)
      normalizedScore = 1 + (percentile / 0.6) * 3;
    } else if (percentile < 0.9) {
      // Next 30%: Map to 5-6 (linear)
      normalizedScore = 5 + ((percentile - 0.6) / 0.3) * 1;
    } else if (percentile < 0.97) {
      // Next 7%: Map to 7 (linear around 7)
      normalizedScore = 7 + ((percentile - 0.9) / 0.07) * 0.5;
    } else if (percentile < 0.99) {
      // Next 2%: Map to 8 (linear around 8)
      normalizedScore = 8 + ((percentile - 0.97) / 0.02) * 0.5;
    } else {
      // Top 1%: Map to 9-10 (exponential curve)
      const topPercentile = (percentile - 0.99) / 0.01; // 0 to 1
      normalizedScore = 9 + Math.pow(topPercentile, 1.5);
    }

    // Clamp to [0, 10] range
    normalizedScore = Math.max(0, Math.min(10, normalizedScore));

    return {
      restaurantId: score.restaurantId,
      rawScore: score.score,
      normalizedScore,
      zScore,
    };
  });
};
