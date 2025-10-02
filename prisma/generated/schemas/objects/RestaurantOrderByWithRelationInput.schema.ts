import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { PostOrderByRelationAggregateInputObjectSchema as PostOrderByRelationAggregateInputObjectSchema } from './PostOrderByRelationAggregateInput.schema';
import { ScrapingSessionOrderByRelationAggregateInputObjectSchema as ScrapingSessionOrderByRelationAggregateInputObjectSchema } from './ScrapingSessionOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  address: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  city: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  state: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  zipCode: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  phone: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  website: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  cuisine: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  priceRange: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  metadata: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  posts: z.lazy(() => PostOrderByRelationAggregateInputObjectSchema).optional(),
  scrapeSessions: z.lazy(() => ScrapingSessionOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const RestaurantOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.RestaurantOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantOrderByWithRelationInput>;
export const RestaurantOrderByWithRelationInputObjectZodSchema = makeSchema();
