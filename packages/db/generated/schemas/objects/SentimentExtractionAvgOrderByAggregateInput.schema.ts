import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  postId: SortOrderSchema.optional(),
  commentId: SortOrderSchema.optional(),
  rawAiScore: SortOrderSchema.optional()
}).strict();
export const SentimentExtractionAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.SentimentExtractionAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.SentimentExtractionAvgOrderByAggregateInput>;
export const SentimentExtractionAvgOrderByAggregateInputObjectZodSchema = makeSchema();
