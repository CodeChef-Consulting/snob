import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PostArgsObjectSchema } from './PostArgs.schema';
import { CommentArgsObjectSchema } from './CommentArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  post: z.union([z.boolean(), z.lazy(() => PostArgsObjectSchema)]).optional(),
  postId: z.boolean().optional(),
  comment: z.union([z.boolean(), z.lazy(() => CommentArgsObjectSchema)]).optional(),
  commentId: z.boolean().optional(),
  fileUrl: z.boolean().optional(),
  fileType: z.boolean().optional(),
  metadata: z.boolean().optional(),
  createdAt: z.boolean().optional()
}).strict();
export const FileSelectObjectSchema: z.ZodType<Prisma.FileSelect> = makeSchema() as unknown as z.ZodType<Prisma.FileSelect>;
export const FileSelectObjectZodSchema = makeSchema();
