import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PostCreateNestedOneWithoutCommentsInputObjectSchema as PostCreateNestedOneWithoutCommentsInputObjectSchema } from './PostCreateNestedOneWithoutCommentsInput.schema';
import { CommentCreateNestedManyWithoutParentCommentInputObjectSchema as CommentCreateNestedManyWithoutParentCommentInputObjectSchema } from './CommentCreateNestedManyWithoutParentCommentInput.schema';
import { ScrapingSessionCreateNestedOneWithoutCommentsInputObjectSchema as ScrapingSessionCreateNestedOneWithoutCommentsInputObjectSchema } from './ScrapingSessionCreateNestedOneWithoutCommentsInput.schema';
import { FileCreateNestedManyWithoutCommentInputObjectSchema as FileCreateNestedManyWithoutCommentInputObjectSchema } from './FileCreateNestedManyWithoutCommentInput.schema';
import { RestaurantGroupCreateNestedManyWithoutCommentsInputObjectSchema as RestaurantGroupCreateNestedManyWithoutCommentsInputObjectSchema } from './RestaurantGroupCreateNestedManyWithoutCommentsInput.schema';
import { RestaurantExtractionCreateNestedOneWithoutCommentInputObjectSchema as RestaurantExtractionCreateNestedOneWithoutCommentInputObjectSchema } from './RestaurantExtractionCreateNestedOneWithoutCommentInput.schema';
import { SentimentExtractionCreateNestedOneWithoutCommentInputObjectSchema as SentimentExtractionCreateNestedOneWithoutCommentInputObjectSchema } from './SentimentExtractionCreateNestedOneWithoutCommentInput.schema'

const makeSchema = () => z.object({
  externalId: z.string(),
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
  post: z.lazy(() => PostCreateNestedOneWithoutCommentsInputObjectSchema),
  replies: z.lazy(() => CommentCreateNestedManyWithoutParentCommentInputObjectSchema).optional(),
  scrapingSession: z.lazy(() => ScrapingSessionCreateNestedOneWithoutCommentsInputObjectSchema).optional(),
  files: z.lazy(() => FileCreateNestedManyWithoutCommentInputObjectSchema).optional(),
  restaurantGroupsMentioned: z.lazy(() => RestaurantGroupCreateNestedManyWithoutCommentsInputObjectSchema).optional(),
  restaurantExtraction: z.lazy(() => RestaurantExtractionCreateNestedOneWithoutCommentInputObjectSchema).optional(),
  sentimentExtraction: z.lazy(() => SentimentExtractionCreateNestedOneWithoutCommentInputObjectSchema).optional()
}).strict();
export const CommentCreateWithoutParentCommentInputObjectSchema: z.ZodType<Prisma.CommentCreateWithoutParentCommentInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentCreateWithoutParentCommentInput>;
export const CommentCreateWithoutParentCommentInputObjectZodSchema = makeSchema();
