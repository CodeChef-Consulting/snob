import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  geminiJobName: SortOrderSchema.optional(),
  displayName: SortOrderSchema.optional(),
  model: SortOrderSchema.optional(),
  contentType: SortOrderSchema.optional(),
  itemCount: SortOrderSchema.optional(),
  itemIds: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  submittedAt: SortOrderSchema.optional(),
  completedAt: SortOrderSchema.optional(),
  extractionsSaved: SortOrderSchema.optional(),
  extractionsSavedAt: SortOrderSchema.optional(),
  successCount: SortOrderSchema.optional(),
  errorCount: SortOrderSchema.optional(),
  error: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const BatchJobCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.BatchJobCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.BatchJobCountOrderByAggregateInput>;
export const BatchJobCountOrderByAggregateInputObjectZodSchema = makeSchema();
