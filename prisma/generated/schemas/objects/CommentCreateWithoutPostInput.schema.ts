import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentCreateNestedOneWithoutRepliesInputObjectSchema } from './CommentCreateNestedOneWithoutRepliesInput.schema';
import { CommentCreateNestedManyWithoutParentCommentInputObjectSchema } from './CommentCreateNestedManyWithoutParentCommentInput.schema';
import { FileCreateNestedManyWithoutCommentInputObjectSchema } from './FileCreateNestedManyWithoutCommentInput.schema'

const makeSchema = () => z.object({
  externalId: z.string(),
  author: z.string().optional().nullable(),
  body: z.string().optional().nullable(),
  score: z.number().int().optional().nullable(),
  createdUtc: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  parentComment: z.lazy(() => CommentCreateNestedOneWithoutRepliesInputObjectSchema).optional(),
  replies: z.lazy(() => CommentCreateNestedManyWithoutParentCommentInputObjectSchema).optional(),
  files: z.lazy(() => FileCreateNestedManyWithoutCommentInputObjectSchema).optional()
}).strict();
export const CommentCreateWithoutPostInputObjectSchema: z.ZodType<Prisma.CommentCreateWithoutPostInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentCreateWithoutPostInput>;
export const CommentCreateWithoutPostInputObjectZodSchema = makeSchema();
