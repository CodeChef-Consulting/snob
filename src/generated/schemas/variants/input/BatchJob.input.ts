import * as z from 'zod';

// prettier-ignore
export const BatchJobInputSchema = z.object({
    id: z.number().int(),
    geminiJobName: z.string().optional().nullable(),
    displayName: z.string(),
    model: z.string(),
    contentType: z.string(),
    itemCount: z.number().int(),
    itemIds: z.unknown(),
    status: z.string(),
    submittedAt: z.date().optional().nullable(),
    completedAt: z.date().optional().nullable(),
    extractionsSaved: z.boolean(),
    extractionsSavedAt: z.date().optional().nullable(),
    successCount: z.number().int(),
    errorCount: z.number().int(),
    error: z.string().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type BatchJobInputType = z.infer<typeof BatchJobInputSchema>;
