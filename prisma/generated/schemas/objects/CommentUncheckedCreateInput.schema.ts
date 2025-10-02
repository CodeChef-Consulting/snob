import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentUncheckedCreateNestedManyWithoutParentCommentInputObjectSchema } from './CommentUncheckedCreateNestedManyWithoutParentCommentInput.schema';
import { FileUncheckedCreateNestedManyWithoutCommentInputObjectSchema } from './FileUncheckedCreateNestedManyWithoutCommentInput.schema'

const makeSchema = () => z.object({
  id: z.number().int().optional(),
  externalId: z.string(),
  postId: z.number().int(),
  parentCommentId: z.number().int().optional().nullable(),
  author: z.string().optional().nullable(),
  body: z.string().optional().nullable(),
  score: z.number().int().optional().nullable(),
  createdUtc: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  replies: z.lazy(() => CommentUncheckedCreateNestedManyWithoutParentCommentInputObjectSchema),
  files: z.lazy(() => FileUncheckedCreateNestedManyWithoutCommentInputObjectSchema)
}).strict();
export const CommentUncheckedCreateInputObjectSchema: z.ZodType<Prisma.CommentUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentUncheckedCreateInput>;
export const CommentUncheckedCreateInputObjectZodSchema = makeSchema();
