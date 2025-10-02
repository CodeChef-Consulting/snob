import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  subreddit: z.literal(true).optional(),
  status: z.literal(true).optional(),
  lastScrapedAt: z.literal(true).optional(),
  lastPostTimestamp: z.literal(true).optional(),
  postsScraped: z.literal(true).optional(),
  commentsScraped: z.literal(true).optional(),
  errorMessage: z.literal(true).optional(),
  metadata: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const ScrapingSessionCountAggregateInputObjectSchema: z.ZodType<Prisma.ScrapingSessionCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ScrapingSessionCountAggregateInputType>;
export const ScrapingSessionCountAggregateInputObjectZodSchema = makeSchema();
