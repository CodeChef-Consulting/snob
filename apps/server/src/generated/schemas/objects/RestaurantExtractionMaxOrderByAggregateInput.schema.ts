import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  postId: SortOrderSchema.optional(),
  commentId: SortOrderSchema.optional(),
  primaryRestaurant: SortOrderSchema.optional(),
  isSubjective: SortOrderSchema.optional(),
  attemptedLinkToRestaurantsMentioned: SortOrderSchema.optional(),
  extractedAt: SortOrderSchema.optional(),
  model: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const RestaurantExtractionMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.RestaurantExtractionMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantExtractionMaxOrderByAggregateInput>;
export const RestaurantExtractionMaxOrderByAggregateInputObjectZodSchema = makeSchema();
