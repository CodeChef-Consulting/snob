import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  geminiJobName: z.literal(true).optional(),
  displayName: z.literal(true).optional(),
  model: z.literal(true).optional(),
  contentType: z.literal(true).optional(),
  itemCount: z.literal(true).optional(),
  status: z.literal(true).optional(),
  submittedAt: z.literal(true).optional(),
  completedAt: z.literal(true).optional(),
  extractionsSaved: z.literal(true).optional(),
  extractionsSavedAt: z.literal(true).optional(),
  successCount: z.literal(true).optional(),
  errorCount: z.literal(true).optional(),
  error: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const BatchJobMaxAggregateInputObjectSchema: z.ZodType<Prisma.BatchJobMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.BatchJobMaxAggregateInputType>;
export const BatchJobMaxAggregateInputObjectZodSchema = makeSchema();
