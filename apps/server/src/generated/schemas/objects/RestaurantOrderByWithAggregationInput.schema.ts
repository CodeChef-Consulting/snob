import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { RestaurantCountOrderByAggregateInputObjectSchema as RestaurantCountOrderByAggregateInputObjectSchema } from './RestaurantCountOrderByAggregateInput.schema';
import { RestaurantAvgOrderByAggregateInputObjectSchema as RestaurantAvgOrderByAggregateInputObjectSchema } from './RestaurantAvgOrderByAggregateInput.schema';
import { RestaurantMaxOrderByAggregateInputObjectSchema as RestaurantMaxOrderByAggregateInputObjectSchema } from './RestaurantMaxOrderByAggregateInput.schema';
import { RestaurantMinOrderByAggregateInputObjectSchema as RestaurantMinOrderByAggregateInputObjectSchema } from './RestaurantMinOrderByAggregateInput.schema';
import { RestaurantSumOrderByAggregateInputObjectSchema as RestaurantSumOrderByAggregateInputObjectSchema } from './RestaurantSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  address: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  city: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  state: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  zipCode: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  latitude: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  longitude: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  source: SortOrderSchema.optional(),
  googlePlaceId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  lookupAliases: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  metadata: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  rawScore: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  normalizedScore: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => RestaurantCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => RestaurantAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => RestaurantMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => RestaurantMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => RestaurantSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const RestaurantOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.RestaurantOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantOrderByWithAggregationInput>;
export const RestaurantOrderByWithAggregationInputObjectZodSchema = makeSchema();
