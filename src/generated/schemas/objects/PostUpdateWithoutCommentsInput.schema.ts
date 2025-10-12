import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { NullableIntFieldUpdateOperationsInputObjectSchema as NullableIntFieldUpdateOperationsInputObjectSchema } from './NullableIntFieldUpdateOperationsInput.schema';
import { NullableFloatFieldUpdateOperationsInputObjectSchema as NullableFloatFieldUpdateOperationsInputObjectSchema } from './NullableFloatFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema as NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema as BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { ScrapingSessionUpdateOneWithoutPostsNestedInputObjectSchema as ScrapingSessionUpdateOneWithoutPostsNestedInputObjectSchema } from './ScrapingSessionUpdateOneWithoutPostsNestedInput.schema';
import { FileUpdateManyWithoutPostNestedInputObjectSchema as FileUpdateManyWithoutPostNestedInputObjectSchema } from './FileUpdateManyWithoutPostNestedInput.schema';
import { RestaurantUpdateManyWithoutPostsNestedInputObjectSchema as RestaurantUpdateManyWithoutPostsNestedInputObjectSchema } from './RestaurantUpdateManyWithoutPostsNestedInput.schema';
import { RestaurantExtractionUpdateOneWithoutPostNestedInputObjectSchema as RestaurantExtractionUpdateOneWithoutPostNestedInputObjectSchema } from './RestaurantExtractionUpdateOneWithoutPostNestedInput.schema';
import { SentimentExtractionUpdateOneWithoutPostNestedInputObjectSchema as SentimentExtractionUpdateOneWithoutPostNestedInputObjectSchema } from './SentimentExtractionUpdateOneWithoutPostNestedInput.schema'

const makeSchema = () => z.object({
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
  scrapingSession: z.lazy(() => ScrapingSessionUpdateOneWithoutPostsNestedInputObjectSchema).optional(),
  files: z.lazy(() => FileUpdateManyWithoutPostNestedInputObjectSchema).optional(),
  restaurantsMentioned: z.lazy(() => RestaurantUpdateManyWithoutPostsNestedInputObjectSchema).optional(),
  restaurantExtraction: z.lazy(() => RestaurantExtractionUpdateOneWithoutPostNestedInputObjectSchema).optional(),
  sentimentExtraction: z.lazy(() => SentimentExtractionUpdateOneWithoutPostNestedInputObjectSchema).optional()
}).strict();
export const PostUpdateWithoutCommentsInputObjectSchema: z.ZodType<Prisma.PostUpdateWithoutCommentsInput> = makeSchema() as unknown as z.ZodType<Prisma.PostUpdateWithoutCommentsInput>;
export const PostUpdateWithoutCommentsInputObjectZodSchema = makeSchema();
