import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.number().int().optional(),
  commentId: z.number().int().optional().nullable(),
  fileUrl: z.string(),
  fileType: z.string(),
  metadata: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.coerce.date().optional()
}).strict();
export const FileUncheckedCreateWithoutPostInputObjectSchema: z.ZodType<Prisma.FileUncheckedCreateWithoutPostInput> = makeSchema() as unknown as z.ZodType<Prisma.FileUncheckedCreateWithoutPostInput>;
export const FileUncheckedCreateWithoutPostInputObjectZodSchema = makeSchema();
