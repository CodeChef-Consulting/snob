import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { NullableIntFieldUpdateOperationsInputObjectSchema as NullableIntFieldUpdateOperationsInputObjectSchema } from './NullableIntFieldUpdateOperationsInput.schema';
import { CommentUpdaterestaurantsMentionedInputObjectSchema as CommentUpdaterestaurantsMentionedInputObjectSchema } from './CommentUpdaterestaurantsMentionedInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema as NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { CommentUncheckedUpdateManyWithoutParentCommentNestedInputObjectSchema as CommentUncheckedUpdateManyWithoutParentCommentNestedInputObjectSchema } from './CommentUncheckedUpdateManyWithoutParentCommentNestedInput.schema';
import { FileUncheckedUpdateManyWithoutCommentNestedInputObjectSchema as FileUncheckedUpdateManyWithoutCommentNestedInputObjectSchema } from './FileUncheckedUpdateManyWithoutCommentNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  externalId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  postId: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  author: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  body: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  score: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  restaurantsMentioned: z.union([z.lazy(() => CommentUpdaterestaurantsMentionedInputObjectSchema), z.string().array()]).optional(),
  createdUtc: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  replies: z.lazy(() => CommentUncheckedUpdateManyWithoutParentCommentNestedInputObjectSchema).optional(),
  files: z.lazy(() => FileUncheckedUpdateManyWithoutCommentNestedInputObjectSchema).optional()
}).strict();
export const CommentUncheckedUpdateWithoutParentCommentInputObjectSchema: z.ZodType<Prisma.CommentUncheckedUpdateWithoutParentCommentInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentUncheckedUpdateWithoutParentCommentInput>;
export const CommentUncheckedUpdateWithoutParentCommentInputObjectZodSchema = makeSchema();
