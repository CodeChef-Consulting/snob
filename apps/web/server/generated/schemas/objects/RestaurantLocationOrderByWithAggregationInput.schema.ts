import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { RestaurantLocationCountOrderByAggregateInputObjectSchema as RestaurantLocationCountOrderByAggregateInputObjectSchema } from './RestaurantLocationCountOrderByAggregateInput.schema';
import { RestaurantLocationAvgOrderByAggregateInputObjectSchema as RestaurantLocationAvgOrderByAggregateInputObjectSchema } from './RestaurantLocationAvgOrderByAggregateInput.schema';
import { RestaurantLocationMaxOrderByAggregateInputObjectSchema as RestaurantLocationMaxOrderByAggregateInputObjectSchema } from './RestaurantLocationMaxOrderByAggregateInput.schema';
import { RestaurantLocationMinOrderByAggregateInputObjectSchema as RestaurantLocationMinOrderByAggregateInputObjectSchema } from './RestaurantLocationMinOrderByAggregateInput.schema';
import { RestaurantLocationSumOrderByAggregateInputObjectSchema as RestaurantLocationSumOrderByAggregateInputObjectSchema } from './RestaurantLocationSumOrderByAggregateInput.schema'

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
  lookupAliases: SortOrderSchema.optional(),
  metadata: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  groupId: SortOrderSchema.optional(),
  _count: z.lazy(() => RestaurantLocationCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => RestaurantLocationAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => RestaurantLocationMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => RestaurantLocationMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => RestaurantLocationSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const RestaurantLocationOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.RestaurantLocationOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantLocationOrderByWithAggregationInput>;
export const RestaurantLocationOrderByWithAggregationInputObjectZodSchema = makeSchema();
