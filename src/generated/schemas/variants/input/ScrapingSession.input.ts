import * as z from 'zod';

// prettier-ignore
export const ScrapingSessionInputSchema = z.object({
    id: z.number().int(),
    subreddit: z.string(),
    status: z.string(),
    lastScrapedAt: z.date().optional().nullable(),
    lastPostTimestamp: z.date().optional().nullable(),
    postsScraped: z.number().int(),
    commentsScraped: z.number().int(),
    errorMessage: z.string().optional().nullable(),
    metadata: z.unknown().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type ScrapingSessionInputType = z.infer<typeof ScrapingSessionInputSchema>;
