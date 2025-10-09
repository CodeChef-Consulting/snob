import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { PostOrderByWithRelationInputObjectSchema as PostOrderByWithRelationInputObjectSchema } from './PostOrderByWithRelationInput.schema';
import { CommentOrderByRelationAggregateInputObjectSchema as CommentOrderByRelationAggregateInputObjectSchema } from './CommentOrderByRelationAggregateInput.schema';
import { ScrapingSessionOrderByWithRelationInputObjectSchema as ScrapingSessionOrderByWithRelationInputObjectSchema } from './ScrapingSessionOrderByWithRelationInput.schema';
import { FileOrderByRelationAggregateInputObjectSchema as FileOrderByRelationAggregateInputObjectSchema } from './FileOrderByRelationAggregateInput.schema';
import { RestaurantOrderByRelationAggregateInputObjectSchema as RestaurantOrderByRelationAggregateInputObjectSchema } from './RestaurantOrderByRelationAggregateInput.schema';
import { RestaurantExtractionOrderByWithRelationInputObjectSchema as RestaurantExtractionOrderByWithRelationInputObjectSchema } from './RestaurantExtractionOrderByWithRelationInput.schema'

const commentorderbywithrelationinputSchema = z.object({
  id: SortOrderSchema.optional(),
  externalId: SortOrderSchema.optional(),
  postId: SortOrderSchema.optional(),
  parentCommentId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  author: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  body: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  score: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  ups: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  depth: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  controversiality: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  isSubmitter: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  scoreHidden: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  permalink: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdUtc: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  scrapingSessionId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  post: z.lazy(() => PostOrderByWithRelationInputObjectSchema).optional(),
  parentComment: z.lazy(() => CommentOrderByWithRelationInputObjectSchema).optional(),
  replies: z.lazy(() => CommentOrderByRelationAggregateInputObjectSchema).optional(),
  scrapingSession: z.lazy(() => ScrapingSessionOrderByWithRelationInputObjectSchema).optional(),
  files: z.lazy(() => FileOrderByRelationAggregateInputObjectSchema).optional(),
  restaurantsMentioned: z.lazy(() => RestaurantOrderByRelationAggregateInputObjectSchema).optional(),
  restaurantExtraction: z.lazy(() => RestaurantExtractionOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const CommentOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.CommentOrderByWithRelationInput> = commentorderbywithrelationinputSchema as unknown as z.ZodType<Prisma.CommentOrderByWithRelationInput>;
export const CommentOrderByWithRelationInputObjectZodSchema = commentorderbywithrelationinputSchema;
