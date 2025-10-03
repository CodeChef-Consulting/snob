import * as z from 'zod';

// prettier-ignore
export const FileInputSchema = z.object({
    id: z.number().int(),
    post: z.unknown().optional().nullable(),
    postId: z.number().int().optional().nullable(),
    comment: z.unknown().optional().nullable(),
    commentId: z.number().int().optional().nullable(),
    fileUrl: z.string(),
    fileType: z.string(),
    metadata: z.unknown().optional().nullable(),
    createdAt: z.date()
}).strict();

export type FileInputType = z.infer<typeof FileInputSchema>;
