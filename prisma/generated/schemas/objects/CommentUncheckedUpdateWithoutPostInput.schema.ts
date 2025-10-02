import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableIntFieldUpdateOperationsInputObjectSchema } from './NullableIntFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { CommentUncheckedUpdateManyWithoutParentCommentNestedInputObjectSchema } from './CommentUncheckedUpdateManyWithoutParentCommentNestedInput.schema';
import { FileUncheckedUpdateManyWithoutCommentNestedInputObjectSchema } from './FileUncheckedUpdateManyWithoutCommentNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  externalId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  parentCommentId: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  author: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  body: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  score: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdUtc: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  replies: z.lazy(() => CommentUncheckedUpdateManyWithoutParentCommentNestedInputObjectSchema).optional(),
  files: z.lazy(() => FileUncheckedUpdateManyWithoutCommentNestedInputObjectSchema).optional()
}).strict();
export const CommentUncheckedUpdateWithoutPostInputObjectSchema: z.ZodType<Prisma.CommentUncheckedUpdateWithoutPostInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentUncheckedUpdateWithoutPostInput>;
export const CommentUncheckedUpdateWithoutPostInputObjectZodSchema = makeSchema();
