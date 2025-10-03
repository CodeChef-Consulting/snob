import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  postsScraped: SortOrderSchema.optional(),
  commentsScraped: SortOrderSchema.optional()
}).strict();
export const ScrapingSessionAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ScrapingSessionAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ScrapingSessionAvgOrderByAggregateInput>;
export const ScrapingSessionAvgOrderByAggregateInputObjectZodSchema = makeSchema();
