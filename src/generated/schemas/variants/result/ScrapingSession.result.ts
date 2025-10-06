import * as z from 'zod';

// prettier-ignore
export const ScrapingSessionResultSchema = z.object({
    id: z.number().int(),
    subreddit: z.string(),
    mode: z.string(),
    timeframe: z.string().nullable(),
    searchQuery: z.string().nullable(),
    lastPostId: z.string().nullable(),
    lastPostTimestamp: z.date().nullable(),
    postsScraped: z.number().int(),
    commentsScraped: z.number().int(),
    completed: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
    posts: z.array(z.unknown()),
    comments: z.array(z.unknown())
}).strict();

export type ScrapingSessionResultType = z.infer<typeof ScrapingSessionResultSchema>;
