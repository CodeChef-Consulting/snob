import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentUncheckedCreateNestedManyWithoutPostInputObjectSchema as CommentUncheckedCreateNestedManyWithoutPostInputObjectSchema } from './CommentUncheckedCreateNestedManyWithoutPostInput.schema';
import { FileUncheckedCreateNestedManyWithoutPostInputObjectSchema as FileUncheckedCreateNestedManyWithoutPostInputObjectSchema } from './FileUncheckedCreateNestedManyWithoutPostInput.schema';
import { RestaurantUncheckedCreateNestedManyWithoutPostsInputObjectSchema as RestaurantUncheckedCreateNestedManyWithoutPostsInputObjectSchema } from './RestaurantUncheckedCreateNestedManyWithoutPostsInput.schema';
import { RestaurantGroupUncheckedCreateNestedManyWithoutPostsInputObjectSchema as RestaurantGroupUncheckedCreateNestedManyWithoutPostsInputObjectSchema } from './RestaurantGroupUncheckedCreateNestedManyWithoutPostsInput.schema';
import { RestaurantExtractionUncheckedCreateNestedOneWithoutPostInputObjectSchema as RestaurantExtractionUncheckedCreateNestedOneWithoutPostInputObjectSchema } from './RestaurantExtractionUncheckedCreateNestedOneWithoutPostInput.schema';
import { SentimentExtractionUncheckedCreateNestedOneWithoutPostInputObjectSchema as SentimentExtractionUncheckedCreateNestedOneWithoutPostInputObjectSchema } from './SentimentExtractionUncheckedCreateNestedOneWithoutPostInput.schema'

const makeSchema = () => z.object({
  id: z.number().int().optional(),
  externalId: z.string(),
  subreddit: z.string(),
  author: z.string().optional().nullable(),
  title: z.string().optional().nullable(),
  body: z.string().optional().nullable(),
  score: z.number().int().optional().nullable(),
  ups: z.number().int().optional().nullable(),
  downs: z.number().int().optional().nullable(),
  upvoteRatio: z.number().optional().nullable(),
  numComments: z.number().int().optional().nullable(),
  gilded: z.number().int().optional().nullable(),
  permalink: z.string().optional().nullable(),
  createdUtc: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  commentsLastScrapedAt: z.coerce.date().optional().nullable(),
  commentsFullyScraped: z.boolean().optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutPostInputObjectSchema).optional(),
  files: z.lazy(() => FileUncheckedCreateNestedManyWithoutPostInputObjectSchema).optional(),
  restaurantsMentioned: z.lazy(() => RestaurantUncheckedCreateNestedManyWithoutPostsInputObjectSchema).optional(),
  restaurantGroupsMentioned: z.lazy(() => RestaurantGroupUncheckedCreateNestedManyWithoutPostsInputObjectSchema).optional(),
  restaurantExtraction: z.lazy(() => RestaurantExtractionUncheckedCreateNestedOneWithoutPostInputObjectSchema).optional(),
  sentimentExtraction: z.lazy(() => SentimentExtractionUncheckedCreateNestedOneWithoutPostInputObjectSchema).optional()
}).strict();
export const PostUncheckedCreateWithoutScrapingSessionInputObjectSchema: z.ZodType<Prisma.PostUncheckedCreateWithoutScrapingSessionInput> = makeSchema() as unknown as z.ZodType<Prisma.PostUncheckedCreateWithoutScrapingSessionInput>;
export const PostUncheckedCreateWithoutScrapingSessionInputObjectZodSchema = makeSchema();
