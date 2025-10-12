import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentCreateNestedManyWithoutPostInputObjectSchema as CommentCreateNestedManyWithoutPostInputObjectSchema } from './CommentCreateNestedManyWithoutPostInput.schema';
import { FileCreateNestedManyWithoutPostInputObjectSchema as FileCreateNestedManyWithoutPostInputObjectSchema } from './FileCreateNestedManyWithoutPostInput.schema';
import { RestaurantCreateNestedManyWithoutPostsInputObjectSchema as RestaurantCreateNestedManyWithoutPostsInputObjectSchema } from './RestaurantCreateNestedManyWithoutPostsInput.schema';
import { RestaurantExtractionCreateNestedOneWithoutPostInputObjectSchema as RestaurantExtractionCreateNestedOneWithoutPostInputObjectSchema } from './RestaurantExtractionCreateNestedOneWithoutPostInput.schema';
import { SentimentExtractionCreateNestedOneWithoutPostInputObjectSchema as SentimentExtractionCreateNestedOneWithoutPostInputObjectSchema } from './SentimentExtractionCreateNestedOneWithoutPostInput.schema'

const makeSchema = () => z.object({
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
  comments: z.lazy(() => CommentCreateNestedManyWithoutPostInputObjectSchema).optional(),
  files: z.lazy(() => FileCreateNestedManyWithoutPostInputObjectSchema).optional(),
  restaurantsMentioned: z.lazy(() => RestaurantCreateNestedManyWithoutPostsInputObjectSchema).optional(),
  restaurantExtraction: z.lazy(() => RestaurantExtractionCreateNestedOneWithoutPostInputObjectSchema).optional(),
  sentimentExtraction: z.lazy(() => SentimentExtractionCreateNestedOneWithoutPostInputObjectSchema).optional()
}).strict();
export const PostCreateWithoutScrapingSessionInputObjectSchema: z.ZodType<Prisma.PostCreateWithoutScrapingSessionInput> = makeSchema() as unknown as z.ZodType<Prisma.PostCreateWithoutScrapingSessionInput>;
export const PostCreateWithoutScrapingSessionInputObjectZodSchema = makeSchema();
