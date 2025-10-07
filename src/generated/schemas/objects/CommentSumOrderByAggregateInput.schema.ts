import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  postId: SortOrderSchema.optional(),
  parentCommentId: SortOrderSchema.optional(),
  score: SortOrderSchema.optional(),
  ups: SortOrderSchema.optional(),
  depth: SortOrderSchema.optional(),
  controversiality: SortOrderSchema.optional(),
  scrapingSessionId: SortOrderSchema.optional()
}).strict();
export const CommentSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CommentSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentSumOrderByAggregateInput>;
export const CommentSumOrderByAggregateInputObjectZodSchema = makeSchema();
