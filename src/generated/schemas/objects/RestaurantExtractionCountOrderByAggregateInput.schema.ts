import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  postId: SortOrderSchema.optional(),
  commentId: SortOrderSchema.optional(),
  restaurantsMentioned: SortOrderSchema.optional(),
  primaryRestaurant: SortOrderSchema.optional(),
  dishesMentioned: SortOrderSchema.optional(),
  isSubjective: SortOrderSchema.optional(),
  extractedAt: SortOrderSchema.optional(),
  model: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const RestaurantExtractionCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.RestaurantExtractionCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantExtractionCountOrderByAggregateInput>;
export const RestaurantExtractionCountOrderByAggregateInputObjectZodSchema = makeSchema();
