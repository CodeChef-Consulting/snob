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
  attemptedLinkToRestaurantsMentioned: SortOrderSchema.optional(),
  extractedAt: SortOrderSchema.optional(),
  model: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const RestaurantExtractionMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.RestaurantExtractionMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantExtractionMinOrderByAggregateInput>;
export const RestaurantExtractionMinOrderByAggregateInputObjectZodSchema = makeSchema();
