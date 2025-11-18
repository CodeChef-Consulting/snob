import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  rawScore: SortOrderSchema.optional(),
  normalizedScore: SortOrderSchema.optional()
}).strict();
export const RestaurantSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.RestaurantSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantSumOrderByAggregateInput>;
export const RestaurantSumOrderByAggregateInputObjectZodSchema = makeSchema();
