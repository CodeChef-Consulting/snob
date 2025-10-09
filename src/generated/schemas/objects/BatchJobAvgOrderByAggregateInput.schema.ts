import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  itemCount: SortOrderSchema.optional(),
  successCount: SortOrderSchema.optional(),
  errorCount: SortOrderSchema.optional()
}).strict();
export const BatchJobAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.BatchJobAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.BatchJobAvgOrderByAggregateInput>;
export const BatchJobAvgOrderByAggregateInputObjectZodSchema = makeSchema();
