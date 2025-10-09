import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ScrapingSessionCreateNestedOneWithoutPostsInputObjectSchema as ScrapingSessionCreateNestedOneWithoutPostsInputObjectSchema } from './ScrapingSessionCreateNestedOneWithoutPostsInput.schema';
import { CommentCreateNestedManyWithoutPostInputObjectSchema as CommentCreateNestedManyWithoutPostInputObjectSchema } from './CommentCreateNestedManyWithoutPostInput.schema';
import { RestaurantCreateNestedManyWithoutPostsInputObjectSchema as RestaurantCreateNestedManyWithoutPostsInputObjectSchema } from './RestaurantCreateNestedManyWithoutPostsInput.schema';
import { RestaurantExtractionCreateNestedOneWithoutPostInputObjectSchema as RestaurantExtractionCreateNestedOneWithoutPostInputObjectSchema } from './RestaurantExtractionCreateNestedOneWithoutPostInput.schema'

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
  scrapingSession: z.lazy(() => ScrapingSessionCreateNestedOneWithoutPostsInputObjectSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutPostInputObjectSchema).optional(),
  restaurantsMentioned: z.lazy(() => RestaurantCreateNestedManyWithoutPostsInputObjectSchema).optional(),
  restaurantExtraction: z.lazy(() => RestaurantExtractionCreateNestedOneWithoutPostInputObjectSchema).optional()
}).strict();
export const PostCreateWithoutFilesInputObjectSchema: z.ZodType<Prisma.PostCreateWithoutFilesInput> = makeSchema() as unknown as z.ZodType<Prisma.PostCreateWithoutFilesInput>;
export const PostCreateWithoutFilesInputObjectZodSchema = makeSchema();
