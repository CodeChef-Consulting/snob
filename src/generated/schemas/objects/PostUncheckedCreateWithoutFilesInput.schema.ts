import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentUncheckedCreateNestedManyWithoutPostInputObjectSchema as CommentUncheckedCreateNestedManyWithoutPostInputObjectSchema } from './CommentUncheckedCreateNestedManyWithoutPostInput.schema';
import { RestaurantUncheckedCreateNestedManyWithoutPostsInputObjectSchema as RestaurantUncheckedCreateNestedManyWithoutPostsInputObjectSchema } from './RestaurantUncheckedCreateNestedManyWithoutPostsInput.schema';
import { RestaurantExtractionUncheckedCreateNestedOneWithoutPostInputObjectSchema as RestaurantExtractionUncheckedCreateNestedOneWithoutPostInputObjectSchema } from './RestaurantExtractionUncheckedCreateNestedOneWithoutPostInput.schema'

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
  scrapingSessionId: z.number().int().optional().nullable(),
  commentsLastScrapedAt: z.coerce.date().optional().nullable(),
  commentsFullyScraped: z.boolean().optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutPostInputObjectSchema).optional(),
  restaurantsMentioned: z.lazy(() => RestaurantUncheckedCreateNestedManyWithoutPostsInputObjectSchema).optional(),
  restaurantExtraction: z.lazy(() => RestaurantExtractionUncheckedCreateNestedOneWithoutPostInputObjectSchema).optional()
}).strict();
export const PostUncheckedCreateWithoutFilesInputObjectSchema: z.ZodType<Prisma.PostUncheckedCreateWithoutFilesInput> = makeSchema() as unknown as z.ZodType<Prisma.PostUncheckedCreateWithoutFilesInput>;
export const PostUncheckedCreateWithoutFilesInputObjectZodSchema = makeSchema();
