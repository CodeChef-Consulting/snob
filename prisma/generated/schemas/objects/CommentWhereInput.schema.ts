import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { IntNullableFilterObjectSchema } from './IntNullableFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { PostScalarRelationFilterObjectSchema } from './PostScalarRelationFilter.schema';
import { PostWhereInputObjectSchema } from './PostWhereInput.schema';
import { CommentNullableScalarRelationFilterObjectSchema } from './CommentNullableScalarRelationFilter.schema';
import { CommentListRelationFilterObjectSchema } from './CommentListRelationFilter.schema';
import { FileListRelationFilterObjectSchema } from './FileListRelationFilter.schema'

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
  createdUtc: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  post: z.union([z.lazy(() => PostScalarRelationFilterObjectSchema), z.lazy(() => PostWhereInputObjectSchema)]).optional(),
  parentComment: z.union([z.lazy(() => CommentNullableScalarRelationFilterObjectSchema), z.lazy(() => CommentWhereInputObjectSchema)]).optional(),
  replies: z.lazy(() => CommentListRelationFilterObjectSchema).optional(),
  files: z.lazy(() => FileListRelationFilterObjectSchema).optional()
}).strict();
export const CommentWhereInputObjectSchema: z.ZodType<Prisma.CommentWhereInput> = commentwhereinputSchema as unknown as z.ZodType<Prisma.CommentWhereInput>;
export const CommentWhereInputObjectZodSchema = commentwhereinputSchema;
