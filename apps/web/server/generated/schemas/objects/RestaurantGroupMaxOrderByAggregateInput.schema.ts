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
export const RestaurantGroupMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.RestaurantGroupMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantGroupMaxOrderByAggregateInput>;
export const RestaurantGroupMaxOrderByAggregateInputObjectZodSchema = makeSchema();
