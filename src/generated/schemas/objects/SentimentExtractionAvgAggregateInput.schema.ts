import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  postId: z.literal(true).optional(),
  commentId: z.literal(true).optional(),
  rawAiScore: z.literal(true).optional()
}).strict();
export const SentimentExtractionAvgAggregateInputObjectSchema: z.ZodType<Prisma.SentimentExtractionAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.SentimentExtractionAvgAggregateInputType>;
export const SentimentExtractionAvgAggregateInputObjectZodSchema = makeSchema();
