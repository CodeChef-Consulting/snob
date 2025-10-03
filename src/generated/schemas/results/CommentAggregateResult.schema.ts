import * as z from 'zod';
export const CommentAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    externalId: z.number(),
    post: z.number(),
    postId: z.number(),
    parentComment: z.number(),
    parentCommentId: z.number(),
    replies: z.number(),
    author: z.number(),
    body: z.number(),
    score: z.number(),
    createdUtc: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    files: z.number()
  }).optional(),
  _sum: z.object({
    id: z.number().nullable(),
    postId: z.number().nullable(),
    parentCommentId: z.number().nullable(),
    score: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    id: z.number().nullable(),
    postId: z.number().nullable(),
    parentCommentId: z.number().nullable(),
    score: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.number().int().nullable(),
    externalId: z.string().nullable(),
    postId: z.number().int().nullable(),
    parentCommentId: z.number().int().nullable(),
    author: z.string().nullable(),
    body: z.string().nullable(),
    score: z.number().int().nullable(),
    createdUtc: z.date().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.number().int().nullable(),
    externalId: z.string().nullable(),
    postId: z.number().int().nullable(),
    parentCommentId: z.number().int().nullable(),
    author: z.string().nullable(),
    body: z.string().nullable(),
    score: z.number().int().nullable(),
    createdUtc: z.date().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()});