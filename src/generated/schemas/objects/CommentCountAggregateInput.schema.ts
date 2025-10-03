import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  externalId: z.literal(true).optional(),
  postId: z.literal(true).optional(),
  parentCommentId: z.literal(true).optional(),
  author: z.literal(true).optional(),
  body: z.literal(true).optional(),
  score: z.literal(true).optional(),
  createdUtc: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const CommentCountAggregateInputObjectSchema: z.ZodType<Prisma.CommentCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CommentCountAggregateInputType>;
export const CommentCountAggregateInputObjectZodSchema = makeSchema();
