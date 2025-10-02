import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { PostUpdateOneWithoutFilesNestedInputObjectSchema } from './PostUpdateOneWithoutFilesNestedInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  fileUrl: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  fileType: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  metadata: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  post: z.lazy(() => PostUpdateOneWithoutFilesNestedInputObjectSchema).optional()
}).strict();
export const FileUpdateWithoutCommentInputObjectSchema: z.ZodType<Prisma.FileUpdateWithoutCommentInput> = makeSchema() as unknown as z.ZodType<Prisma.FileUpdateWithoutCommentInput>;
export const FileUpdateWithoutCommentInputObjectZodSchema = makeSchema();
