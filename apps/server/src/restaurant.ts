import { z } from 'zod';
import _ from 'lodash';
import { publicProcedure, t } from './generated/routers/helpers/createRouter';

export const restaurantRouter = t.router({
  getRestaurantsByDish: publicProcedure
    .input(
      z.object({
        dishName: z.string().min(3), // Minimum 3 characters to avoid useless searches
        similarityThreshold: z.number().min(0).max(1).optional().default(0.3),
        limit: z.number().min(1).max(50).optional().default(10),
      })
    )
    .query(async ({ ctx, input }) => {
      const { dishName, similarityThreshold, limit } = input;

      // Step 1: Find all extractions with dishes that match the search term using trigram similarity
      const extractionsWithDishes = await ctx.prisma.$queryRaw<
        Array<{
          id: number;
          post_id: number | null;
          comment_id: number | null;
          dishes_mentioned: string[];
          primary_restaurant: string | null;
          dish_match: string;
          similarity: number;
        }>
      >`
        SELECT DISTINCT
          e.id,
          e."postId" as post_id,
          e."commentId" as comment_id,
          e."dishesMentioned" as dishes_mentioned,
          e."primaryRestaurant" as primary_restaurant,
          dish as dish_match,
          similarity(dish, ${dishName}) as similarity
        FROM "RestaurantExtraction" e,
        LATERAL unnest(e."dishesMentioned") as dish
        WHERE similarity(dish, ${dishName}) > ${similarityThreshold}
        ORDER BY similarity DESC
        LIMIT 100
      `;

      if (extractionsWithDishes.length === 0) {
        return [];
      }

      // Step 2: Get the restaurant IDs from these extractions
      const postIds = _.compact(_.map(extractionsWithDishes, 'post_id'));
      const commentIds = _.compact(_.map(extractionsWithDishes, 'comment_id'));

      // Step 3: Get posts with their linked restaurants (with full restaurant details)
      const posts = await ctx.prisma.post.findMany({
        where: {
          id: { in: postIds },
        },
        select: {
          id: true,
          restaurantsMentioned: {
            select: {
              id: true,
              name: true,
              address: true,
              city: true,
              state: true,
              latitude: true,
              longitude: true,
              normalizedScore: true,
            },
          },
          sentimentExtraction: {
            select: {
              rawAiScore: true,
            },
          },
        },
      });

      // Step 4: Get comments with their linked restaurants (with full restaurant details)
      const comments = await ctx.prisma.comment.findMany({
        where: {
          id: { in: commentIds },
        },
        select: {
          id: true,
          restaurantsMentioned: {
            select: {
              id: true,
              name: true,
              address: true,
              city: true,
              state: true,
              latitude: true,
              longitude: true,
              normalizedScore: true,
              rawScore: true,
            },
          },
          sentimentExtraction: {
            select: {
              rawAiScore: true,
            },
          },
        },
      });

      // Step 5: Build restaurant scoring map
      type RestaurantDetails = {
        id: number;
        name: string;
        address: string | null;
        city: string | null;
        state: string | null;
        latitude: number | null;
        longitude: number | null;
        normalizedScore: number | null;
      };

      const restaurantScores = new Map<
        number,
        {
          restaurant: RestaurantDetails;
          dishMatches: string[];
          sentiments: number[];
          mentions: number;
        }
      >();

      _.forEach(extractionsWithDishes, (extraction) => {
        let restaurants: RestaurantDetails[] = [];
        let sentiment: number | null = null;

        if (extraction.post_id) {
          const post = _.find(posts, { id: extraction.post_id });
          if (post) {
            restaurants = post.restaurantsMentioned;
            sentiment = _.get(post, 'sentimentExtraction.rawAiScore', null);
          }
        } else if (extraction.comment_id) {
          const comment = _.find(comments, { id: extraction.comment_id });
          if (comment) {
            restaurants = comment.restaurantsMentioned;
            sentiment = _.get(comment, 'sentimentExtraction.rawAiScore', null);
          }
        }

        // Only count if exactly one restaurant is mentioned (to avoid ambiguity)
        if (restaurants.length === 1) {
          const restaurant = restaurants[0];
          if (restaurant && !restaurantScores.has(restaurant.id)) {
            restaurantScores.set(restaurant.id, {
              restaurant: restaurant,
              dishMatches: [],
              sentiments: [],
              mentions: 0,
            });
          }

          if (restaurant) {
            const score = restaurantScores.get(restaurant.id)!;
            score.mentions++;
            if (!_.includes(score.dishMatches, extraction.dish_match)) {
              score.dishMatches.push(extraction.dish_match);
            }
            if (sentiment !== null) {
              score.sentiments.push(sentiment);
            }
          }
        }
      });

      // Step 6: Calculate raw scores and normalize
      const resultsWithRawScores = _.map(
        Array.from(restaurantScores.values()),
        (r) => {
          const avgSentiment = _.isEmpty(r.sentiments)
            ? null
            : _.mean(r.sentiments);

          // Calculate raw compound score using actual raw scores
          // Dish sentiment ranges from -1 to 1, need to convert to 0-1 scale
          // Restaurant normalizedScore is already 1-10 scale
          const dishRawScore =
            avgSentiment !== null
              ? (avgSentiment + 1) / 2 // Convert -1 to 1 range into 0-1 scale
              : 0.5; // Default to neutral if no sentiment
          const restaurantRawScore = r.restaurant.normalizedScore
            ? r.restaurant.normalizedScore / 10 // Convert 1-10 scale to 0-1
            : 0.5; // Default to neutral if no overall score

          // Weighted raw score: 30% dish-specific, 70% overall restaurant
          const rawCompoundScore =
            dishRawScore * 0.3 + restaurantRawScore * 0.7;

          return {
            ...r.restaurant,
            dishMatches: r.dishMatches,
            mentions: r.mentions,
            avgSentiment,
            sentimentCount: r.sentiments.length,
            rawCompoundScore,
          };
        }
      );

      // Find min/max raw scores for normalization
      const minRaw =
        _.minBy(resultsWithRawScores, 'rawCompoundScore')?.rawCompoundScore ??
        0;
      const maxRaw =
        _.maxBy(resultsWithRawScores, 'rawCompoundScore')?.rawCompoundScore ??
        1;
      const range = maxRaw - minRaw;

      // Normalize to 0-100 scale
      const results = _.map(resultsWithRawScores, (r) => ({
        ...r,
        compoundScore:
          range > 0
            ? ((r.rawCompoundScore - minRaw) / range) * 100 // Scale to 0-100
            : 50, // If all scores are the same, default to middle
      }));

      // Sort by compound score DESC (highest first), then by mentions
      const sortedResults = _.orderBy(
        results,
        ['compoundScore', 'mentions'],
        ['desc', 'desc']
      );

      return _.take(sortedResults, limit);
    }),

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
          post: {
            select: {
              restaurantsMentioned: {
                select: { id: true },
              },
            },
          },
        },
      });

      // Extract dishes with sentiment scores
      const dishSentiments = new Map<string, number[]>();

      _.forEach(posts, (post) => {
        const extraction = post.restaurantExtraction;
        const sentiment = _.get(post, 'sentimentExtraction.rawAiScore');

        // Only include dishes if exactly one restaurant is mentioned
        if (!_.isEmpty(extraction?.dishesMentioned)) {
          _.forEach(extraction!.dishesMentioned, (dish) => {
            if (!dishSentiments.has(dish)) {
              dishSentiments.set(dish, []);
            }
            if (!_.isNil(sentiment)) {
              dishSentiments.get(dish)!.push(sentiment);
            }
          });
        }
      });

      _.forEach(comments, (comment) => {
        const extraction = comment.restaurantExtraction;
        const sentiment = _.get(comment, 'sentimentExtraction.rawAiScore');

        // Only include dishes if exactly one restaurant is mentioned
        if (
          !_.isEmpty(extraction?.dishesMentioned) &&
          comment.post.restaurantsMentioned.length === 1 &&
          comment.post.restaurantsMentioned[0]?.id === input.id
        ) {
          _.forEach(extraction!.dishesMentioned, (dish) => {
            if (!dishSentiments.has(dish)) {
              dishSentiments.set(dish, []);
            }
            if (!_.isNil(sentiment)) {
              dishSentiments.get(dish)!.push(sentiment);
            }
          });
        }
      });

      // Calculate average sentiment for each dish and sort
      const dishesWithScores = _.map(
        Array.from(dishSentiments.entries()),
        ([dish, sentiments]) => ({
          dish,
          avgSentiment: _.isEmpty(sentiments) ? 0 : _.mean(sentiments),
          count: sentiments.length,
        })
      );

      // Sort by average sentiment (highest first), then alphabetically
      const sortedDishes = _.orderBy(
        dishesWithScores,
        ['avgSentiment', (d) => d.dish.toLowerCase()],
        ['desc', 'asc']
      );

      return _.map(sortedDishes, 'dish');
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
      const postMentions = _.map(posts, (post) => ({
        id: `post-${post.id}`,
        type: 'post' as const,
        author: post.author,
        body: post.body || post.title || '',
        permalink: post.permalink,
        score: post.score,
        createdUtc: post.createdUtc,
      }));

      const commentMentions = _.map(comments, (comment) => ({
        id: `comment-${comment.id}`,
        type: 'comment' as const,
        author: comment.author,
        body: comment.body || '',
        permalink: comment.permalink,
        score: comment.score,
        createdUtc: comment.createdUtc,
        postTitle: comment.post?.title,
      }));

      const mentions = _.orderBy(
        [...postMentions, ...commentMentions],
        [(m) => (m.createdUtc ? new Date(m.createdUtc).getTime() : 0)],
        ['desc']
      );

      return mentions;
    }),
});
