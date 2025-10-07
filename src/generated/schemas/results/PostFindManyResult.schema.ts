import * as z from 'zod';
export const PostFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.number().int(),
  externalId: z.string(),
  subreddit: z.string(),
  author: z.string().optional(),
  title: z.string().optional(),
  body: z.string().optional(),
  score: z.number().int().optional(),
  ups: z.number().int().optional(),
  downs: z.number().int().optional(),
  upvoteRatio: z.number().optional(),
  numComments: z.number().int().optional(),
  gilded: z.number().int().optional(),
  permalink: z.string().optional(),
  createdUtc: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  scrapingSession: z.unknown().optional(),
  scrapingSessionId: z.number().int().optional(),
  comments: z.array(z.unknown()),
  files: z.array(z.unknown()),
  restaurantsMentioned: z.array(z.unknown())
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