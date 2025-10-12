import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SentimentExtractionWhereInputObjectSchema as SentimentExtractionWhereInputObjectSchema } from './SentimentExtractionWhereInput.schema';
import { SentimentExtractionUpdateWithoutCommentInputObjectSchema as SentimentExtractionUpdateWithoutCommentInputObjectSchema } from './SentimentExtractionUpdateWithoutCommentInput.schema';
import { SentimentExtractionUncheckedUpdateWithoutCommentInputObjectSchema as SentimentExtractionUncheckedUpdateWithoutCommentInputObjectSchema } from './SentimentExtractionUncheckedUpdateWithoutCommentInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => SentimentExtractionWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => SentimentExtractionUpdateWithoutCommentInputObjectSchema), z.lazy(() => SentimentExtractionUncheckedUpdateWithoutCommentInputObjectSchema)])
}).strict();
export const SentimentExtractionUpdateToOneWithWhereWithoutCommentInputObjectSchema: z.ZodType<Prisma.SentimentExtractionUpdateToOneWithWhereWithoutCommentInput> = makeSchema() as unknown as z.ZodType<Prisma.SentimentExtractionUpdateToOneWithWhereWithoutCommentInput>;
export const SentimentExtractionUpdateToOneWithWhereWithoutCommentInputObjectZodSchema = makeSchema();
