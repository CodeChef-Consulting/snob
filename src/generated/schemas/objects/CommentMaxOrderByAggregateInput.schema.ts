import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  externalId: SortOrderSchema.optional(),
  postId: SortOrderSchema.optional(),
  parentCommentId: SortOrderSchema.optional(),
  author: SortOrderSchema.optional(),
  body: SortOrderSchema.optional(),
  score: SortOrderSchema.optional(),
  createdUtc: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const CommentMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CommentMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentMaxOrderByAggregateInput>;
export const CommentMaxOrderByAggregateInputObjectZodSchema = makeSchema();
