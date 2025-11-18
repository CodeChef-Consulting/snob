import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  postId: z.literal(true).optional(),
  commentId: z.literal(true).optional(),
  rawAiScore: z.literal(true).optional()
}).strict();
export const SentimentExtractionSumAggregateInputObjectSchema: z.ZodType<Prisma.SentimentExtractionSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.SentimentExtractionSumAggregateInputType>;
export const SentimentExtractionSumAggregateInputObjectZodSchema = makeSchema();
