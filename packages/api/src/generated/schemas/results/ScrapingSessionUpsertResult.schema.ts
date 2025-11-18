import * as z from 'zod';
export const ScrapingSessionUpsertResultSchema = z.object({
  id: z.number().int(),
  subreddit: z.string(),
  mode: z.string(),
  timeframe: z.string().optional(),
  searchQuery: z.string().optional(),
  lastPostId: z.string().optional(),
  lastPostTimestamp: z.date().optional(),
  postsScraped: z.number().int(),
  completed: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  posts: z.array(z.unknown()),
  comments: z.array(z.unknown())
});