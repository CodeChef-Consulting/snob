import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  externalId: SortOrderSchema.optional(),
  postId: SortOrderSchema.optional(),
  parentCommentId: SortOrderSchema.optional(),
  parentExternalId: SortOrderSchema.optional(),
  author: SortOrderSchema.optional(),
  body: SortOrderSchema.optional(),
  score: SortOrderSchema.optional(),
  ups: SortOrderSchema.optional(),
  depth: SortOrderSchema.optional(),
  controversiality: SortOrderSchema.optional(),
  isSubmitter: SortOrderSchema.optional(),
  scoreHidden: SortOrderSchema.optional(),
  permalink: SortOrderSchema.optional(),
  createdUtc: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  scrapingSessionId: SortOrderSchema.optional()
}).strict();
export const CommentMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CommentMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentMinOrderByAggregateInput>;
export const CommentMinOrderByAggregateInputObjectZodSchema = makeSchema();
