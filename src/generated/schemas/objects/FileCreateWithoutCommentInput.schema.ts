import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { PostCreateNestedOneWithoutFilesInputObjectSchema as PostCreateNestedOneWithoutFilesInputObjectSchema } from './PostCreateNestedOneWithoutFilesInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  fileUrl: z.string(),
  fileType: z.string(),
  metadata: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.coerce.date().optional(),
  post: z.lazy(() => PostCreateNestedOneWithoutFilesInputObjectSchema).optional()
}).strict();
export const FileCreateWithoutCommentInputObjectSchema: z.ZodType<Prisma.FileCreateWithoutCommentInput> = makeSchema() as unknown as z.ZodType<Prisma.FileCreateWithoutCommentInput>;
export const FileCreateWithoutCommentInputObjectZodSchema = makeSchema();
