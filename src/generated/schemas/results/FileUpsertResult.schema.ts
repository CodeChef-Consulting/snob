import { z } from 'zod';
export const FileUpsertResultSchema = z.object({
  id: z.number().int(),
  post: z.unknown().optional(),
  postId: z.number().int().optional(),
  comment: z.unknown().optional(),
  commentId: z.number().int().optional(),
  fileUrl: z.string(),
  fileType: z.string(),
  metadata: z.unknown().optional(),
  createdAt: z.date()
});