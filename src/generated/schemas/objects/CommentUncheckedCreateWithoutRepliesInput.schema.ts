import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FileUncheckedCreateNestedManyWithoutCommentInputObjectSchema as FileUncheckedCreateNestedManyWithoutCommentInputObjectSchema } from './FileUncheckedCreateNestedManyWithoutCommentInput.schema';
import { RestaurantUncheckedCreateNestedManyWithoutCommentsInputObjectSchema as RestaurantUncheckedCreateNestedManyWithoutCommentsInputObjectSchema } from './RestaurantUncheckedCreateNestedManyWithoutCommentsInput.schema'

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
  updatedAt: z.coerce.date().optional(),
  files: z.lazy(() => FileUncheckedCreateNestedManyWithoutCommentInputObjectSchema).optional(),
  restaurantsMentioned: z.lazy(() => RestaurantUncheckedCreateNestedManyWithoutCommentsInputObjectSchema).optional()
}).strict();
export const CommentUncheckedCreateWithoutRepliesInputObjectSchema: z.ZodType<Prisma.CommentUncheckedCreateWithoutRepliesInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentUncheckedCreateWithoutRepliesInput>;
export const CommentUncheckedCreateWithoutRepliesInputObjectZodSchema = makeSchema();
