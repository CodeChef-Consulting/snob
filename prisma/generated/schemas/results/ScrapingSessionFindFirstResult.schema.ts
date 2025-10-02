import * as z from 'zod';
export const ScrapingSessionFindFirstResultSchema = z.nullable(z.object({
  id: z.number().int(),
  subreddit: z.string(),
  restaurant: z.unknown().optional(),
  restaurantId: z.number().int().optional(),
  status: z.string(),
  lastScrapedAt: z.date().optional(),
  lastPostTimestamp: z.date().optional(),
  postsScraped: z.number().int(),
  commentsScraped: z.number().int(),
  errorMessage: z.string().optional(),
  metadata: z.unknown().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
}));