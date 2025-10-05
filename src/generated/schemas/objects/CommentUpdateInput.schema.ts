import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { NullableIntFieldUpdateOperationsInputObjectSchema as NullableIntFieldUpdateOperationsInputObjectSchema } from './NullableIntFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema as NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { PostUpdateOneRequiredWithoutCommentsNestedInputObjectSchema as PostUpdateOneRequiredWithoutCommentsNestedInputObjectSchema } from './PostUpdateOneRequiredWithoutCommentsNestedInput.schema';
import { CommentUpdateOneWithoutRepliesNestedInputObjectSchema as CommentUpdateOneWithoutRepliesNestedInputObjectSchema } from './CommentUpdateOneWithoutRepliesNestedInput.schema';
import { CommentUpdateManyWithoutParentCommentNestedInputObjectSchema as CommentUpdateManyWithoutParentCommentNestedInputObjectSchema } from './CommentUpdateManyWithoutParentCommentNestedInput.schema';
import { FileUpdateManyWithoutCommentNestedInputObjectSchema as FileUpdateManyWithoutCommentNestedInputObjectSchema } from './FileUpdateManyWithoutCommentNestedInput.schema';
import { RestaurantUpdateManyWithoutCommentsNestedInputObjectSchema as RestaurantUpdateManyWithoutCommentsNestedInputObjectSchema } from './RestaurantUpdateManyWithoutCommentsNestedInput.schema'

const makeSchema = () => z.object({
  externalId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  author: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  body: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  score: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdUtc: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  post: z.lazy(() => PostUpdateOneRequiredWithoutCommentsNestedInputObjectSchema).optional(),
  parentComment: z.lazy(() => CommentUpdateOneWithoutRepliesNestedInputObjectSchema).optional(),
  replies: z.lazy(() => CommentUpdateManyWithoutParentCommentNestedInputObjectSchema).optional(),
  files: z.lazy(() => FileUpdateManyWithoutCommentNestedInputObjectSchema).optional(),
  restaurantsMentioned: z.lazy(() => RestaurantUpdateManyWithoutCommentsNestedInputObjectSchema).optional()
}).strict();
export const CommentUpdateInputObjectSchema: z.ZodType<Prisma.CommentUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentUpdateInput>;
export const CommentUpdateInputObjectZodSchema = makeSchema();
