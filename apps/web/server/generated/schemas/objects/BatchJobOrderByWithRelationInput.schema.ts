import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema'

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
  updatedAt: SortOrderSchema.optional()
}).strict();
export const BatchJobOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.BatchJobOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.BatchJobOrderByWithRelationInput>;
export const BatchJobOrderByWithRelationInputObjectZodSchema = makeSchema();
