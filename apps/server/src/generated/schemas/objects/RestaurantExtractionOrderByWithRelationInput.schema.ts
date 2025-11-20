import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { PostOrderByWithRelationInputObjectSchema as PostOrderByWithRelationInputObjectSchema } from './PostOrderByWithRelationInput.schema';
import { CommentOrderByWithRelationInputObjectSchema as CommentOrderByWithRelationInputObjectSchema } from './CommentOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  postId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  commentId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  restaurantsMentioned: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  primaryRestaurant: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  dishesMentioned: SortOrderSchema.optional(),
  isSubjective: SortOrderSchema.optional(),
  attemptedLinkToRestaurantsMentioned: SortOrderSchema.optional(),
  extractedAt: SortOrderSchema.optional(),
  model: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  post: z.lazy(() => PostOrderByWithRelationInputObjectSchema).optional(),
  comment: z.lazy(() => CommentOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const RestaurantExtractionOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.RestaurantExtractionOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantExtractionOrderByWithRelationInput>;
export const RestaurantExtractionOrderByWithRelationInputObjectZodSchema = makeSchema();
