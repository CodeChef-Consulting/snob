import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { PostCreateNestedOneWithoutFilesInputObjectSchema } from './PostCreateNestedOneWithoutFilesInput.schema';
import { CommentCreateNestedOneWithoutFilesInputObjectSchema } from './CommentCreateNestedOneWithoutFilesInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  fileUrl: z.string(),
  fileType: z.string(),
  metadata: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.coerce.date().optional(),
  post: z.lazy(() => PostCreateNestedOneWithoutFilesInputObjectSchema).optional(),
  comment: z.lazy(() => CommentCreateNestedOneWithoutFilesInputObjectSchema).optional()
}).strict();
export const FileCreateInputObjectSchema: z.ZodType<Prisma.FileCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.FileCreateInput>;
export const FileCreateInputObjectZodSchema = makeSchema();
