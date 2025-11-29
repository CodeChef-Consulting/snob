import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  latitude: SortOrderSchema.optional(),
  longitude: SortOrderSchema.optional(),
  groupId: SortOrderSchema.optional()
}).strict();
export const RestaurantLocationSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.RestaurantLocationSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantLocationSumOrderByAggregateInput>;
export const RestaurantLocationSumOrderByAggregateInputObjectZodSchema = makeSchema();
