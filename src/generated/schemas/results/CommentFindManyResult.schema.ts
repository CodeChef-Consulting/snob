import * as z from 'zod';
export const CommentFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.number().int(),
  externalId: z.string(),
  post: z.unknown(),
  postId: z.number().int(),
  parentComment: z.unknown().optional(),
  parentCommentId: z.number().int().optional(),
  replies: z.array(z.unknown()),
  author: z.string().optional(),
  body: z.string().optional(),
  score: z.number().int().optional(),
  ups: z.number().int().optional(),
  depth: z.number().int().optional(),
  controversiality: z.number().int().optional(),
  isSubmitter: z.boolean().optional(),
  scoreHidden: z.boolean().optional(),
  permalink: z.string().optional(),
  createdUtc: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  scrapingSession: z.unknown().optional(),
  scrapingSessionId: z.number().int().optional(),
  files: z.array(z.unknown()),
  restaurantsMentioned: z.array(z.unknown()),
  restaurantExtraction: z.unknown().optional()
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