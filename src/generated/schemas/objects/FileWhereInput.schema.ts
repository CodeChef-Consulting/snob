import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { IntNullableFilterObjectSchema as IntNullableFilterObjectSchema } from './IntNullableFilter.schema';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { PostNullableScalarRelationFilterObjectSchema as PostNullableScalarRelationFilterObjectSchema } from './PostNullableScalarRelationFilter.schema';
import { PostWhereInputObjectSchema as PostWhereInputObjectSchema } from './PostWhereInput.schema';
import { CommentNullableScalarRelationFilterObjectSchema as CommentNullableScalarRelationFilterObjectSchema } from './CommentNullableScalarRelationFilter.schema';
import { CommentWhereInputObjectSchema as CommentWhereInputObjectSchema } from './CommentWhereInput.schema'

const filewhereinputSchema = z.object({
  AND: z.union([z.lazy(() => FileWhereInputObjectSchema), z.lazy(() => FileWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => FileWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => FileWhereInputObjectSchema), z.lazy(() => FileWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  postId: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  commentId: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  fileUrl: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  fileType: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  metadata: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  post: z.union([z.lazy(() => PostNullableScalarRelationFilterObjectSchema), z.lazy(() => PostWhereInputObjectSchema)]).optional(),
  comment: z.union([z.lazy(() => CommentNullableScalarRelationFilterObjectSchema), z.lazy(() => CommentWhereInputObjectSchema)]).optional()
}).strict();
export const FileWhereInputObjectSchema: z.ZodType<Prisma.FileWhereInput> = filewhereinputSchema as unknown as z.ZodType<Prisma.FileWhereInput>;
export const FileWhereInputObjectZodSchema = filewhereinputSchema;
