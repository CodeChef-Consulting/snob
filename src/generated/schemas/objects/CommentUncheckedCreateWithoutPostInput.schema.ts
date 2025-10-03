import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentCreaterestaurantsMentionedInputObjectSchema as CommentCreaterestaurantsMentionedInputObjectSchema } from './CommentCreaterestaurantsMentionedInput.schema';
import { CommentUncheckedCreateNestedManyWithoutParentCommentInputObjectSchema as CommentUncheckedCreateNestedManyWithoutParentCommentInputObjectSchema } from './CommentUncheckedCreateNestedManyWithoutParentCommentInput.schema';
import { FileUncheckedCreateNestedManyWithoutCommentInputObjectSchema as FileUncheckedCreateNestedManyWithoutCommentInputObjectSchema } from './FileUncheckedCreateNestedManyWithoutCommentInput.schema'

const makeSchema = () => z.object({
  id: z.number().int().optional(),
  externalId: z.string(),
  parentCommentId: z.number().int().optional().nullable(),
  author: z.string().optional().nullable(),
  body: z.string().optional().nullable(),
  score: z.number().int().optional().nullable(),
  restaurantsMentioned: z.union([z.lazy(() => CommentCreaterestaurantsMentionedInputObjectSchema), z.string().array()]).optional(),
  createdUtc: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  replies: z.lazy(() => CommentUncheckedCreateNestedManyWithoutParentCommentInputObjectSchema).optional(),
  files: z.lazy(() => FileUncheckedCreateNestedManyWithoutCommentInputObjectSchema).optional()
}).strict();
export const CommentUncheckedCreateWithoutPostInputObjectSchema: z.ZodType<Prisma.CommentUncheckedCreateWithoutPostInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentUncheckedCreateWithoutPostInput>;
export const CommentUncheckedCreateWithoutPostInputObjectZodSchema = makeSchema();
