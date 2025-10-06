import * as z from 'zod';
export const CommentFindUniqueResultSchema = z.nullable(z.object({
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
  createdUtc: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  scrapingSession: z.unknown().optional(),
  scrapingSessionId: z.number().int().optional(),
  files: z.array(z.unknown()),
  restaurantsMentioned: z.array(z.unknown())
}));