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
  cuisine: SortOrderSchema.optional(),
  priceRange: SortOrderSchema.optional(),
  metadata: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const RestaurantCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.RestaurantCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantCountOrderByAggregateInput>;
export const RestaurantCountOrderByAggregateInputObjectZodSchema = makeSchema();
