import * as z from 'zod';
export const ScrapingSessionDeleteResultSchema = z.nullable(z.object({
  id: z.number().int(),
  subreddit: z.string(),
  lastPostId: z.string().optional(),
  lastPostTimestamp: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
}));