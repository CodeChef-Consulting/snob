import { PrismaClient } from '@repo/db';
import type { RedditItem } from './engine';

const prisma = new PrismaClient();

/**
 * Loads all Reddit items for a specific restaurant group
 */
export const loadRestaurantGroupItems = async (groupId: number): Promise<RedditItem[]> => {
  const items: RedditItem[] = [];
  const now = Date.now();

  // Load posts for this restaurant group
  const posts = await prisma.post.findMany({
    where: {
      restaurantGroupsMentioned: {
        some: {
          id: groupId
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
      restaurantGroupsMentioned: {
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
    const mentions = post.restaurantGroupsMentioned.length;

    items.push({
      restaurantId: String(groupId),
      rawAiScore: post.sentimentExtraction.rawAiScore,
      upvotes,
      ageDays,
      depth: 0,
      mentions,
      postId: post.externalId
    });
  }

  // Load comments for this restaurant group
  const comments = await prisma.comment.findMany({
    where: {
      restaurantGroupsMentioned: {
        some: {
          id: groupId
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
      restaurantGroupsMentioned: {
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
    const mentions = comment.restaurantGroupsMentioned.length;

    items.push({
      restaurantId: String(groupId),
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
 * Gets all restaurant group IDs that have sentiment data
 */
export const getRestaurantGroupsWithSentiment = async (): Promise<number[]> => {
  // Get restaurant groups mentioned in posts with sentiment
  const postsGroups = await prisma.restaurantGroup.findMany({
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

  // Get restaurant groups mentioned in comments with sentiment
  const commentsGroups = await prisma.restaurantGroup.findMany({
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
    ...postsGroups.map(r => r.id),
    ...commentsGroups.map(r => r.id)
  ]);

  return Array.from(allIds);
};
