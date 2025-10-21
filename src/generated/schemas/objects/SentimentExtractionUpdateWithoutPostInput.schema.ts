import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableFloatFieldUpdateOperationsInputObjectSchema as NullableFloatFieldUpdateOperationsInputObjectSchema } from './NullableFloatFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { CommentUpdateOneWithoutSentimentExtractionNestedInputObjectSchema as CommentUpdateOneWithoutSentimentExtractionNestedInputObjectSchema } from './CommentUpdateOneWithoutSentimentExtractionNestedInput.schema'

const makeSchema = () => z.object({
  rawAiScore: z.union([z.number(), z.lazy(() => NullableFloatFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  extractedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  model: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  comment: z.lazy(() => CommentUpdateOneWithoutSentimentExtractionNestedInputObjectSchema).optional()
}).strict();
export const SentimentExtractionUpdateWithoutPostInputObjectSchema: z.ZodType<Prisma.SentimentExtractionUpdateWithoutPostInput> = makeSchema() as unknown as z.ZodType<Prisma.SentimentExtractionUpdateWithoutPostInput>;
export const SentimentExtractionUpdateWithoutPostInputObjectZodSchema = makeSchema();
