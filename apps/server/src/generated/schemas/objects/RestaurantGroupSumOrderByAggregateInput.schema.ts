import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  rawScore: SortOrderSchema.optional(),
  normalizedScore: SortOrderSchema.optional()
}).strict();
export const RestaurantGroupSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.RestaurantGroupSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantGroupSumOrderByAggregateInput>;
export const RestaurantGroupSumOrderByAggregateInputObjectZodSchema = makeSchema();
