import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { IntNullableFilterObjectSchema } from './IntNullableFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const filescalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => FileScalarWhereInputObjectSchema), z.lazy(() => FileScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => FileScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => FileScalarWhereInputObjectSchema), z.lazy(() => FileScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  postId: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  commentId: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  fileUrl: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  fileType: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  metadata: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const FileScalarWhereInputObjectSchema: z.ZodType<Prisma.FileScalarWhereInput> = filescalarwhereinputSchema as unknown as z.ZodType<Prisma.FileScalarWhereInput>;
export const FileScalarWhereInputObjectZodSchema = filescalarwhereinputSchema;
