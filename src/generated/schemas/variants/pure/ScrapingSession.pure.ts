import * as z from 'zod';

// prettier-ignore
export const ScrapingSessionModelSchema = z.object({
    id: z.number().int(),
    subreddit: z.string(),
    lastPostId: z.string().nullable(),
    lastPostTimestamp: z.date().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type ScrapingSessionModelType = z.infer<typeof ScrapingSessionModelSchema>;
