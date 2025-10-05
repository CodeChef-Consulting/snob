import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { CommentOrderByRelationAggregateInputObjectSchema as CommentOrderByRelationAggregateInputObjectSchema } from './CommentOrderByRelationAggregateInput.schema';
import { FileOrderByRelationAggregateInputObjectSchema as FileOrderByRelationAggregateInputObjectSchema } from './FileOrderByRelationAggregateInput.schema';
import { RestaurantOrderByRelationAggregateInputObjectSchema as RestaurantOrderByRelationAggregateInputObjectSchema } from './RestaurantOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  externalId: SortOrderSchema.optional(),
  subreddit: SortOrderSchema.optional(),
  author: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  title: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  body: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  score: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  upvoteRatio: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  numComments: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  url: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdUtc: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  comments: z.lazy(() => CommentOrderByRelationAggregateInputObjectSchema).optional(),
  files: z.lazy(() => FileOrderByRelationAggregateInputObjectSchema).optional(),
  restaurantsMentioned: z.lazy(() => RestaurantOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const PostOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.PostOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.PostOrderByWithRelationInput>;
export const PostOrderByWithRelationInputObjectZodSchema = makeSchema();
