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
  return 1 / Math.max(1, mentions);
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
