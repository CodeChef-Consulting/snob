import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { IntNullableFilterObjectSchema as IntNullableFilterObjectSchema } from './IntNullableFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { BoolNullableFilterObjectSchema as BoolNullableFilterObjectSchema } from './BoolNullableFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { PostScalarRelationFilterObjectSchema as PostScalarRelationFilterObjectSchema } from './PostScalarRelationFilter.schema';
import { PostWhereInputObjectSchema as PostWhereInputObjectSchema } from './PostWhereInput.schema';
import { CommentNullableScalarRelationFilterObjectSchema as CommentNullableScalarRelationFilterObjectSchema } from './CommentNullableScalarRelationFilter.schema';
import { CommentListRelationFilterObjectSchema as CommentListRelationFilterObjectSchema } from './CommentListRelationFilter.schema';
import { ScrapingSessionNullableScalarRelationFilterObjectSchema as ScrapingSessionNullableScalarRelationFilterObjectSchema } from './ScrapingSessionNullableScalarRelationFilter.schema';
import { ScrapingSessionWhereInputObjectSchema as ScrapingSessionWhereInputObjectSchema } from './ScrapingSessionWhereInput.schema';
import { FileListRelationFilterObjectSchema as FileListRelationFilterObjectSchema } from './FileListRelationFilter.schema';
import { RestaurantListRelationFilterObjectSchema as RestaurantListRelationFilterObjectSchema } from './RestaurantListRelationFilter.schema';
import { RestaurantExtractionNullableScalarRelationFilterObjectSchema as RestaurantExtractionNullableScalarRelationFilterObjectSchema } from './RestaurantExtractionNullableScalarRelationFilter.schema';
import { RestaurantExtractionWhereInputObjectSchema as RestaurantExtractionWhereInputObjectSchema } from './RestaurantExtractionWhereInput.schema';
import { SentimentExtractionNullableScalarRelationFilterObjectSchema as SentimentExtractionNullableScalarRelationFilterObjectSchema } from './SentimentExtractionNullableScalarRelationFilter.schema';
import { SentimentExtractionWhereInputObjectSchema as SentimentExtractionWhereInputObjectSchema } from './SentimentExtractionWhereInput.schema'

const commentwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => CommentWhereInputObjectSchema), z.lazy(() => CommentWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CommentWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CommentWhereInputObjectSchema), z.lazy(() => CommentWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  externalId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  postId: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  parentCommentId: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  author: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  body: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  score: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  ups: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  depth: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  controversiality: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  isSubmitter: z.union([z.lazy(() => BoolNullableFilterObjectSchema), z.boolean()]).optional().nullable(),
  scoreHidden: z.union([z.lazy(() => BoolNullableFilterObjectSchema), z.boolean()]).optional().nullable(),
  permalink: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  createdUtc: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  scrapingSessionId: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  post: z.union([z.lazy(() => PostScalarRelationFilterObjectSchema), z.lazy(() => PostWhereInputObjectSchema)]).optional(),
  parentComment: z.union([z.lazy(() => CommentNullableScalarRelationFilterObjectSchema), z.lazy(() => CommentWhereInputObjectSchema)]).optional(),
  replies: z.lazy(() => CommentListRelationFilterObjectSchema).optional(),
  scrapingSession: z.union([z.lazy(() => ScrapingSessionNullableScalarRelationFilterObjectSchema), z.lazy(() => ScrapingSessionWhereInputObjectSchema)]).optional(),
  files: z.lazy(() => FileListRelationFilterObjectSchema).optional(),
  restaurantsMentioned: z.lazy(() => RestaurantListRelationFilterObjectSchema).optional(),
  restaurantExtraction: z.union([z.lazy(() => RestaurantExtractionNullableScalarRelationFilterObjectSchema), z.lazy(() => RestaurantExtractionWhereInputObjectSchema)]).optional(),
  sentimentExtraction: z.union([z.lazy(() => SentimentExtractionNullableScalarRelationFilterObjectSchema), z.lazy(() => SentimentExtractionWhereInputObjectSchema)]).optional()
}).strict();
export const CommentWhereInputObjectSchema: z.ZodType<Prisma.CommentWhereInput> = commentwhereinputSchema as unknown as z.ZodType<Prisma.CommentWhereInput>;
export const CommentWhereInputObjectZodSchema = commentwhereinputSchema;
