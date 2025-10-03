import * as z from 'zod';

// prettier-ignore
export const ScrapingSessionInputSchema = z.object({
    id: z.number().int(),
    subreddit: z.string(),
    lastPostId: z.string().optional().nullable(),
    lastPostTimestamp: z.date().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type ScrapingSessionInputType = z.infer<typeof ScrapingSessionInputSchema>;
