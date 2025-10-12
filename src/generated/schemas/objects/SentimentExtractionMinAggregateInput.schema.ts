import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  postId: z.literal(true).optional(),
  commentId: z.literal(true).optional(),
  rawAiScore: z.literal(true).optional(),
  extractedAt: z.literal(true).optional(),
  model: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const SentimentExtractionMinAggregateInputObjectSchema: z.ZodType<Prisma.SentimentExtractionMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.SentimentExtractionMinAggregateInputType>;
export const SentimentExtractionMinAggregateInputObjectZodSchema = makeSchema();
