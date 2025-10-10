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
  phone: SortOrderSchema.optional(),
  website: SortOrderSchema.optional(),
  restaurantType: SortOrderSchema.optional(),
  priceRange: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const RestaurantMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.RestaurantMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantMaxOrderByAggregateInput>;
export const RestaurantMaxOrderByAggregateInputObjectZodSchema = makeSchema();
