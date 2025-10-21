import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { SentimentExtractionCountOrderByAggregateInputObjectSchema as SentimentExtractionCountOrderByAggregateInputObjectSchema } from './SentimentExtractionCountOrderByAggregateInput.schema';
import { SentimentExtractionAvgOrderByAggregateInputObjectSchema as SentimentExtractionAvgOrderByAggregateInputObjectSchema } from './SentimentExtractionAvgOrderByAggregateInput.schema';
import { SentimentExtractionMaxOrderByAggregateInputObjectSchema as SentimentExtractionMaxOrderByAggregateInputObjectSchema } from './SentimentExtractionMaxOrderByAggregateInput.schema';
import { SentimentExtractionMinOrderByAggregateInputObjectSchema as SentimentExtractionMinOrderByAggregateInputObjectSchema } from './SentimentExtractionMinOrderByAggregateInput.schema';
import { SentimentExtractionSumOrderByAggregateInputObjectSchema as SentimentExtractionSumOrderByAggregateInputObjectSchema } from './SentimentExtractionSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  postId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  commentId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  rawAiScore: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  extractedAt: SortOrderSchema.optional(),
  model: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => SentimentExtractionCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => SentimentExtractionAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => SentimentExtractionMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => SentimentExtractionMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => SentimentExtractionSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const SentimentExtractionOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.SentimentExtractionOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.SentimentExtractionOrderByWithAggregationInput>;
export const SentimentExtractionOrderByWithAggregationInputObjectZodSchema = makeSchema();
