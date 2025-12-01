import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ScrapingSessionCreateNestedOneWithoutPostsInputObjectSchema as ScrapingSessionCreateNestedOneWithoutPostsInputObjectSchema } from './ScrapingSessionCreateNestedOneWithoutPostsInput.schema';
import { CommentCreateNestedManyWithoutPostInputObjectSchema as CommentCreateNestedManyWithoutPostInputObjectSchema } from './CommentCreateNestedManyWithoutPostInput.schema';
import { FileCreateNestedManyWithoutPostInputObjectSchema as FileCreateNestedManyWithoutPostInputObjectSchema } from './FileCreateNestedManyWithoutPostInput.schema';
import { RestaurantGroupCreateNestedManyWithoutPostsInputObjectSchema as RestaurantGroupCreateNestedManyWithoutPostsInputObjectSchema } from './RestaurantGroupCreateNestedManyWithoutPostsInput.schema';
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
  scrapingSession: z.lazy(() => ScrapingSessionCreateNestedOneWithoutPostsInputObjectSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutPostInputObjectSchema).optional(),
  files: z.lazy(() => FileCreateNestedManyWithoutPostInputObjectSchema).optional(),
  restaurantGroupsMentioned: z.lazy(() => RestaurantGroupCreateNestedManyWithoutPostsInputObjectSchema).optional(),
  sentimentExtraction: z.lazy(() => SentimentExtractionCreateNestedOneWithoutPostInputObjectSchema).optional()
}).strict();
export const PostCreateWithoutRestaurantExtractionInputObjectSchema: z.ZodType<Prisma.PostCreateWithoutRestaurantExtractionInput> = makeSchema() as unknown as z.ZodType<Prisma.PostCreateWithoutRestaurantExtractionInput>;
export const PostCreateWithoutRestaurantExtractionInputObjectZodSchema = makeSchema();
