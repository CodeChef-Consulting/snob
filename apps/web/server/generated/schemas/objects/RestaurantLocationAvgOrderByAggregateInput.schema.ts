import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  latitude: SortOrderSchema.optional(),
  longitude: SortOrderSchema.optional(),
  groupId: SortOrderSchema.optional()
}).strict();
export const RestaurantLocationAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.RestaurantLocationAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantLocationAvgOrderByAggregateInput>;
export const RestaurantLocationAvgOrderByAggregateInputObjectZodSchema = makeSchema();
