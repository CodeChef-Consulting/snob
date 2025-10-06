import * as z from 'zod';
export const ScrapingSessionFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.number().int(),
  subreddit: z.string(),
  mode: z.string(),
  timeframe: z.string().optional(),
  searchQuery: z.string().optional(),
  lastPostId: z.string().optional(),
  lastPostTimestamp: z.date().optional(),
  postsScraped: z.number().int(),
  commentsScraped: z.number().int(),
  completed: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date()
})),
  pagination: z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
})
});