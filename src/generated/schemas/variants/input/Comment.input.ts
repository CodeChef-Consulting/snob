import * as z from 'zod';

// prettier-ignore
export const CommentInputSchema = z.object({
    id: z.number().int(),
    externalId: z.string(),
    post: z.unknown(),
    postId: z.number().int(),
    parentComment: z.unknown().optional().nullable(),
    parentCommentId: z.number().int().optional().nullable(),
    replies: z.array(z.unknown()),
    author: z.string().optional().nullable(),
    body: z.string().optional().nullable(),
    score: z.number().int().optional().nullable(),
    createdUtc: z.date().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    files: z.array(z.unknown()),
    restaurantsMentioned: z.array(z.unknown())
}).strict();

export type CommentInputType = z.infer<typeof CommentInputSchema>;
