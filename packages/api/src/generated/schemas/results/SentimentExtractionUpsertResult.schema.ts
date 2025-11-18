import * as z from 'zod';
export const SentimentExtractionUpsertResultSchema = z.object({
  id: z.number().int(),
  post: z.unknown().optional(),
  postId: z.number().int().optional(),
  comment: z.unknown().optional(),
  commentId: z.number().int().optional(),
  rawAiScore: z.number().optional(),
  extractedAt: z.date(),
  model: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
});