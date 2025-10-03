import * as z from 'zod';

// prettier-ignore
export const ScrapingSessionResultSchema = z.object({
    id: z.number().int(),
    subreddit: z.string(),
    lastPostId: z.string().nullable(),
    lastPostTimestamp: z.date().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type ScrapingSessionResultType = z.infer<typeof ScrapingSessionResultSchema>;
