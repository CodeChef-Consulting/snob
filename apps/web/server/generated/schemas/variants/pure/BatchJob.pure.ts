import * as z from 'zod';

// prettier-ignore
export const BatchJobModelSchema = z.object({
    id: z.number().int(),
    geminiJobName: z.string().nullable(),
    displayName: z.string(),
    model: z.string(),
    contentType: z.string(),
    itemCount: z.number().int(),
    itemIds: z.unknown(),
    status: z.string(),
    submittedAt: z.date().nullable(),
    completedAt: z.date().nullable(),
    extractionsSaved: z.boolean(),
    extractionsSavedAt: z.date().nullable(),
    successCount: z.number().int(),
    errorCount: z.number().int(),
    error: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type BatchJobModelType = z.infer<typeof BatchJobModelSchema>;
