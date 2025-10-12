import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SentimentExtractionUpdateWithoutCommentInputObjectSchema as SentimentExtractionUpdateWithoutCommentInputObjectSchema } from './SentimentExtractionUpdateWithoutCommentInput.schema';
import { SentimentExtractionUncheckedUpdateWithoutCommentInputObjectSchema as SentimentExtractionUncheckedUpdateWithoutCommentInputObjectSchema } from './SentimentExtractionUncheckedUpdateWithoutCommentInput.schema';
import { SentimentExtractionCreateWithoutCommentInputObjectSchema as SentimentExtractionCreateWithoutCommentInputObjectSchema } from './SentimentExtractionCreateWithoutCommentInput.schema';
import { SentimentExtractionUncheckedCreateWithoutCommentInputObjectSchema as SentimentExtractionUncheckedCreateWithoutCommentInputObjectSchema } from './SentimentExtractionUncheckedCreateWithoutCommentInput.schema';
import { SentimentExtractionWhereInputObjectSchema as SentimentExtractionWhereInputObjectSchema } from './SentimentExtractionWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => SentimentExtractionUpdateWithoutCommentInputObjectSchema), z.lazy(() => SentimentExtractionUncheckedUpdateWithoutCommentInputObjectSchema)]),
  create: z.union([z.lazy(() => SentimentExtractionCreateWithoutCommentInputObjectSchema), z.lazy(() => SentimentExtractionUncheckedCreateWithoutCommentInputObjectSchema)]),
  where: z.lazy(() => SentimentExtractionWhereInputObjectSchema).optional()
}).strict();
export const SentimentExtractionUpsertWithoutCommentInputObjectSchema: z.ZodType<Prisma.SentimentExtractionUpsertWithoutCommentInput> = makeSchema() as unknown as z.ZodType<Prisma.SentimentExtractionUpsertWithoutCommentInput>;
export const SentimentExtractionUpsertWithoutCommentInputObjectZodSchema = makeSchema();
