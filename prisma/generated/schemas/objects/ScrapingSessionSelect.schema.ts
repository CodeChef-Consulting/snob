import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantArgsObjectSchema as RestaurantArgsObjectSchema } from './RestaurantArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  subreddit: z.boolean().optional(),
  restaurant: z.union([z.boolean(), z.lazy(() => RestaurantArgsObjectSchema)]).optional(),
  restaurantId: z.boolean().optional(),
  status: z.boolean().optional(),
  lastScrapedAt: z.boolean().optional(),
  lastPostTimestamp: z.boolean().optional(),
  postsScraped: z.boolean().optional(),
  commentsScraped: z.boolean().optional(),
  errorMessage: z.boolean().optional(),
  metadata: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional()
}).strict();
export const ScrapingSessionSelectObjectSchema: z.ZodType<Prisma.ScrapingSessionSelect> = makeSchema() as unknown as z.ZodType<Prisma.ScrapingSessionSelect>;
export const ScrapingSessionSelectObjectZodSchema = makeSchema();
