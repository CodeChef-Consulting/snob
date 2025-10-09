import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentUncheckedCreateNestedManyWithoutParentCommentInputObjectSchema as CommentUncheckedCreateNestedManyWithoutParentCommentInputObjectSchema } from './CommentUncheckedCreateNestedManyWithoutParentCommentInput.schema';
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
  ups: z.number().int().optional().nullable(),
  depth: z.number().int().optional().nullable(),
  controversiality: z.number().int().optional().nullable(),
  isSubmitter: z.boolean().optional().nullable(),
  scoreHidden: z.boolean().optional().nullable(),
  permalink: z.string().optional().nullable(),
  createdUtc: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  scrapingSessionId: z.number().int().optional().nullable(),
  replies: z.lazy(() => CommentUncheckedCreateNestedManyWithoutParentCommentInputObjectSchema).optional(),
  files: z.lazy(() => FileUncheckedCreateNestedManyWithoutCommentInputObjectSchema).optional(),
  restaurantsMentioned: z.lazy(() => RestaurantUncheckedCreateNestedManyWithoutCommentsInputObjectSchema).optional()
}).strict();
export const CommentUncheckedCreateWithoutRestaurantExtractionInputObjectSchema: z.ZodType<Prisma.CommentUncheckedCreateWithoutRestaurantExtractionInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentUncheckedCreateWithoutRestaurantExtractionInput>;
export const CommentUncheckedCreateWithoutRestaurantExtractionInputObjectZodSchema = makeSchema();
