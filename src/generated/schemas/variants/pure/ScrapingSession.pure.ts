import { z } from 'zod';

// prettier-ignore
export const ScrapingSessionModelSchema = z.object({
    id: z.number().int(),
    subreddit: z.string(),
    status: z.string(),
    lastScrapedAt: z.date().nullable(),
    lastPostTimestamp: z.date().nullable(),
    postsScraped: z.number().int(),
    commentsScraped: z.number().int(),
    errorMessage: z.string().nullable(),
    metadata: z.unknown().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type ScrapingSessionModelType = z.infer<typeof ScrapingSessionModelSchema>;
