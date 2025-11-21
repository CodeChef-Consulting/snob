import { z } from 'zod';
import _ from 'lodash';
import { publicProcedure, t } from './generated/routers/helpers/createRouter';

export const restaurantGroupRouter = t.router({
  /**
   * Get restaurant groups with normalizedScore > threshold (default 8)
   * Returns groups with their locations for map display
   */
  getHighScoringGroups: publicProcedure
    .input(
      z.object({
        minScore: z.number().min(0).max(10).optional().default(8),
        limit: z.number().min(1).max(500).optional().default(100),
      })
    )
    .query(async ({ ctx, input }) => {
      const groups = await ctx.prisma.restaurantGroup.findMany({
        where: {
          normalizedScore: {
            gte: input.minScore,
          },
        },
        select: {
          id: true,
          name: true,
          normalizedScore: true,
          rawScore: true,
          locations: {
            select: {
              id: true,
              name: true,
              address: true,
              city: true,
              state: true,
              zipCode: true,
              latitude: true,
              longitude: true,
            },
          },
        },
        orderBy: {
          normalizedScore: 'desc',
        },
        take: input.limit,
      });

      // Add location count to each group
      return groups.map((group) => ({
        ...group,
        locationCount: group.locations.length,
      }));
    }),

  /**
   * Search restaurant groups by name
   * Returns groups with location count
   */
  searchGroups: publicProcedure
    .input(
      z.object({
        query: z.string().min(1),
        limit: z.number().min(1).max(50).optional().default(20),
      })
    )
    .query(async ({ ctx, input }) => {
      const groups = await ctx.prisma.restaurantGroup.findMany({
        where: {
          name: {
            contains: input.query,
            mode: 'insensitive',
          },
        },
        select: {
          id: true,
          name: true,
          normalizedScore: true,
          rawScore: true,
          locations: {
            select: {
              id: true,
              name: true,
              address: true,
              city: true,
              state: true,
              zipCode: true,
              latitude: true,
              longitude: true,
            },
          },
        },
        orderBy: [{ normalizedScore: 'desc' }, { name: 'asc' }],
        take: input.limit,
      });

      // Format results with location count
      return groups.map((group) => ({
        id: group.id,
        name: group.name,
        normalizedScore: group.normalizedScore,
        rawScore: group.rawScore,
        locationCount: group.locations.length,
        locations: group.locations,
      }));
    }),

  /**
   * Get restaurant group by ID with all locations
   * Includes bounds for map view
   */
  getGroupById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const group = await ctx.prisma.restaurantGroup.findUnique({
        where: { id: input.id },
        select: {
          id: true,
          name: true,
          normalizedScore: true,
          rawScore: true,
          locations: {
            select: {
              id: true,
              name: true,
              address: true,
              city: true,
              state: true,
              zipCode: true,
              latitude: true,
              longitude: true,
              googlePlaceId: true,
              metadata: true,
            },
            orderBy: {
              name: 'asc',
            },
          },
        },
      });

      if (!group) {
        return null;
      }

      // Calculate bounds for map view (min/max lat/lng)
      const validLocations = group.locations.filter(
        (loc) => loc.latitude !== null && loc.longitude !== null
      );

      let bounds: {
        north: number;
        south: number;
        east: number;
        west: number;
      } | null = null;

      if (validLocations.length > 0) {
        const lats = validLocations.map((loc) => loc.latitude!);
        const lngs = validLocations.map((loc) => loc.longitude!);

        bounds = {
          north: Math.max(...lats),
          south: Math.min(...lats),
          east: Math.max(...lngs),
          west: Math.min(...lngs),
        };
      }

      return {
        ...group,
        locationCount: group.locations.length,
        bounds,
      };
    }),

  /**
   * Get restaurant group dishes (aggregated from all locations)
   */
  getGroupDishes: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const group = await ctx.prisma.restaurantGroup.findUnique({
        where: { id: input.id },
        select: { id: true, name: true },
      });

      if (!group) {
        return [];
      }

      // Get posts where this restaurant group is mentioned, and it's the only group mentioned
      const posts = await ctx.prisma.post.findMany({
        where: {
          AND: [
            {
              restaurantGroupsMentioned: {
                some: { id: input.id },
              },
            },
            {
              restaurantGroupsMentioned: {
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
          restaurantGroupsMentioned: {
            select: { id: true },
          },
        },
      });

      // Get comments where this restaurant group is mentioned
      const comments = await ctx.prisma.comment.findMany({
        where: {
          AND: [
            {
              restaurantGroupsMentioned: {
                some: { id: input.id },
              },
            },
            {
              restaurantGroupsMentioned: {
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
          restaurantGroupsMentioned: {
            select: { id: true },
          },
          post: {
            select: {
              restaurantGroupsMentioned: {
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

        // Only include dishes if exactly one restaurant group is mentioned
        if (
          !_.isEmpty(extraction?.dishesMentioned) &&
          comment.post.restaurantGroupsMentioned.length === 1 &&
          comment.post.restaurantGroupsMentioned[0]?.id === input.id
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

  /**
   * Get restaurant group mentions (posts/comments)
   */
  getGroupMentions: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      // Get posts where this restaurant group is mentioned
      const posts = await ctx.prisma.post.findMany({
        where: {
          restaurantGroupsMentioned: {
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

      // Get comments where this restaurant group is mentioned
      const comments = await ctx.prisma.comment.findMany({
        where: {
          restaurantGroupsMentioned: {
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

  /**
   * Get restaurant groups by dish search
   * Similar to old getRestaurantsByDish but returns groups instead
   */
  getGroupsByDish: publicProcedure
    .input(
      z.object({
        dishName: z.string().min(3),
        similarityThreshold: z.number().min(0).max(1).optional().default(0.3),
        limit: z.number().min(1).max(50).optional().default(10),
      })
    )
    .query(async ({ ctx, input }) => {
      const { dishName, similarityThreshold, limit } = input;

      // Find all extractions with dishes that match the search term using trigram similarity
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

      const postIds = _.compact(_.map(extractionsWithDishes, 'post_id'));
      const commentIds = _.compact(_.map(extractionsWithDishes, 'comment_id'));

      // Get posts with their linked restaurant groups
      const posts = await ctx.prisma.post.findMany({
        where: {
          id: { in: postIds },
        },
        select: {
          id: true,
          restaurantGroupsMentioned: {
            select: {
              id: true,
              name: true,
              normalizedScore: true,
              locations: {
                select: {
                  id: true,
                  name: true,
                  address: true,
                  city: true,
                  state: true,
                  zipCode: true,
                  latitude: true,
                  longitude: true,
                },
              },
            },
          },
          sentimentExtraction: {
            select: {
              rawAiScore: true,
            },
          },
        },
      });

      // Get comments with their linked restaurant groups
      const comments = await ctx.prisma.comment.findMany({
        where: {
          id: { in: commentIds },
        },
        select: {
          id: true,
          restaurantGroupsMentioned: {
            select: {
              id: true,
              name: true,
              normalizedScore: true,
              rawScore: true,
              locations: {
                select: {
                  id: true,
                  name: true,
                  address: true,
                  city: true,
                  state: true,
                  zipCode: true,
                  latitude: true,
                  longitude: true,
                },
              },
            },
          },
          sentimentExtraction: {
            select: {
              rawAiScore: true,
            },
          },
        },
      });

      // Build restaurant group scoring map
      type RestaurantGroupDetails = {
        id: number;
        name: string;
        normalizedScore: number | null;
        locationCount: number;
        locations: Array<{
          id: number;
          name: string;
          address: string | null;
          city: string | null;
          state: string | null;
          zipCode: string | null;
          latitude: number | null;
          longitude: number | null;
        }>;
      };

      const groupScores = new Map<
        number,
        {
          group: RestaurantGroupDetails;
          dishMatches: string[];
          sentiments: number[];
          mentions: number;
        }
      >();

      _.forEach(extractionsWithDishes, (extraction) => {
        let groups: Array<{
          id: number;
          name: string;
          normalizedScore: number | null;
          locations: Array<{
            id: number;
            name: string;
            address: string | null;
            city: string | null;
            state: string | null;
            zipCode: string | null;
            latitude: number | null;
            longitude: number | null;
          }>;
        }> = [];
        let sentiment: number | null = null;

        if (extraction.post_id) {
          const post = _.find(posts, { id: extraction.post_id });
          if (post) {
            groups = post.restaurantGroupsMentioned;
            sentiment = _.get(post, 'sentimentExtraction.rawAiScore', null);
          }
        } else if (extraction.comment_id) {
          const comment = _.find(comments, { id: extraction.comment_id });
          if (comment) {
            groups = comment.restaurantGroupsMentioned;
            sentiment = _.get(comment, 'sentimentExtraction.rawAiScore', null);
          }
        }

        // Only count if exactly one restaurant group is mentioned
        if (groups.length === 1) {
          const group = groups[0];
          if (group && !groupScores.has(group.id)) {
            groupScores.set(group.id, {
              group: {
                id: group.id,
                name: group.name,
                normalizedScore: group.normalizedScore,
                locationCount: group.locations.length,
                locations: group.locations,
              },
              dishMatches: [],
              sentiments: [],
              mentions: 0,
            });
          }

          if (group) {
            const score = groupScores.get(group.id)!;
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

      // Calculate raw scores and normalize
      const resultsWithRawScores = _.map(
        Array.from(groupScores.values()),
        (r) => {
          const avgSentiment = _.isEmpty(r.sentiments)
            ? null
            : _.mean(r.sentiments);

          const dishRawScore =
            avgSentiment !== null ? (avgSentiment + 1) / 2 : 0.5;
          const groupRawScore = r.group.normalizedScore
            ? r.group.normalizedScore / 10
            : 0.5;

          const rawCompoundScore = dishRawScore * 0.3 + groupRawScore * 0.7;

          return {
            ...r.group,
            dishMatches: r.dishMatches,
            mentions: r.mentions,
            avgSentiment,
            sentimentCount: r.sentiments.length,
            rawCompoundScore,
          };
        }
      );

      // Normalize to 0-100 scale
      const minRaw =
        _.minBy(resultsWithRawScores, 'rawCompoundScore')?.rawCompoundScore ??
        0;
      const maxRaw =
        _.maxBy(resultsWithRawScores, 'rawCompoundScore')?.rawCompoundScore ??
        1;
      const range = maxRaw - minRaw;

      const results = _.map(resultsWithRawScores, (r) => ({
        ...r,
        compoundScore:
          range > 0 ? ((r.rawCompoundScore - minRaw) / range) * 100 : 50,
      }));

      // Sort by compound score DESC, then by mentions
      const sortedResults = _.orderBy(
        results,
        ['compoundScore', 'mentions'],
        ['desc', 'desc']
      );

      return _.take(sortedResults, limit);
    }),

  /**
   * Get restaurant groups mentioned alongside the specified group
   * Returns other groups that appear in the same posts/comments
   */
  getGroupsMentionedAlongside: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      // Get all posts where this restaurant group is mentioned
      const postsWithGroup = await ctx.prisma.post.findMany({
        where: {
          restaurantGroupsMentioned: {
            some: { id: input.id },
          },
        },
        select: {
          id: true,
          restaurantGroupsMentioned: {
            where: {
              id: { not: input.id },
            },
            select: {
              id: true,
              name: true,
              normalizedScore: true,
            },
          },
        },
      });

      // Get all comments where this restaurant group is mentioned
      const commentsWithGroup = await ctx.prisma.comment.findMany({
        where: {
          restaurantGroupsMentioned: {
            some: { id: input.id },
          },
        },
        select: {
          id: true,
          restaurantGroupsMentioned: {
            where: {
              id: { not: input.id },
            },
            select: {
              id: true,
              name: true,
              normalizedScore: true,
            },
          },
        },
      });

      // Count mentions of each co-occurring restaurant group
      const mentionCounts = new Map<
        number,
        {
          id: number;
          name: string;
          normalizedScore: number | null;
          count: number;
        }
      >();

      // Process posts
      _.forEach(postsWithGroup, (post) => {
        _.forEach(post.restaurantGroupsMentioned, (group) => {
          if (!mentionCounts.has(group.id)) {
            mentionCounts.set(group.id, {
              id: group.id,
              name: group.name,
              normalizedScore: group.normalizedScore,
              count: 0,
            });
          }
          mentionCounts.get(group.id)!.count++;
        });
      });

      // Process comments
      _.forEach(commentsWithGroup, (comment) => {
        _.forEach(comment.restaurantGroupsMentioned, (group) => {
          if (!mentionCounts.has(group.id)) {
            mentionCounts.set(group.id, {
              id: group.id,
              name: group.name,
              normalizedScore: group.normalizedScore,
              count: 0,
            });
          }
          mentionCounts.get(group.id)!.count++;
        });
      });

      // Sort by mention count descending, then by name
      const sortedGroups = _.orderBy(
        Array.from(mentionCounts.values()),
        ['count', (g) => g.name.toLowerCase()],
        ['desc', 'asc']
      ).slice(0, 100);

      return sortedGroups;
    }),
});
