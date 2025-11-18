import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PostCreateNestedOneWithoutCommentsInputObjectSchema as PostCreateNestedOneWithoutCommentsInputObjectSchema } from './PostCreateNestedOneWithoutCommentsInput.schema';
import { CommentCreateNestedOneWithoutRepliesInputObjectSchema as CommentCreateNestedOneWithoutRepliesInputObjectSchema } from './CommentCreateNestedOneWithoutRepliesInput.schema';
import { ScrapingSessionCreateNestedOneWithoutCommentsInputObjectSchema as ScrapingSessionCreateNestedOneWithoutCommentsInputObjectSchema } from './ScrapingSessionCreateNestedOneWithoutCommentsInput.schema';
import { FileCreateNestedManyWithoutCommentInputObjectSchema as FileCreateNestedManyWithoutCommentInputObjectSchema } from './FileCreateNestedManyWithoutCommentInput.schema';
import { RestaurantCreateNestedManyWithoutCommentsInputObjectSchema as RestaurantCreateNestedManyWithoutCommentsInputObjectSchema } from './RestaurantCreateNestedManyWithoutCommentsInput.schema';
import { RestaurantExtractionCreateNestedOneWithoutCommentInputObjectSchema as RestaurantExtractionCreateNestedOneWithoutCommentInputObjectSchema } from './RestaurantExtractionCreateNestedOneWithoutCommentInput.schema';
import { SentimentExtractionCreateNestedOneWithoutCommentInputObjectSchema as SentimentExtractionCreateNestedOneWithoutCommentInputObjectSchema } from './SentimentExtractionCreateNestedOneWithoutCommentInput.schema'

const makeSchema = () => z.object({
  externalId: z.string(),
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
  parentComment: z.lazy(() => CommentCreateNestedOneWithoutRepliesInputObjectSchema).optional(),
  scrapingSession: z.lazy(() => ScrapingSessionCreateNestedOneWithoutCommentsInputObjectSchema).optional(),
  files: z.lazy(() => FileCreateNestedManyWithoutCommentInputObjectSchema).optional(),
  restaurantsMentioned: z.lazy(() => RestaurantCreateNestedManyWithoutCommentsInputObjectSchema).optional(),
  restaurantExtraction: z.lazy(() => RestaurantExtractionCreateNestedOneWithoutCommentInputObjectSchema).optional(),
  sentimentExtraction: z.lazy(() => SentimentExtractionCreateNestedOneWithoutCommentInputObjectSchema).optional()
}).strict();
export const CommentCreateWithoutRepliesInputObjectSchema: z.ZodType<Prisma.CommentCreateWithoutRepliesInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentCreateWithoutRepliesInput>;
export const CommentCreateWithoutRepliesInputObjectZodSchema = makeSchema();
