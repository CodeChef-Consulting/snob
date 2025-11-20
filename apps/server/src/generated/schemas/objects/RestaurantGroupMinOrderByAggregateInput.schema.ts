import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  rawScore: SortOrderSchema.optional(),
  normalizedScore: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const RestaurantGroupMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.RestaurantGroupMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantGroupMinOrderByAggregateInput>;
export const RestaurantGroupMinOrderByAggregateInputObjectZodSchema = makeSchema();
