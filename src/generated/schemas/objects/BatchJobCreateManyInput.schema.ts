import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.number().int().optional(),
  geminiJobName: z.string().optional().nullable(),
  displayName: z.string(),
  model: z.string(),
  contentType: z.string(),
  itemCount: z.number().int(),
  itemIds: z.union([JsonNullValueInputSchema, jsonSchema]),
  status: z.string().optional(),
  submittedAt: z.coerce.date().optional().nullable(),
  completedAt: z.coerce.date().optional().nullable(),
  extractionsSaved: z.boolean().optional(),
  extractionsSavedAt: z.coerce.date().optional().nullable(),
  successCount: z.number().int().optional(),
  errorCount: z.number().int().optional(),
  error: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const BatchJobCreateManyInputObjectSchema: z.ZodType<Prisma.BatchJobCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.BatchJobCreateManyInput>;
export const BatchJobCreateManyInputObjectZodSchema = makeSchema();
