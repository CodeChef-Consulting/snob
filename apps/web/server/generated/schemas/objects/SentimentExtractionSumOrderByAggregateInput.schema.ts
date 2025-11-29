import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  postId: SortOrderSchema.optional(),
  commentId: SortOrderSchema.optional(),
  rawAiScore: SortOrderSchema.optional()
}).strict();
export const SentimentExtractionSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.SentimentExtractionSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.SentimentExtractionSumOrderByAggregateInput>;
export const SentimentExtractionSumOrderByAggregateInputObjectZodSchema = makeSchema();
