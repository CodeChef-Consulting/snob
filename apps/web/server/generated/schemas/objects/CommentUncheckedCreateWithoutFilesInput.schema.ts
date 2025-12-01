import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentUncheckedCreateNestedManyWithoutParentCommentInputObjectSchema as CommentUncheckedCreateNestedManyWithoutParentCommentInputObjectSchema } from './CommentUncheckedCreateNestedManyWithoutParentCommentInput.schema';
import { RestaurantGroupUncheckedCreateNestedManyWithoutCommentsInputObjectSchema as RestaurantGroupUncheckedCreateNestedManyWithoutCommentsInputObjectSchema } from './RestaurantGroupUncheckedCreateNestedManyWithoutCommentsInput.schema';
import { RestaurantExtractionUncheckedCreateNestedOneWithoutCommentInputObjectSchema as RestaurantExtractionUncheckedCreateNestedOneWithoutCommentInputObjectSchema } from './RestaurantExtractionUncheckedCreateNestedOneWithoutCommentInput.schema';
import { SentimentExtractionUncheckedCreateNestedOneWithoutCommentInputObjectSchema as SentimentExtractionUncheckedCreateNestedOneWithoutCommentInputObjectSchema } from './SentimentExtractionUncheckedCreateNestedOneWithoutCommentInput.schema'

const makeSchema = () => z.object({
  id: z.number().int().optional(),
  externalId: z.string(),
  postId: z.number().int(),
  parentCommentId: z.number().int().optional().nullable(),
  parentExternalId: z.string().optional().nullable(),
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
  restaurantGroupsMentioned: z.lazy(() => RestaurantGroupUncheckedCreateNestedManyWithoutCommentsInputObjectSchema).optional(),
  restaurantExtraction: z.lazy(() => RestaurantExtractionUncheckedCreateNestedOneWithoutCommentInputObjectSchema).optional(),
  sentimentExtraction: z.lazy(() => SentimentExtractionUncheckedCreateNestedOneWithoutCommentInputObjectSchema).optional()
}).strict();
export const CommentUncheckedCreateWithoutFilesInputObjectSchema: z.ZodType<Prisma.CommentUncheckedCreateWithoutFilesInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentUncheckedCreateWithoutFilesInput>;
export const CommentUncheckedCreateWithoutFilesInputObjectZodSchema = makeSchema();
