import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentCreaterestaurantsMentionedInputObjectSchema as CommentCreaterestaurantsMentionedInputObjectSchema } from './CommentCreaterestaurantsMentionedInput.schema';
import { PostCreateNestedOneWithoutCommentsInputObjectSchema as PostCreateNestedOneWithoutCommentsInputObjectSchema } from './PostCreateNestedOneWithoutCommentsInput.schema';
import { CommentCreateNestedManyWithoutParentCommentInputObjectSchema as CommentCreateNestedManyWithoutParentCommentInputObjectSchema } from './CommentCreateNestedManyWithoutParentCommentInput.schema';
import { FileCreateNestedManyWithoutCommentInputObjectSchema as FileCreateNestedManyWithoutCommentInputObjectSchema } from './FileCreateNestedManyWithoutCommentInput.schema'

const makeSchema = () => z.object({
  externalId: z.string(),
  author: z.string().optional().nullable(),
  body: z.string().optional().nullable(),
  score: z.number().int().optional().nullable(),
  restaurantsMentioned: z.union([z.lazy(() => CommentCreaterestaurantsMentionedInputObjectSchema), z.string().array()]).optional(),
  createdUtc: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  post: z.lazy(() => PostCreateNestedOneWithoutCommentsInputObjectSchema),
  replies: z.lazy(() => CommentCreateNestedManyWithoutParentCommentInputObjectSchema).optional(),
  files: z.lazy(() => FileCreateNestedManyWithoutCommentInputObjectSchema).optional()
}).strict();
export const CommentCreateWithoutParentCommentInputObjectSchema: z.ZodType<Prisma.CommentCreateWithoutParentCommentInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentCreateWithoutParentCommentInput>;
export const CommentCreateWithoutParentCommentInputObjectZodSchema = makeSchema();
