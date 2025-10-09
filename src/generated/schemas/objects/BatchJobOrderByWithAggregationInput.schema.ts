import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { BatchJobCountOrderByAggregateInputObjectSchema as BatchJobCountOrderByAggregateInputObjectSchema } from './BatchJobCountOrderByAggregateInput.schema';
import { BatchJobAvgOrderByAggregateInputObjectSchema as BatchJobAvgOrderByAggregateInputObjectSchema } from './BatchJobAvgOrderByAggregateInput.schema';
import { BatchJobMaxOrderByAggregateInputObjectSchema as BatchJobMaxOrderByAggregateInputObjectSchema } from './BatchJobMaxOrderByAggregateInput.schema';
import { BatchJobMinOrderByAggregateInputObjectSchema as BatchJobMinOrderByAggregateInputObjectSchema } from './BatchJobMinOrderByAggregateInput.schema';
import { BatchJobSumOrderByAggregateInputObjectSchema as BatchJobSumOrderByAggregateInputObjectSchema } from './BatchJobSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  geminiJobName: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  displayName: SortOrderSchema.optional(),
  model: SortOrderSchema.optional(),
  contentType: SortOrderSchema.optional(),
  itemCount: SortOrderSchema.optional(),
  itemIds: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  submittedAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  completedAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  extractionsSaved: SortOrderSchema.optional(),
  extractionsSavedAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  successCount: SortOrderSchema.optional(),
  errorCount: SortOrderSchema.optional(),
  error: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => BatchJobCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => BatchJobAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => BatchJobMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => BatchJobMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => BatchJobSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const BatchJobOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.BatchJobOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.BatchJobOrderByWithAggregationInput>;
export const BatchJobOrderByWithAggregationInputObjectZodSchema = makeSchema();
