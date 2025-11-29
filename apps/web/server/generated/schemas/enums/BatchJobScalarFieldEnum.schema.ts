import * as z from 'zod';

export const BatchJobScalarFieldEnumSchema = z.enum(['id', 'geminiJobName', 'displayName', 'model', 'contentType', 'itemCount', 'itemIds', 'status', 'submittedAt', 'completedAt', 'extractionsSaved', 'extractionsSavedAt', 'successCount', 'errorCount', 'error', 'createdAt', 'updatedAt'])

export type BatchJobScalarFieldEnum = z.infer<typeof BatchJobScalarFieldEnumSchema>;