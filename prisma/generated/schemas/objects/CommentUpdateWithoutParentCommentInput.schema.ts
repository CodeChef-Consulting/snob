import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { NullableIntFieldUpdateOperationsInputObjectSchema } from './NullableIntFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { PostUpdateOneRequiredWithoutCommentsNestedInputObjectSchema } from './PostUpdateOneRequiredWithoutCommentsNestedInput.schema';
import { CommentUpdateManyWithoutParentCommentNestedInputObjectSchema } from './CommentUpdateManyWithoutParentCommentNestedInput.schema';
import { FileUpdateManyWithoutCommentNestedInputObjectSchema } from './FileUpdateManyWithoutCommentNestedInput.schema'

const makeSchema = () => z.object({
  externalId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  author: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  body: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  score: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdUtc: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  post: z.lazy(() => PostUpdateOneRequiredWithoutCommentsNestedInputObjectSchema).optional(),
  replies: z.lazy(() => CommentUpdateManyWithoutParentCommentNestedInputObjectSchema).optional(),
  files: z.lazy(() => FileUpdateManyWithoutCommentNestedInputObjectSchema).optional()
}).strict();
export const CommentUpdateWithoutParentCommentInputObjectSchema: z.ZodType<Prisma.CommentUpdateWithoutParentCommentInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentUpdateWithoutParentCommentInput>;
export const CommentUpdateWithoutParentCommentInputObjectZodSchema = makeSchema();
