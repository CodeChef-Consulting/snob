import * as z from 'zod';

// prettier-ignore
export const ScrapingSessionInputSchema = z.object({
    id: z.number().int(),
    subreddit: z.string(),
    mode: z.string(),
    timeframe: z.string().optional().nullable(),
    searchQuery: z.string().optional().nullable(),
    lastPostId: z.string().optional().nullable(),
    lastPostTimestamp: z.date().optional().nullable(),
    postsScraped: z.number().int(),
    commentsScraped: z.number().int(),
    completed: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
    posts: z.array(z.unknown()),
    comments: z.array(z.unknown())
}).strict();

export type ScrapingSessionInputType = z.infer<typeof ScrapingSessionInputSchema>;
