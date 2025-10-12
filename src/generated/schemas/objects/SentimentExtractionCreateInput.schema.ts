import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PostCreateNestedOneWithoutSentimentExtractionInputObjectSchema as PostCreateNestedOneWithoutSentimentExtractionInputObjectSchema } from './PostCreateNestedOneWithoutSentimentExtractionInput.schema';
import { CommentCreateNestedOneWithoutSentimentExtractionInputObjectSchema as CommentCreateNestedOneWithoutSentimentExtractionInputObjectSchema } from './CommentCreateNestedOneWithoutSentimentExtractionInput.schema'

const makeSchema = () => z.object({
  rawAiScore: z.number(),
  extractedAt: z.coerce.date().optional(),
  model: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  post: z.lazy(() => PostCreateNestedOneWithoutSentimentExtractionInputObjectSchema).optional(),
  comment: z.lazy(() => CommentCreateNestedOneWithoutSentimentExtractionInputObjectSchema).optional()
}).strict();
export const SentimentExtractionCreateInputObjectSchema: z.ZodType<Prisma.SentimentExtractionCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.SentimentExtractionCreateInput>;
export const SentimentExtractionCreateInputObjectZodSchema = makeSchema();
