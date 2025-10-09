import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  postId: SortOrderSchema.optional(),
  commentId: SortOrderSchema.optional()
}).strict();
export const RestaurantExtractionAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.RestaurantExtractionAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantExtractionAvgOrderByAggregateInput>;
export const RestaurantExtractionAvgOrderByAggregateInputObjectZodSchema = makeSchema();
