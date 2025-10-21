import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.number().int().optional(),
  postId: z.number().int().optional().nullable(),
  commentId: z.number().int().optional().nullable(),
  rawAiScore: z.number().optional().nullable(),
  extractedAt: z.coerce.date().optional(),
  model: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();
export const SentimentExtractionUncheckedCreateInputObjectSchema: z.ZodType<Prisma.SentimentExtractionUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.SentimentExtractionUncheckedCreateInput>;
export const SentimentExtractionUncheckedCreateInputObjectZodSchema = makeSchema();
