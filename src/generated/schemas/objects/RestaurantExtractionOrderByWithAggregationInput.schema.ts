import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { RestaurantExtractionCountOrderByAggregateInputObjectSchema as RestaurantExtractionCountOrderByAggregateInputObjectSchema } from './RestaurantExtractionCountOrderByAggregateInput.schema';
import { RestaurantExtractionAvgOrderByAggregateInputObjectSchema as RestaurantExtractionAvgOrderByAggregateInputObjectSchema } from './RestaurantExtractionAvgOrderByAggregateInput.schema';
import { RestaurantExtractionMaxOrderByAggregateInputObjectSchema as RestaurantExtractionMaxOrderByAggregateInputObjectSchema } from './RestaurantExtractionMaxOrderByAggregateInput.schema';
import { RestaurantExtractionMinOrderByAggregateInputObjectSchema as RestaurantExtractionMinOrderByAggregateInputObjectSchema } from './RestaurantExtractionMinOrderByAggregateInput.schema';
import { RestaurantExtractionSumOrderByAggregateInputObjectSchema as RestaurantExtractionSumOrderByAggregateInputObjectSchema } from './RestaurantExtractionSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  postId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  commentId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  restaurantsMentioned: SortOrderSchema.optional(),
  primaryRestaurant: SortOrderSchema.optional(),
  dishesMentioned: SortOrderSchema.optional(),
  isSubjective: SortOrderSchema.optional(),
  extractedAt: SortOrderSchema.optional(),
  model: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => RestaurantExtractionCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => RestaurantExtractionAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => RestaurantExtractionMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => RestaurantExtractionMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => RestaurantExtractionSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const RestaurantExtractionOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.RestaurantExtractionOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantExtractionOrderByWithAggregationInput>;
export const RestaurantExtractionOrderByWithAggregationInputObjectZodSchema = makeSchema();
