import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.boolean().optional(),
  geminiJobName: z.boolean().optional(),
  displayName: z.boolean().optional(),
  model: z.boolean().optional(),
  contentType: z.boolean().optional(),
  itemCount: z.boolean().optional(),
  itemIds: z.boolean().optional(),
  status: z.boolean().optional(),
  submittedAt: z.boolean().optional(),
  completedAt: z.boolean().optional(),
  extractionsSaved: z.boolean().optional(),
  extractionsSavedAt: z.boolean().optional(),
  successCount: z.boolean().optional(),
  errorCount: z.boolean().optional(),
  error: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional()
}).strict();
export const BatchJobSelectObjectSchema: z.ZodType<Prisma.BatchJobSelect> = makeSchema() as unknown as z.ZodType<Prisma.BatchJobSelect>;
export const BatchJobSelectObjectZodSchema = makeSchema();
