import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  postId: z.literal(true).optional(),
  parentCommentId: z.literal(true).optional(),
  score: z.literal(true).optional(),
  ups: z.literal(true).optional(),
  depth: z.literal(true).optional(),
  controversiality: z.literal(true).optional(),
  scrapingSessionId: z.literal(true).optional()
}).strict();
export const CommentAvgAggregateInputObjectSchema: z.ZodType<Prisma.CommentAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CommentAvgAggregateInputType>;
export const CommentAvgAggregateInputObjectZodSchema = makeSchema();
