import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { NullableIntFieldUpdateOperationsInputObjectSchema as NullableIntFieldUpdateOperationsInputObjectSchema } from './NullableIntFieldUpdateOperationsInput.schema';
import { CommentUpdaterestaurantsMentionedInputObjectSchema as CommentUpdaterestaurantsMentionedInputObjectSchema } from './CommentUpdaterestaurantsMentionedInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema as NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { PostUpdateOneRequiredWithoutCommentsNestedInputObjectSchema as PostUpdateOneRequiredWithoutCommentsNestedInputObjectSchema } from './PostUpdateOneRequiredWithoutCommentsNestedInput.schema';
import { CommentUpdateOneWithoutRepliesNestedInputObjectSchema as CommentUpdateOneWithoutRepliesNestedInputObjectSchema } from './CommentUpdateOneWithoutRepliesNestedInput.schema';
import { FileUpdateManyWithoutCommentNestedInputObjectSchema as FileUpdateManyWithoutCommentNestedInputObjectSchema } from './FileUpdateManyWithoutCommentNestedInput.schema'

const makeSchema = () => z.object({
  externalId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  author: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  body: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  score: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  restaurantsMentioned: z.union([z.lazy(() => CommentUpdaterestaurantsMentionedInputObjectSchema), z.string().array()]).optional(),
  createdUtc: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  post: z.lazy(() => PostUpdateOneRequiredWithoutCommentsNestedInputObjectSchema).optional(),
  parentComment: z.lazy(() => CommentUpdateOneWithoutRepliesNestedInputObjectSchema).optional(),
  files: z.lazy(() => FileUpdateManyWithoutCommentNestedInputObjectSchema).optional()
}).strict();
export const CommentUpdateWithoutRepliesInputObjectSchema: z.ZodType<Prisma.CommentUpdateWithoutRepliesInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentUpdateWithoutRepliesInput>;
export const CommentUpdateWithoutRepliesInputObjectZodSchema = makeSchema();
