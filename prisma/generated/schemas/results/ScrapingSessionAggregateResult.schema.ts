import * as z from 'zod';
export const ScrapingSessionAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    subreddit: z.number(),
    restaurant: z.number(),
    restaurantId: z.number(),
    status: z.number(),
    lastScrapedAt: z.number(),
    lastPostTimestamp: z.number(),
    postsScraped: z.number(),
    commentsScraped: z.number(),
    errorMessage: z.number(),
    metadata: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _sum: z.object({
    id: z.number().nullable(),
    restaurantId: z.number().nullable(),
    postsScraped: z.number().nullable(),
    commentsScraped: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    id: z.number().nullable(),
    restaurantId: z.number().nullable(),
    postsScraped: z.number().nullable(),
    commentsScraped: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.number().int().nullable(),
    subreddit: z.string().nullable(),
    restaurantId: z.number().int().nullable(),
    status: z.string().nullable(),
    lastScrapedAt: z.date().nullable(),
    lastPostTimestamp: z.date().nullable(),
    postsScraped: z.number().int().nullable(),
    commentsScraped: z.number().int().nullable(),
    errorMessage: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.number().int().nullable(),
    subreddit: z.string().nullable(),
    restaurantId: z.number().int().nullable(),
    status: z.string().nullable(),
    lastScrapedAt: z.date().nullable(),
    lastPostTimestamp: z.date().nullable(),
    postsScraped: z.number().int().nullable(),
    commentsScraped: z.number().int().nullable(),
    errorMessage: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()});