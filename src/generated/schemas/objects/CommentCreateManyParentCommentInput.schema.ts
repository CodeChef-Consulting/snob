import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.number().int().optional(),
  externalId: z.string(),
  postId: z.number().int(),
  author: z.string().optional().nullable(),
  body: z.string().optional().nullable(),
  score: z.number().int().optional().nullable(),
  createdUtc: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const CommentCreateManyParentCommentInputObjectSchema: z.ZodType<Prisma.CommentCreateManyParentCommentInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentCreateManyParentCommentInput>;
export const CommentCreateManyParentCommentInputObjectZodSchema = makeSchema();
