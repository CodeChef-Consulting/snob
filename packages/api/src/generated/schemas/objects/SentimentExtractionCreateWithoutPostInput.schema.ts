import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentCreateNestedOneWithoutSentimentExtractionInputObjectSchema as CommentCreateNestedOneWithoutSentimentExtractionInputObjectSchema } from './CommentCreateNestedOneWithoutSentimentExtractionInput.schema'

const makeSchema = () => z.object({
  rawAiScore: z.number().optional().nullable(),
  extractedAt: z.coerce.date().optional(),
  model: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  comment: z.lazy(() => CommentCreateNestedOneWithoutSentimentExtractionInputObjectSchema).optional()
}).strict();
export const SentimentExtractionCreateWithoutPostInputObjectSchema: z.ZodType<Prisma.SentimentExtractionCreateWithoutPostInput> = makeSchema() as unknown as z.ZodType<Prisma.SentimentExtractionCreateWithoutPostInput>;
export const SentimentExtractionCreateWithoutPostInputObjectZodSchema = makeSchema();
