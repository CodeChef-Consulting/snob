import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.number().int().optional(),
  postId: z.number().int().optional().nullable(),
  commentId: z.number().int().optional().nullable(),
  fileUrl: z.string(),
  fileType: z.string(),
  metadata: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.coerce.date().optional()
}).strict();
export const FileCreateManyInputObjectSchema: z.ZodType<Prisma.FileCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.FileCreateManyInput>;
export const FileCreateManyInputObjectZodSchema = makeSchema();
