import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PostCreateNestedOneWithoutCommentsInputObjectSchema as PostCreateNestedOneWithoutCommentsInputObjectSchema } from './PostCreateNestedOneWithoutCommentsInput.schema';
import { CommentCreateNestedOneWithoutRepliesInputObjectSchema as CommentCreateNestedOneWithoutRepliesInputObjectSchema } from './CommentCreateNestedOneWithoutRepliesInput.schema';
import { CommentCreateNestedManyWithoutParentCommentInputObjectSchema as CommentCreateNestedManyWithoutParentCommentInputObjectSchema } from './CommentCreateNestedManyWithoutParentCommentInput.schema';
import { FileCreateNestedManyWithoutCommentInputObjectSchema as FileCreateNestedManyWithoutCommentInputObjectSchema } from './FileCreateNestedManyWithoutCommentInput.schema'

const makeSchema = () => z.object({
  externalId: z.string(),
  author: z.string().optional().nullable(),
  body: z.string().optional().nullable(),
  score: z.number().int().optional().nullable(),
  createdUtc: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  post: z.lazy(() => PostCreateNestedOneWithoutCommentsInputObjectSchema),
  parentComment: z.lazy(() => CommentCreateNestedOneWithoutRepliesInputObjectSchema).optional(),
  replies: z.lazy(() => CommentCreateNestedManyWithoutParentCommentInputObjectSchema),
  files: z.lazy(() => FileCreateNestedManyWithoutCommentInputObjectSchema)
}).strict();
export const CommentCreateInputObjectSchema: z.ZodType<Prisma.CommentCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentCreateInput>;
export const CommentCreateInputObjectZodSchema = makeSchema();
