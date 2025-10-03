import * as z from 'zod';
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
  restaurantsMentioned: SortOrderSchema.optional(),
  createdUtc: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const CommentCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CommentCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentCountOrderByAggregateInput>;
export const CommentCountOrderByAggregateInputObjectZodSchema = makeSchema();
