import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { JsonFilterObjectSchema as JsonFilterObjectSchema } from './JsonFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const batchjobwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => BatchJobWhereInputObjectSchema), z.lazy(() => BatchJobWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => BatchJobWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => BatchJobWhereInputObjectSchema), z.lazy(() => BatchJobWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  geminiJobName: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  displayName: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  model: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  contentType: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  itemCount: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  itemIds: z.lazy(() => JsonFilterObjectSchema).optional(),
  status: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  submittedAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  completedAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  extractionsSaved: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  extractionsSavedAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  successCount: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  errorCount: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  error: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const BatchJobWhereInputObjectSchema: z.ZodType<Prisma.BatchJobWhereInput> = batchjobwhereinputSchema as unknown as z.ZodType<Prisma.BatchJobWhereInput>;
export const BatchJobWhereInputObjectZodSchema = batchjobwhereinputSchema;
