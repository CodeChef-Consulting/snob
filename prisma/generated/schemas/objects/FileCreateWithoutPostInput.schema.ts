import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { CommentCreateNestedOneWithoutFilesInputObjectSchema } from './CommentCreateNestedOneWithoutFilesInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  fileUrl: z.string(),
  fileType: z.string(),
  metadata: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.coerce.date().optional(),
  comment: z.lazy(() => CommentCreateNestedOneWithoutFilesInputObjectSchema).optional()
}).strict();
export const FileCreateWithoutPostInputObjectSchema: z.ZodType<Prisma.FileCreateWithoutPostInput> = makeSchema() as unknown as z.ZodType<Prisma.FileCreateWithoutPostInput>;
export const FileCreateWithoutPostInputObjectZodSchema = makeSchema();
