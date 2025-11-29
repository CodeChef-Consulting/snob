import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { RestaurantLocationOrderByRelationAggregateInputObjectSchema as RestaurantLocationOrderByRelationAggregateInputObjectSchema } from './RestaurantLocationOrderByRelationAggregateInput.schema';
import { PostOrderByRelationAggregateInputObjectSchema as PostOrderByRelationAggregateInputObjectSchema } from './PostOrderByRelationAggregateInput.schema';
import { CommentOrderByRelationAggregateInputObjectSchema as CommentOrderByRelationAggregateInputObjectSchema } from './CommentOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  rawScore: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  normalizedScore: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  locations: z.lazy(() => RestaurantLocationOrderByRelationAggregateInputObjectSchema).optional(),
  posts: z.lazy(() => PostOrderByRelationAggregateInputObjectSchema).optional(),
  comments: z.lazy(() => CommentOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const RestaurantGroupOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.RestaurantGroupOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantGroupOrderByWithRelationInput>;
export const RestaurantGroupOrderByWithRelationInputObjectZodSchema = makeSchema();
