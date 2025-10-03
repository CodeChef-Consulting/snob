import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  postId: z.literal(true).optional(),
  parentCommentId: z.literal(true).optional(),
  score: z.literal(true).optional()
}).strict();
export const CommentSumAggregateInputObjectSchema: z.ZodType<Prisma.CommentSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CommentSumAggregateInputType>;
export const CommentSumAggregateInputObjectZodSchema = makeSchema();
