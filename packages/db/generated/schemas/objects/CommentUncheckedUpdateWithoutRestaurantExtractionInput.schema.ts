import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableIntFieldUpdateOperationsInputObjectSchema as NullableIntFieldUpdateOperationsInputObjectSchema } from './NullableIntFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { NullableBoolFieldUpdateOperationsInputObjectSchema as NullableBoolFieldUpdateOperationsInputObjectSchema } from './NullableBoolFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema as NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { CommentUncheckedUpdateManyWithoutParentCommentNestedInputObjectSchema as CommentUncheckedUpdateManyWithoutParentCommentNestedInputObjectSchema } from './CommentUncheckedUpdateManyWithoutParentCommentNestedInput.schema';
import { FileUncheckedUpdateManyWithoutCommentNestedInputObjectSchema as FileUncheckedUpdateManyWithoutCommentNestedInputObjectSchema } from './FileUncheckedUpdateManyWithoutCommentNestedInput.schema';
import { RestaurantUncheckedUpdateManyWithoutCommentsNestedInputObjectSchema as RestaurantUncheckedUpdateManyWithoutCommentsNestedInputObjectSchema } from './RestaurantUncheckedUpdateManyWithoutCommentsNestedInput.schema';
import { SentimentExtractionUncheckedUpdateOneWithoutCommentNestedInputObjectSchema as SentimentExtractionUncheckedUpdateOneWithoutCommentNestedInputObjectSchema } from './SentimentExtractionUncheckedUpdateOneWithoutCommentNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  externalId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  postId: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  parentCommentId: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  author: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  body: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  score: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  ups: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  depth: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  controversiality: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  isSubmitter: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  scoreHidden: z.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  permalink: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdUtc: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  scrapingSessionId: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  replies: z.lazy(() => CommentUncheckedUpdateManyWithoutParentCommentNestedInputObjectSchema).optional(),
  files: z.lazy(() => FileUncheckedUpdateManyWithoutCommentNestedInputObjectSchema).optional(),
  restaurantsMentioned: z.lazy(() => RestaurantUncheckedUpdateManyWithoutCommentsNestedInputObjectSchema).optional(),
  sentimentExtraction: z.lazy(() => SentimentExtractionUncheckedUpdateOneWithoutCommentNestedInputObjectSchema).optional()
}).strict();
export const CommentUncheckedUpdateWithoutRestaurantExtractionInputObjectSchema: z.ZodType<Prisma.CommentUncheckedUpdateWithoutRestaurantExtractionInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentUncheckedUpdateWithoutRestaurantExtractionInput>;
export const CommentUncheckedUpdateWithoutRestaurantExtractionInputObjectZodSchema = makeSchema();
