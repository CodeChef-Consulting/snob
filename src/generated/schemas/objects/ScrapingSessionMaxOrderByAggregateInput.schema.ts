import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  subreddit: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  lastScrapedAt: SortOrderSchema.optional(),
  lastPostTimestamp: SortOrderSchema.optional(),
  postsScraped: SortOrderSchema.optional(),
  commentsScraped: SortOrderSchema.optional(),
  errorMessage: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const ScrapingSessionMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ScrapingSessionMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ScrapingSessionMaxOrderByAggregateInput>;
export const ScrapingSessionMaxOrderByAggregateInputObjectZodSchema = makeSchema();
