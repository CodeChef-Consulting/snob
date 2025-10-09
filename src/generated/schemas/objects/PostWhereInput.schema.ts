import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { IntNullableFilterObjectSchema as IntNullableFilterObjectSchema } from './IntNullableFilter.schema';
import { FloatNullableFilterObjectSchema as FloatNullableFilterObjectSchema } from './FloatNullableFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { ScrapingSessionNullableScalarRelationFilterObjectSchema as ScrapingSessionNullableScalarRelationFilterObjectSchema } from './ScrapingSessionNullableScalarRelationFilter.schema';
import { ScrapingSessionWhereInputObjectSchema as ScrapingSessionWhereInputObjectSchema } from './ScrapingSessionWhereInput.schema';
import { CommentListRelationFilterObjectSchema as CommentListRelationFilterObjectSchema } from './CommentListRelationFilter.schema';
import { FileListRelationFilterObjectSchema as FileListRelationFilterObjectSchema } from './FileListRelationFilter.schema';
import { RestaurantListRelationFilterObjectSchema as RestaurantListRelationFilterObjectSchema } from './RestaurantListRelationFilter.schema';
import { RestaurantExtractionNullableScalarRelationFilterObjectSchema as RestaurantExtractionNullableScalarRelationFilterObjectSchema } from './RestaurantExtractionNullableScalarRelationFilter.schema';
import { RestaurantExtractionWhereInputObjectSchema as RestaurantExtractionWhereInputObjectSchema } from './RestaurantExtractionWhereInput.schema'

const postwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => PostWhereInputObjectSchema), z.lazy(() => PostWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => PostWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => PostWhereInputObjectSchema), z.lazy(() => PostWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  externalId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  subreddit: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  author: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  title: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  body: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  score: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  ups: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  downs: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  upvoteRatio: z.union([z.lazy(() => FloatNullableFilterObjectSchema), z.number()]).optional().nullable(),
  numComments: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  gilded: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  permalink: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  createdUtc: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  scrapingSessionId: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  commentsLastScrapedAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  commentsFullyScraped: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  scrapingSession: z.union([z.lazy(() => ScrapingSessionNullableScalarRelationFilterObjectSchema), z.lazy(() => ScrapingSessionWhereInputObjectSchema)]).optional(),
  comments: z.lazy(() => CommentListRelationFilterObjectSchema).optional(),
  files: z.lazy(() => FileListRelationFilterObjectSchema).optional(),
  restaurantsMentioned: z.lazy(() => RestaurantListRelationFilterObjectSchema).optional(),
  restaurantExtraction: z.union([z.lazy(() => RestaurantExtractionNullableScalarRelationFilterObjectSchema), z.lazy(() => RestaurantExtractionWhereInputObjectSchema)]).optional()
}).strict();
export const PostWhereInputObjectSchema: z.ZodType<Prisma.PostWhereInput> = postwhereinputSchema as unknown as z.ZodType<Prisma.PostWhereInput>;
export const PostWhereInputObjectZodSchema = postwhereinputSchema;
