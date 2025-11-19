import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  latitude: SortOrderSchema.optional(),
  longitude: SortOrderSchema.optional(),
  rawScore: SortOrderSchema.optional(),
  normalizedScore: SortOrderSchema.optional()
}).strict();
export const RestaurantAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.RestaurantAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantAvgOrderByAggregateInput>;
export const RestaurantAvgOrderByAggregateInputObjectZodSchema = makeSchema();
