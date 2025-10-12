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
  rawAiScore: SortOrderSchema.optional(),
  extractedAt: SortOrderSchema.optional(),
  model: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  post: z.lazy(() => PostOrderByWithRelationInputObjectSchema).optional(),
  comment: z.lazy(() => CommentOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const SentimentExtractionOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.SentimentExtractionOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.SentimentExtractionOrderByWithRelationInput>;
export const SentimentExtractionOrderByWithRelationInputObjectZodSchema = makeSchema();
