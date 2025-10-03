import * as z from 'zod';
export const ScrapingSessionGroupByResultSchema = z.array(z.object({
  id: z.number().int(),
  subreddit: z.string(),
  lastPostId: z.string(),
  lastPostTimestamp: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    subreddit: z.number(),
    lastPostId: z.number(),
    lastPostTimestamp: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _sum: z.object({
    id: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    id: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.number().int().nullable(),
    subreddit: z.string().nullable(),
    lastPostId: z.string().nullable(),
    lastPostTimestamp: z.date().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.number().int().nullable(),
    subreddit: z.string().nullable(),
    lastPostId: z.string().nullable(),
    lastPostTimestamp: z.date().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
}));