import { z } from 'zod';

// prettier-ignore
export const CommentResultSchema = z.object({
    id: z.number().int(),
    externalId: z.string(),
    post: z.unknown(),
    postId: z.number().int(),
    parentComment: z.unknown().nullable(),
    parentCommentId: z.number().int().nullable(),
    replies: z.array(z.unknown()),
    author: z.string().nullable(),
    body: z.string().nullable(),
    score: z.number().int().nullable(),
    createdUtc: z.date().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    files: z.array(z.unknown())
}).strict();

export type CommentResultType = z.infer<typeof CommentResultSchema>;
