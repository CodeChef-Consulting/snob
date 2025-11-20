import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { RestaurantGroupOrderByWithRelationInputObjectSchema as RestaurantGroupOrderByWithRelationInputObjectSchema } from './RestaurantGroupOrderByWithRelationInput.schema'

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
  group: z.lazy(() => RestaurantGroupOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const RestaurantLocationOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.RestaurantLocationOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantLocationOrderByWithRelationInput>;
export const RestaurantLocationOrderByWithRelationInputObjectZodSchema = makeSchema();
