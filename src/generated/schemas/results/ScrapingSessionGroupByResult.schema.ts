import * as z from 'zod';
export const ScrapingSessionGroupByResultSchema = z.array(z.object({
  id: z.number().int(),
  subreddit: z.string(),
  mode: z.string(),
  timeframe: z.string(),
  searchQuery: z.string(),
  lastPostId: z.string(),
  lastPostTimestamp: z.date(),
  postsScraped: z.number().int(),
  commentsScraped: z.number().int(),
  completed: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    subreddit: z.number(),
    mode: z.number(),
    timeframe: z.number(),
    searchQuery: z.number(),
    lastPostId: z.number(),
    lastPostTimestamp: z.number(),
    postsScraped: z.number(),
    commentsScraped: z.number(),
    completed: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _sum: z.object({
    id: z.number().nullable(),
    postsScraped: z.number().nullable(),
    commentsScraped: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    id: z.number().nullable(),
    postsScraped: z.number().nullable(),
    commentsScraped: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.number().int().nullable(),
    subreddit: z.string().nullable(),
    mode: z.string().nullable(),
    timeframe: z.string().nullable(),
    searchQuery: z.string().nullable(),
    lastPostId: z.string().nullable(),
    lastPostTimestamp: z.date().nullable(),
    postsScraped: z.number().int().nullable(),
    commentsScraped: z.number().int().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.number().int().nullable(),
    subreddit: z.string().nullable(),
    mode: z.string().nullable(),
    timeframe: z.string().nullable(),
    searchQuery: z.string().nullable(),
    lastPostId: z.string().nullable(),
    lastPostTimestamp: z.date().nullable(),
    postsScraped: z.number().int().nullable(),
    commentsScraped: z.number().int().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
}));