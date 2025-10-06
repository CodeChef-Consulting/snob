import * as z from 'zod';

// prettier-ignore
export const PostInputSchema = z.object({
    id: z.number().int(),
    externalId: z.string(),
    subreddit: z.string(),
    author: z.string().optional().nullable(),
    title: z.string().optional().nullable(),
    body: z.string().optional().nullable(),
    score: z.number().int().optional().nullable(),
    upvoteRatio: z.number().optional().nullable(),
    numComments: z.number().int().optional().nullable(),
    url: z.string().optional().nullable(),
    createdUtc: z.date().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    scrapingSession: z.unknown().optional().nullable(),
    scrapingSessionId: z.number().int().optional().nullable(),
    comments: z.array(z.unknown()),
    files: z.array(z.unknown()),
    restaurantsMentioned: z.array(z.unknown())
}).strict();

export type PostInputType = z.infer<typeof PostInputSchema>;
