import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PostArgsObjectSchema as PostArgsObjectSchema } from './PostArgs.schema';
import { CommentArgsObjectSchema as CommentArgsObjectSchema } from './CommentArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  post: z.union([z.boolean(), z.lazy(() => PostArgsObjectSchema)]).optional(),
  postId: z.boolean().optional(),
  comment: z.union([z.boolean(), z.lazy(() => CommentArgsObjectSchema)]).optional(),
  commentId: z.boolean().optional(),
  rawAiScore: z.boolean().optional(),
  extractedAt: z.boolean().optional(),
  model: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional()
}).strict();
export const SentimentExtractionSelectObjectSchema: z.ZodType<Prisma.SentimentExtractionSelect> = makeSchema() as unknown as z.ZodType<Prisma.SentimentExtractionSelect>;
export const SentimentExtractionSelectObjectZodSchema = makeSchema();
