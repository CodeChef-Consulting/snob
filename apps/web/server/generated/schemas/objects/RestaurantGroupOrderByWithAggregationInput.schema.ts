import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { RestaurantGroupCountOrderByAggregateInputObjectSchema as RestaurantGroupCountOrderByAggregateInputObjectSchema } from './RestaurantGroupCountOrderByAggregateInput.schema';
import { RestaurantGroupAvgOrderByAggregateInputObjectSchema as RestaurantGroupAvgOrderByAggregateInputObjectSchema } from './RestaurantGroupAvgOrderByAggregateInput.schema';
import { RestaurantGroupMaxOrderByAggregateInputObjectSchema as RestaurantGroupMaxOrderByAggregateInputObjectSchema } from './RestaurantGroupMaxOrderByAggregateInput.schema';
import { RestaurantGroupMinOrderByAggregateInputObjectSchema as RestaurantGroupMinOrderByAggregateInputObjectSchema } from './RestaurantGroupMinOrderByAggregateInput.schema';
import { RestaurantGroupSumOrderByAggregateInputObjectSchema as RestaurantGroupSumOrderByAggregateInputObjectSchema } from './RestaurantGroupSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  rawScore: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  normalizedScore: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => RestaurantGroupCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => RestaurantGroupAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => RestaurantGroupMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => RestaurantGroupMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => RestaurantGroupSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const RestaurantGroupOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.RestaurantGroupOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantGroupOrderByWithAggregationInput>;
export const RestaurantGroupOrderByWithAggregationInputObjectZodSchema = makeSchema();
