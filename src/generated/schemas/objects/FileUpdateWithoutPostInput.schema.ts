import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { CommentUpdateOneWithoutFilesNestedInputObjectSchema as CommentUpdateOneWithoutFilesNestedInputObjectSchema } from './CommentUpdateOneWithoutFilesNestedInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  fileUrl: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  fileType: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  metadata: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  comment: z.lazy(() => CommentUpdateOneWithoutFilesNestedInputObjectSchema).optional()
}).strict();
export const FileUpdateWithoutPostInputObjectSchema: z.ZodType<Prisma.FileUpdateWithoutPostInput> = makeSchema() as unknown as z.ZodType<Prisma.FileUpdateWithoutPostInput>;
export const FileUpdateWithoutPostInputObjectZodSchema = makeSchema();
