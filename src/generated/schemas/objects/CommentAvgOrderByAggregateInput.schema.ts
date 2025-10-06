import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  postId: SortOrderSchema.optional(),
  parentCommentId: SortOrderSchema.optional(),
  score: SortOrderSchema.optional(),
  scrapingSessionId: SortOrderSchema.optional()
}).strict();
export const CommentAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CommentAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentAvgOrderByAggregateInput>;
export const CommentAvgOrderByAggregateInputObjectZodSchema = makeSchema();
