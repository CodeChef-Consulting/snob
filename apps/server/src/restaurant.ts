import { z } from 'zod';
import { publicProcedure, t } from './generated/routers/helpers/createRouter';

export const restaurantRouter = t.router({
  getRestaurantDishes: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const restaurant = await ctx.prisma.restaurant.findUnique({
        where: { id: input.id },
        select: { id: true, name: true },
      });

      if (!restaurant) {
        return [];
      }

      // Get posts where this restaurant is mentioned, and it's the only restaurant mentioned
      const posts = await ctx.prisma.post.findMany({
        where: {
          AND: [
            {
              restaurantsMentioned: {
                some: { id: input.id },
              },
            },
            {
              restaurantsMentioned: {
                none: {
                  id: { not: input.id },
                },
              },
            },
          ],
        },
        include: {
          restaurantExtraction: true,
          sentimentExtraction: true,
          restaurantsMentioned: {
            select: { id: true },
          },
        },
      });

      // Get comments where this restaurant is mentioned
      const comments = await ctx.prisma.comment.findMany({
        where: {
          AND: [
            {
              restaurantsMentioned: {
                some: { id: input.id },
              },
            },
            {
              restaurantsMentioned: {
                none: {
                  id: { not: input.id },
                },
              },
            },
          ],
        },
        include: {
          restaurantExtraction: true,
          sentimentExtraction: true,
          restaurantsMentioned: {
            select: { id: true },
          },
        },
      });

      // Extract dishes with sentiment scores
      const dishSentiments = new Map<string, number[]>();

      posts.forEach((post) => {
        const extraction = post.restaurantExtraction;
        const sentiment = post.sentimentExtraction?.rawAiScore;

        // Only include dishes if exactly one restaurant is mentioned
        if (
          extraction?.dishesMentioned &&
          extraction.primaryRestaurant === restaurant.name
        ) {
          const dishes = extraction.dishesMentioned
            .split(',')
            .map((d) => d.trim())
            .filter((d) => d && d !== 'NONE');

          dishes.forEach((dish) => {
            if (!dishSentiments.has(dish)) {
              dishSentiments.set(dish, []);
            }
            if (sentiment !== null && sentiment !== undefined) {
              dishSentiments.get(dish)!.push(sentiment);
            }
          });
        }
      });

      comments.forEach((comment) => {
        const extraction = comment.restaurantExtraction;
        const sentiment = comment.sentimentExtraction?.rawAiScore;

        // Only include dishes if exactly one restaurant is mentioned
        if (
          extraction?.dishesMentioned &&
          extraction.primaryRestaurant === restaurant.name
        ) {
          const dishes = extraction.dishesMentioned
            .split(',')
            .map((d) => d.trim())
            .filter((d) => d && d !== 'NONE');

          dishes.forEach((dish) => {
            if (!dishSentiments.has(dish)) {
              dishSentiments.set(dish, []);
            }
            if (sentiment !== null && sentiment !== undefined) {
              dishSentiments.get(dish)!.push(sentiment);
            }
          });
        }
      });

      // Calculate average sentiment for each dish and sort
      const dishesWithScores = Array.from(dishSentiments.entries()).map(
        ([dish, sentiments]) => ({
          dish,
          avgSentiment:
            sentiments.length > 0
              ? sentiments.reduce((sum, s) => sum + s, 0) / sentiments.length
              : 0,
          count: sentiments.length,
        })
      );

      // Sort by average sentiment (highest first), then alphabetically
      dishesWithScores.sort((a, b) => {
        if (b.avgSentiment !== a.avgSentiment) {
          return b.avgSentiment - a.avgSentiment;
        }
        return a.dish.localeCompare(b.dish);
      });

      return dishesWithScores.map((d) => d.dish);
    }),

  getRestaurantMentions: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      // Get posts where this restaurant is mentioned
      const posts = await ctx.prisma.post.findMany({
        where: {
          restaurantsMentioned: {
            some: { id: input.id },
          },
        },
        select: {
          id: true,
          author: true,
          title: true,
          body: true,
          permalink: true,
          score: true,
          createdUtc: true,
        },
        orderBy: {
          createdUtc: 'desc',
        },
      });

      // Get comments where this restaurant is mentioned
      const comments = await ctx.prisma.comment.findMany({
        where: {
          restaurantsMentioned: {
            some: { id: input.id },
          },
        },
        select: {
          id: true,
          author: true,
          body: true,
          permalink: true,
          score: true,
          createdUtc: true,
          post: {
            select: {
              title: true,
              permalink: true,
            },
          },
        },
        orderBy: {
          createdUtc: 'desc',
        },
      });

      // Format mentions for display
      const mentions = [
        ...posts.map((post) => ({
          id: `post-${post.id}`,
          type: 'post' as const,
          author: post.author,
          body: post.body || post.title || '',
          permalink: post.permalink,
          score: post.score,
          createdUtc: post.createdUtc,
        })),
        ...comments.map((comment) => ({
          id: `comment-${comment.id}`,
          type: 'comment' as const,
          author: comment.author,
          body: comment.body || '',
          permalink: comment.permalink,
          score: comment.score,
          createdUtc: comment.createdUtc,
          postTitle: comment.post?.title,
        })),
      ].sort((a, b) => {
        const dateA = a.createdUtc ? new Date(a.createdUtc).getTime() : 0;
        const dateB = b.createdUtc ? new Date(b.createdUtc).getTime() : 0;
        return dateB - dateA; // Most recent first
      });

      return mentions;
    }),
});
