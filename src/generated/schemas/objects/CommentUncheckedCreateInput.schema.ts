import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentUncheckedCreateNestedManyWithoutParentCommentInputObjectSchema as CommentUncheckedCreateNestedManyWithoutParentCommentInputObjectSchema } from './CommentUncheckedCreateNestedManyWithoutParentCommentInput.schema';
import { FileUncheckedCreateNestedManyWithoutCommentInputObjectSchema as FileUncheckedCreateNestedManyWithoutCommentInputObjectSchema } from './FileUncheckedCreateNestedManyWithoutCommentInput.schema';
import { RestaurantUncheckedCreateNestedManyWithoutCommentsInputObjectSchema as RestaurantUncheckedCreateNestedManyWithoutCommentsInputObjectSchema } from './RestaurantUncheckedCreateNestedManyWithoutCommentsInput.schema';
import { RestaurantExtractionUncheckedCreateNestedOneWithoutCommentInputObjectSchema as RestaurantExtractionUncheckedCreateNestedOneWithoutCommentInputObjectSchema } from './RestaurantExtractionUncheckedCreateNestedOneWithoutCommentInput.schema'

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
  scrapingSessionId: z.number().int().optional().nullable(),
  replies: z.lazy(() => CommentUncheckedCreateNestedManyWithoutParentCommentInputObjectSchema),
  files: z.lazy(() => FileUncheckedCreateNestedManyWithoutCommentInputObjectSchema),
  restaurantsMentioned: z.lazy(() => RestaurantUncheckedCreateNestedManyWithoutCommentsInputObjectSchema),
  restaurantExtraction: z.lazy(() => RestaurantExtractionUncheckedCreateNestedOneWithoutCommentInputObjectSchema).optional()
}).strict();
export const CommentUncheckedCreateInputObjectSchema: z.ZodType<Prisma.CommentUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentUncheckedCreateInput>;
export const CommentUncheckedCreateInputObjectZodSchema = makeSchema();
