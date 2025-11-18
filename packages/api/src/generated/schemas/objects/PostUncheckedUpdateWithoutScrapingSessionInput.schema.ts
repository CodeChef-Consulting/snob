import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { NullableIntFieldUpdateOperationsInputObjectSchema as NullableIntFieldUpdateOperationsInputObjectSchema } from './NullableIntFieldUpdateOperationsInput.schema';
import { NullableFloatFieldUpdateOperationsInputObjectSchema as NullableFloatFieldUpdateOperationsInputObjectSchema } from './NullableFloatFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema as NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema as BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { CommentUncheckedUpdateManyWithoutPostNestedInputObjectSchema as CommentUncheckedUpdateManyWithoutPostNestedInputObjectSchema } from './CommentUncheckedUpdateManyWithoutPostNestedInput.schema';
import { FileUncheckedUpdateManyWithoutPostNestedInputObjectSchema as FileUncheckedUpdateManyWithoutPostNestedInputObjectSchema } from './FileUncheckedUpdateManyWithoutPostNestedInput.schema';
import { RestaurantUncheckedUpdateManyWithoutPostsNestedInputObjectSchema as RestaurantUncheckedUpdateManyWithoutPostsNestedInputObjectSchema } from './RestaurantUncheckedUpdateManyWithoutPostsNestedInput.schema';
import { RestaurantExtractionUncheckedUpdateOneWithoutPostNestedInputObjectSchema as RestaurantExtractionUncheckedUpdateOneWithoutPostNestedInputObjectSchema } from './RestaurantExtractionUncheckedUpdateOneWithoutPostNestedInput.schema';
import { SentimentExtractionUncheckedUpdateOneWithoutPostNestedInputObjectSchema as SentimentExtractionUncheckedUpdateOneWithoutPostNestedInputObjectSchema } from './SentimentExtractionUncheckedUpdateOneWithoutPostNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  externalId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  subreddit: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  author: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  title: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  body: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  score: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  ups: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  downs: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  upvoteRatio: z.union([z.number(), z.lazy(() => NullableFloatFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  numComments: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  gilded: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  permalink: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdUtc: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  commentsLastScrapedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  commentsFullyScraped: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  comments: z.lazy(() => CommentUncheckedUpdateManyWithoutPostNestedInputObjectSchema).optional(),
  files: z.lazy(() => FileUncheckedUpdateManyWithoutPostNestedInputObjectSchema).optional(),
  restaurantsMentioned: z.lazy(() => RestaurantUncheckedUpdateManyWithoutPostsNestedInputObjectSchema).optional(),
  restaurantExtraction: z.lazy(() => RestaurantExtractionUncheckedUpdateOneWithoutPostNestedInputObjectSchema).optional(),
  sentimentExtraction: z.lazy(() => SentimentExtractionUncheckedUpdateOneWithoutPostNestedInputObjectSchema).optional()
}).strict();
export const PostUncheckedUpdateWithoutScrapingSessionInputObjectSchema: z.ZodType<Prisma.PostUncheckedUpdateWithoutScrapingSessionInput> = makeSchema() as unknown as z.ZodType<Prisma.PostUncheckedUpdateWithoutScrapingSessionInput>;
export const PostUncheckedUpdateWithoutScrapingSessionInputObjectZodSchema = makeSchema();
