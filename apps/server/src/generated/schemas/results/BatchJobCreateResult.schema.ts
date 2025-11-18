import * as z from 'zod';
export const BatchJobCreateResultSchema = z.object({
  id: z.number().int(),
  geminiJobName: z.string().optional(),
  displayName: z.string(),
  model: z.string(),
  contentType: z.string(),
  itemCount: z.number().int(),
  itemIds: z.unknown(),
  status: z.string(),
  submittedAt: z.date().optional(),
  completedAt: z.date().optional(),
  extractionsSaved: z.boolean(),
  extractionsSavedAt: z.date().optional(),
  successCount: z.number().int(),
  errorCount: z.number().int(),
  error: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
});