import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  subreddit: z.literal(true).optional(),
  restaurantId: z.literal(true).optional(),
  status: z.literal(true).optional(),
  lastScrapedAt: z.literal(true).optional(),
  lastPostTimestamp: z.literal(true).optional(),
  postsScraped: z.literal(true).optional(),
  commentsScraped: z.literal(true).optional(),
  errorMessage: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const ScrapingSessionMaxAggregateInputObjectSchema: z.ZodType<Prisma.ScrapingSessionMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ScrapingSessionMaxAggregateInputType>;
export const ScrapingSessionMaxAggregateInputObjectZodSchema = makeSchema();
