import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { IntNullableFilterObjectSchema as IntNullableFilterObjectSchema } from './IntNullableFilter.schema';
import { FloatFilterObjectSchema as FloatFilterObjectSchema } from './FloatFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { PostNullableScalarRelationFilterObjectSchema as PostNullableScalarRelationFilterObjectSchema } from './PostNullableScalarRelationFilter.schema';
import { PostWhereInputObjectSchema as PostWhereInputObjectSchema } from './PostWhereInput.schema';
import { CommentNullableScalarRelationFilterObjectSchema as CommentNullableScalarRelationFilterObjectSchema } from './CommentNullableScalarRelationFilter.schema';
import { CommentWhereInputObjectSchema as CommentWhereInputObjectSchema } from './CommentWhereInput.schema'

const sentimentextractionwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => SentimentExtractionWhereInputObjectSchema), z.lazy(() => SentimentExtractionWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => SentimentExtractionWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => SentimentExtractionWhereInputObjectSchema), z.lazy(() => SentimentExtractionWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  postId: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  commentId: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  rawAiScore: z.union([z.lazy(() => FloatFilterObjectSchema), z.number()]).optional(),
  extractedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  model: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  post: z.union([z.lazy(() => PostNullableScalarRelationFilterObjectSchema), z.lazy(() => PostWhereInputObjectSchema)]).optional(),
  comment: z.union([z.lazy(() => CommentNullableScalarRelationFilterObjectSchema), z.lazy(() => CommentWhereInputObjectSchema)]).optional()
}).strict();
export const SentimentExtractionWhereInputObjectSchema: z.ZodType<Prisma.SentimentExtractionWhereInput> = sentimentextractionwhereinputSchema as unknown as z.ZodType<Prisma.SentimentExtractionWhereInput>;
export const SentimentExtractionWhereInputObjectZodSchema = sentimentextractionwhereinputSchema;
