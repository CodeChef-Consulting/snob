import * as z from 'zod';
export const SentimentExtractionGroupByResultSchema = z.array(z.object({
  id: z.number().int(),
  postId: z.number().int(),
  commentId: z.number().int(),
  rawAiScore: z.number(),
  extractedAt: z.date(),
  model: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    post: z.number(),
    postId: z.number(),
    comment: z.number(),
    commentId: z.number(),
    rawAiScore: z.number(),
    extractedAt: z.number(),
    model: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _sum: z.object({
    id: z.number().nullable(),
    postId: z.number().nullable(),
    commentId: z.number().nullable(),
    rawAiScore: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    id: z.number().nullable(),
    postId: z.number().nullable(),
    commentId: z.number().nullable(),
    rawAiScore: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.number().int().nullable(),
    postId: z.number().int().nullable(),
    commentId: z.number().int().nullable(),
    rawAiScore: z.number().nullable(),
    extractedAt: z.date().nullable(),
    model: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.number().int().nullable(),
    postId: z.number().int().nullable(),
    commentId: z.number().int().nullable(),
    rawAiScore: z.number().nullable(),
    extractedAt: z.date().nullable(),
    model: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
}));