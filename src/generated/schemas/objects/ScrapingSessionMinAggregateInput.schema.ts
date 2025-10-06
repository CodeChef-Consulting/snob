import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  subreddit: z.literal(true).optional(),
  mode: z.literal(true).optional(),
  timeframe: z.literal(true).optional(),
  searchQuery: z.literal(true).optional(),
  lastPostId: z.literal(true).optional(),
  lastPostTimestamp: z.literal(true).optional(),
  postsScraped: z.literal(true).optional(),
  commentsScraped: z.literal(true).optional(),
  completed: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const ScrapingSessionMinAggregateInputObjectSchema: z.ZodType<Prisma.ScrapingSessionMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ScrapingSessionMinAggregateInputType>;
export const ScrapingSessionMinAggregateInputObjectZodSchema = makeSchema();
