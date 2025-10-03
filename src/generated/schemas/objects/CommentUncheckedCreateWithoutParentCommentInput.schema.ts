import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentUncheckedCreateNestedManyWithoutParentCommentInputObjectSchema as CommentUncheckedCreateNestedManyWithoutParentCommentInputObjectSchema } from './CommentUncheckedCreateNestedManyWithoutParentCommentInput.schema';
import { FileUncheckedCreateNestedManyWithoutCommentInputObjectSchema as FileUncheckedCreateNestedManyWithoutCommentInputObjectSchema } from './FileUncheckedCreateNestedManyWithoutCommentInput.schema'

const makeSchema = () => z.object({
  id: z.number().int().optional(),
  externalId: z.string(),
  postId: z.number().int(),
  author: z.string().optional().nullable(),
  body: z.string().optional().nullable(),
  score: z.number().int().optional().nullable(),
  createdUtc: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  replies: z.lazy(() => CommentUncheckedCreateNestedManyWithoutParentCommentInputObjectSchema).optional(),
  files: z.lazy(() => FileUncheckedCreateNestedManyWithoutCommentInputObjectSchema).optional()
}).strict();
export const CommentUncheckedCreateWithoutParentCommentInputObjectSchema: z.ZodType<Prisma.CommentUncheckedCreateWithoutParentCommentInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentUncheckedCreateWithoutParentCommentInput>;
export const CommentUncheckedCreateWithoutParentCommentInputObjectZodSchema = makeSchema();
