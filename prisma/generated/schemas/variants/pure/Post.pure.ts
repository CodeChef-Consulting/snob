import { z } from 'zod';

// prettier-ignore
export const PostModelSchema = z.object({
    id: z.number().int(),
    externalId: z.string(),
    subreddit: z.string(),
    author: z.string().nullable(),
    title: z.string().nullable(),
    body: z.string().nullable(),
    score: z.number().int().nullable(),
    upvoteRatio: z.number().nullable(),
    numComments: z.number().int().nullable(),
    url: z.string().nullable(),
    createdUtc: z.date().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    restaurant: z.unknown().nullable(),
    restaurantId: z.number().int().nullable(),
    comments: z.array(z.unknown()),
    files: z.array(z.unknown())
}).strict();

export type PostModelType = z.infer<typeof PostModelSchema>;
