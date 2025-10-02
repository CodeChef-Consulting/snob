import { z } from 'zod';
export const ScrapingSessionGroupByResultSchema = z.array(z.object({
  id: z.number().int(),
  subreddit: z.string(),
  status: z.string(),
  lastScrapedAt: z.date(),
  lastPostTimestamp: z.date(),
  postsScraped: z.number().int(),
  commentsScraped: z.number().int(),
  errorMessage: z.string(),
  metadata: z.unknown(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    subreddit: z.number(),
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
    status: z.string().nullable(),
    lastScrapedAt: z.date().nullable(),
    lastPostTimestamp: z.date().nullable(),
    postsScraped: z.number().int().nullable(),
    commentsScraped: z.number().int().nullable(),
    errorMessage: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
}));