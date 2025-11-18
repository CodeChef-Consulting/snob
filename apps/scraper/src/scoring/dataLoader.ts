import { PrismaClient } from '@repo/db';
import type { RedditItem } from './engine';

const prisma = new PrismaClient();

/**
 * Loads all Reddit items for a specific restaurant
 */
export const loadRestaurantItems = async (restaurantId: number): Promise<RedditItem[]> => {
  const items: RedditItem[] = [];
  const now = Date.now();

  // Load posts for this restaurant
  const posts = await prisma.post.findMany({
    where: {
      restaurantsMentioned: {
        some: {
          id: restaurantId
        }
      },
      sentimentExtraction: {
        rawAiScore: { not: null }
      },
      author: {
        notIn: ['[deleted]', 'AutoModerator'],
        not: null
      }
    },
    select: {
      externalId: true,
      createdUtc: true,
      ups: true,
      sentimentExtraction: {
        select: {
          rawAiScore: true
        }
      },
      restaurantsMentioned: {
        select: {
          id: true
        }
      }
    }
  });

  for (const post of posts) {
    if (!post.sentimentExtraction?.rawAiScore || !post.createdUtc) continue;

    const ageDays = (now - post.createdUtc.getTime()) / (1000 * 60 * 60 * 24);
    const upvotes = post.ups ?? 0;
    const mentions = post.restaurantsMentioned.length;

    items.push({
      restaurantId: String(restaurantId),
      rawAiScore: post.sentimentExtraction.rawAiScore,
      upvotes,
      ageDays,
      depth: 0,
      mentions,
      postId: post.externalId
    });
  }

  // Load comments for this restaurant
  const comments = await prisma.comment.findMany({
    where: {
      restaurantsMentioned: {
        some: {
          id: restaurantId
        }
      },
      sentimentExtraction: {
        rawAiScore: { not: null }
      },
      author: {
        notIn: ['[deleted]', 'AutoModerator'],
        not: null
      }
    },
    select: {
      createdUtc: true,
      ups: true,
      depth: true,
      post: {
        select: {
          externalId: true
        }
      },
      sentimentExtraction: {
        select: {
          rawAiScore: true
        }
      },
      restaurantsMentioned: {
        select: {
          id: true
        }
      }
    }
  });

  for (const comment of comments) {
    if (!comment.sentimentExtraction?.rawAiScore || !comment.createdUtc) continue;

    const ageDays = (now - comment.createdUtc.getTime()) / (1000 * 60 * 60 * 24);
    const upvotes = comment.ups ?? 0;
    const depth = comment.depth ?? 1;
    const mentions = comment.restaurantsMentioned.length;

    items.push({
      restaurantId: String(restaurantId),
      rawAiScore: comment.sentimentExtraction.rawAiScore,
      upvotes,
      ageDays,
      depth,
      mentions,
      postId: comment.post.externalId
    });
  }

  return items;
};

/**
 * Gets all restaurant IDs that have sentiment data
 */
export const getRestaurantsWithSentiment = async (): Promise<number[]> => {
  // Get restaurants mentioned in posts with sentiment
  const postsRestaurants = await prisma.restaurant.findMany({
    where: {
      posts: {
        some: {
          sentimentExtraction: {
            rawAiScore: { not: null }
          }
        }
      }
    },
    select: {
      id: true
    }
  });

  // Get restaurants mentioned in comments with sentiment
  const commentsRestaurants = await prisma.restaurant.findMany({
    where: {
      comments: {
        some: {
          sentimentExtraction: {
            rawAiScore: { not: null }
          }
        }
      }
    },
    select: {
      id: true
    }
  });

  // Combine and deduplicate
  const allIds = new Set([
    ...postsRestaurants.map(r => r.id),
    ...commentsRestaurants.map(r => r.id)
  ]);

  return Array.from(allIds);
};
