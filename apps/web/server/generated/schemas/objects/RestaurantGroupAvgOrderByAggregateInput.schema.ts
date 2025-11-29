import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  rawScore: SortOrderSchema.optional(),
  normalizedScore: SortOrderSchema.optional()
}).strict();
export const RestaurantGroupAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.RestaurantGroupAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantGroupAvgOrderByAggregateInput>;
export const RestaurantGroupAvgOrderByAggregateInputObjectZodSchema = makeSchema();
