import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  subreddit: SortOrderSchema.optional(),
  lastPostId: SortOrderSchema.optional(),
  lastPostTimestamp: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const ScrapingSessionMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ScrapingSessionMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ScrapingSessionMinOrderByAggregateInput>;
export const ScrapingSessionMinOrderByAggregateInputObjectZodSchema = makeSchema();
