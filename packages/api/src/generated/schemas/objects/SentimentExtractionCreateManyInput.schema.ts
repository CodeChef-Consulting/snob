import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.number().int().optional(),
  postId: z.number().int().optional().nullable(),
  commentId: z.number().int().optional().nullable(),
  rawAiScore: z.number().optional().nullable(),
  extractedAt: z.coerce.date().optional(),
  model: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const SentimentExtractionCreateManyInputObjectSchema: z.ZodType<Prisma.SentimentExtractionCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.SentimentExtractionCreateManyInput>;
export const SentimentExtractionCreateManyInputObjectZodSchema = makeSchema();
