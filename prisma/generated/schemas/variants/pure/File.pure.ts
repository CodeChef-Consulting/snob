import * as z from 'zod';

// prettier-ignore
export const FileModelSchema = z.object({
    id: z.number().int(),
    post: z.unknown().nullable(),
    postId: z.number().int().nullable(),
    comment: z.unknown().nullable(),
    commentId: z.number().int().nullable(),
    fileUrl: z.string(),
    fileType: z.string(),
    metadata: z.unknown().nullable(),
    createdAt: z.date()
}).strict();

export type FileModelType = z.infer<typeof FileModelSchema>;
