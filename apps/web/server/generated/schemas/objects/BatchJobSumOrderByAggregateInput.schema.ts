import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  itemCount: SortOrderSchema.optional(),
  successCount: SortOrderSchema.optional(),
  errorCount: SortOrderSchema.optional()
}).strict();
export const BatchJobSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.BatchJobSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.BatchJobSumOrderByAggregateInput>;
export const BatchJobSumOrderByAggregateInputObjectZodSchema = makeSchema();
