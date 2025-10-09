import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { NullableIntFieldUpdateOperationsInputObjectSchema as NullableIntFieldUpdateOperationsInputObjectSchema } from './NullableIntFieldUpdateOperationsInput.schema';
import { NullableBoolFieldUpdateOperationsInputObjectSchema as NullableBoolFieldUpdateOperationsInputObjectSchema } from './NullableBoolFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema as NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { PostUpdateOneRequiredWithoutCommentsNestedInputObjectSchema as PostUpdateOneRequiredWithoutCommentsNestedInputObjectSchema } from './PostUpdateOneRequiredWithoutCommentsNestedInput.schema';
import { CommentUpdateOneWithoutRepliesNestedInputObjectSchema as CommentUpdateOneWithoutRepliesNestedInputObjectSchema } from './CommentUpdateOneWithoutRepliesNestedInput.schema';
import { CommentUpdateManyWithoutParentCommentNestedInputObjectSchema as CommentUpdateManyWithoutParentCommentNestedInputObjectSchema } from './CommentUpdateManyWithoutParentCommentNestedInput.schema';
import { ScrapingSessionUpdateOneWithoutCommentsNestedInputObjectSchema as ScrapingSessionUpdateOneWithoutCommentsNestedInputObjectSchema } from './ScrapingSessionUpdateOneWithoutCommentsNestedInput.schema';
import { FileUpdateManyWithoutCommentNestedInputObjectSchema as FileUpdateManyWithoutCommentNestedInputObjectSchema } from './FileUpdateManyWithoutCommentNestedInput.schema';
import { RestaurantExtractionUpdateOneWithoutCommentNestedInputObjectSchema as RestaurantExtractionUpdateOneWithoutCommentNestedInputObjectSchema } from './RestaurantExtractionUpdateOneWithoutCommentNestedInput.schema'

const makeSchema = () => z.object({
  externalId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
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
  post: z.lazy(() => PostUpdateOneRequiredWithoutCommentsNestedInputObjectSchema).optional(),
  parentComment: z.lazy(() => CommentUpdateOneWithoutRepliesNestedInputObjectSchema).optional(),
  replies: z.lazy(() => CommentUpdateManyWithoutParentCommentNestedInputObjectSchema).optional(),
  scrapingSession: z.lazy(() => ScrapingSessionUpdateOneWithoutCommentsNestedInputObjectSchema).optional(),
  files: z.lazy(() => FileUpdateManyWithoutCommentNestedInputObjectSchema).optional(),
  restaurantExtraction: z.lazy(() => RestaurantExtractionUpdateOneWithoutCommentNestedInputObjectSchema).optional()
}).strict();
export const CommentUpdateWithoutRestaurantsMentionedInputObjectSchema: z.ZodType<Prisma.CommentUpdateWithoutRestaurantsMentionedInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentUpdateWithoutRestaurantsMentionedInput>;
export const CommentUpdateWithoutRestaurantsMentionedInputObjectZodSchema = makeSchema();
