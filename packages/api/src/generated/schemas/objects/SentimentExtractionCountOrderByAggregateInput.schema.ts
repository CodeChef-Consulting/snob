import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  postId: SortOrderSchema.optional(),
  commentId: SortOrderSchema.optional(),
  rawAiScore: SortOrderSchema.optional(),
  extractedAt: SortOrderSchema.optional(),
  model: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const SentimentExtractionCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.SentimentExtractionCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.SentimentExtractionCountOrderByAggregateInput>;
export const SentimentExtractionCountOrderByAggregateInputObjectZodSchema = makeSchema();
