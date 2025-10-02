import { z } from 'zod';
export const ScrapingSessionCreateResultSchema = z.object({
  id: z.number().int(),
  subreddit: z.string(),
  status: z.string(),
  lastScrapedAt: z.date().optional(),
  lastPostTimestamp: z.date().optional(),
  postsScraped: z.number().int(),
  commentsScraped: z.number().int(),
  errorMessage: z.string().optional(),
  metadata: z.unknown().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
});