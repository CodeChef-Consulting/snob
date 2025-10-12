import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FloatFieldUpdateOperationsInputObjectSchema as FloatFieldUpdateOperationsInputObjectSchema } from './FloatFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { PostUpdateOneWithoutSentimentExtractionNestedInputObjectSchema as PostUpdateOneWithoutSentimentExtractionNestedInputObjectSchema } from './PostUpdateOneWithoutSentimentExtractionNestedInput.schema';
import { CommentUpdateOneWithoutSentimentExtractionNestedInputObjectSchema as CommentUpdateOneWithoutSentimentExtractionNestedInputObjectSchema } from './CommentUpdateOneWithoutSentimentExtractionNestedInput.schema'

const makeSchema = () => z.object({
  rawAiScore: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputObjectSchema)]).optional(),
  extractedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  model: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  post: z.lazy(() => PostUpdateOneWithoutSentimentExtractionNestedInputObjectSchema).optional(),
  comment: z.lazy(() => CommentUpdateOneWithoutSentimentExtractionNestedInputObjectSchema).optional()
}).strict();
export const SentimentExtractionUpdateInputObjectSchema: z.ZodType<Prisma.SentimentExtractionUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.SentimentExtractionUpdateInput>;
export const SentimentExtractionUpdateInputObjectZodSchema = makeSchema();
