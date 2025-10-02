import { z } from 'zod';
export const PostCreateResultSchema = z.object({
  id: z.number().int(),
  externalId: z.string(),
  subreddit: z.string(),
  author: z.string().optional(),
  title: z.string().optional(),
  body: z.string().optional(),
  score: z.number().int().optional(),
  upvoteRatio: z.number().optional(),
  numComments: z.number().int().optional(),
  url: z.string().optional(),
  createdUtc: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  restaurant: z.unknown().optional(),
  restaurantId: z.number().int().optional(),
  comments: z.array(z.unknown()),
  files: z.array(z.unknown())
});