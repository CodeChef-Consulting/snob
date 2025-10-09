import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IntWithAggregatesFilterObjectSchema as IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { JsonWithAggregatesFilterObjectSchema as JsonWithAggregatesFilterObjectSchema } from './JsonWithAggregatesFilter.schema';
import { DateTimeNullableWithAggregatesFilterObjectSchema as DateTimeNullableWithAggregatesFilterObjectSchema } from './DateTimeNullableWithAggregatesFilter.schema';
import { BoolWithAggregatesFilterObjectSchema as BoolWithAggregatesFilterObjectSchema } from './BoolWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const batchjobscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => BatchJobScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => BatchJobScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => BatchJobScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => BatchJobScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => BatchJobScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  geminiJobName: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  displayName: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  model: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  contentType: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  itemCount: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  itemIds: z.lazy(() => JsonWithAggregatesFilterObjectSchema).optional(),
  status: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  submittedAt: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  completedAt: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  extractionsSaved: z.union([z.lazy(() => BoolWithAggregatesFilterObjectSchema), z.boolean()]).optional(),
  extractionsSavedAt: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  successCount: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  errorCount: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  error: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const BatchJobScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.BatchJobScalarWhereWithAggregatesInput> = batchjobscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.BatchJobScalarWhereWithAggregatesInput>;
export const BatchJobScalarWhereWithAggregatesInputObjectZodSchema = batchjobscalarwherewithaggregatesinputSchema;
