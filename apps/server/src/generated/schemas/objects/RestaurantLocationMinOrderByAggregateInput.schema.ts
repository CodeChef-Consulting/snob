import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  address: SortOrderSchema.optional(),
  city: SortOrderSchema.optional(),
  state: SortOrderSchema.optional(),
  zipCode: SortOrderSchema.optional(),
  latitude: SortOrderSchema.optional(),
  longitude: SortOrderSchema.optional(),
  source: SortOrderSchema.optional(),
  googlePlaceId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  groupId: SortOrderSchema.optional()
}).strict();
export const RestaurantLocationMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.RestaurantLocationMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantLocationMinOrderByAggregateInput>;
export const RestaurantLocationMinOrderByAggregateInputObjectZodSchema = makeSchema();
