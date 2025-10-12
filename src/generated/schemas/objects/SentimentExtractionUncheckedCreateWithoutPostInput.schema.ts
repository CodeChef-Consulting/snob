import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.number().int().optional(),
  commentId: z.number().int().optional().nullable(),
  rawAiScore: z.number(),
  extractedAt: z.coerce.date().optional(),
  model: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const SentimentExtractionUncheckedCreateWithoutPostInputObjectSchema: z.ZodType<Prisma.SentimentExtractionUncheckedCreateWithoutPostInput> = makeSchema() as unknown as z.ZodType<Prisma.SentimentExtractionUncheckedCreateWithoutPostInput>;
export const SentimentExtractionUncheckedCreateWithoutPostInputObjectZodSchema = makeSchema();
