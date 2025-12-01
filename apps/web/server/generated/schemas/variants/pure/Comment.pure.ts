import * as z from 'zod';

// prettier-ignore
export const CommentModelSchema = z.object({
    id: z.number().int(),
    externalId: z.string(),
    post: z.unknown(),
    postId: z.number().int(),
    parentComment: z.unknown().nullable(),
    parentCommentId: z.number().int().nullable(),
    parentExternalId: z.string().nullable(),
    replies: z.array(z.unknown()),
    author: z.string().nullable(),
    body: z.string().nullable(),
    score: z.number().int().nullable(),
    ups: z.number().int().nullable(),
    depth: z.number().int().nullable(),
    controversiality: z.number().int().nullable(),
    isSubmitter: z.boolean().nullable(),
    scoreHidden: z.boolean().nullable(),
    permalink: z.string().nullable(),
    createdUtc: z.date().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    scrapingSession: z.unknown().nullable(),
    scrapingSessionId: z.number().int().nullable(),
    files: z.array(z.unknown()),
    restaurantGroupsMentioned: z.array(z.unknown()),
    restaurantExtraction: z.unknown().nullable(),
    sentimentExtraction: z.unknown().nullable()
}).strict();

export type CommentModelType = z.infer<typeof CommentModelSchema>;
