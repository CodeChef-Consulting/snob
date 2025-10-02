import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { ScrapingSessionCountOrderByAggregateInputObjectSchema } from './ScrapingSessionCountOrderByAggregateInput.schema';
import { ScrapingSessionAvgOrderByAggregateInputObjectSchema } from './ScrapingSessionAvgOrderByAggregateInput.schema';
import { ScrapingSessionMaxOrderByAggregateInputObjectSchema } from './ScrapingSessionMaxOrderByAggregateInput.schema';
import { ScrapingSessionMinOrderByAggregateInputObjectSchema } from './ScrapingSessionMinOrderByAggregateInput.schema';
import { ScrapingSessionSumOrderByAggregateInputObjectSchema } from './ScrapingSessionSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  subreddit: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  lastScrapedAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  lastPostTimestamp: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  postsScraped: SortOrderSchema.optional(),
  commentsScraped: SortOrderSchema.optional(),
  errorMessage: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  metadata: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => ScrapingSessionCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => ScrapingSessionAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => ScrapingSessionMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => ScrapingSessionMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => ScrapingSessionSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const ScrapingSessionOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.ScrapingSessionOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.ScrapingSessionOrderByWithAggregationInput>;
export const ScrapingSessionOrderByWithAggregationInputObjectZodSchema = makeSchema();
