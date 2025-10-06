import * as z from 'zod';

// prettier-ignore
export const ScrapingSessionModelSchema = z.object({
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
    updatedAt: z.date()
}).strict();

export type ScrapingSessionModelType = z.infer<typeof ScrapingSessionModelSchema>;
