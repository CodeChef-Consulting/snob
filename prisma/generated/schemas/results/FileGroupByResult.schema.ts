import { z } from 'zod';
export const FileGroupByResultSchema = z.array(z.object({
  id: z.number().int(),
  postId: z.number().int(),
  commentId: z.number().int(),
  fileUrl: z.string(),
  fileType: z.string(),
  metadata: z.unknown(),
  createdAt: z.date(),
  _count: z.object({
    id: z.number(),
    post: z.number(),
    postId: z.number(),
    comment: z.number(),
    commentId: z.number(),
    fileUrl: z.number(),
    fileType: z.number(),
    metadata: z.number(),
    createdAt: z.number()
  }).optional(),
  _sum: z.object({
    id: z.number().nullable(),
    postId: z.number().nullable(),
    commentId: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    id: z.number().nullable(),
    postId: z.number().nullable(),
    commentId: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.number().int().nullable(),
    postId: z.number().int().nullable(),
    commentId: z.number().int().nullable(),
    fileUrl: z.string().nullable(),
    fileType: z.string().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.number().int().nullable(),
    postId: z.number().int().nullable(),
    commentId: z.number().int().nullable(),
    fileUrl: z.string().nullable(),
    fileType: z.string().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional()
}));