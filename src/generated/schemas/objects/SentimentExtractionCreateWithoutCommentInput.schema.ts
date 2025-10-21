import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PostCreateNestedOneWithoutSentimentExtractionInputObjectSchema as PostCreateNestedOneWithoutSentimentExtractionInputObjectSchema } from './PostCreateNestedOneWithoutSentimentExtractionInput.schema'

const makeSchema = () => z.object({
  rawAiScore: z.number().optional().nullable(),
  extractedAt: z.coerce.date().optional(),
  model: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  post: z.lazy(() => PostCreateNestedOneWithoutSentimentExtractionInputObjectSchema).optional()
}).strict();
export const SentimentExtractionCreateWithoutCommentInputObjectSchema: z.ZodType<Prisma.SentimentExtractionCreateWithoutCommentInput> = makeSchema() as unknown as z.ZodType<Prisma.SentimentExtractionCreateWithoutCommentInput>;
export const SentimentExtractionCreateWithoutCommentInputObjectZodSchema = makeSchema();
