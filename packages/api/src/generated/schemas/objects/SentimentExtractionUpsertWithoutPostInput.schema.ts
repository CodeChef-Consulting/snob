import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SentimentExtractionUpdateWithoutPostInputObjectSchema as SentimentExtractionUpdateWithoutPostInputObjectSchema } from './SentimentExtractionUpdateWithoutPostInput.schema';
import { SentimentExtractionUncheckedUpdateWithoutPostInputObjectSchema as SentimentExtractionUncheckedUpdateWithoutPostInputObjectSchema } from './SentimentExtractionUncheckedUpdateWithoutPostInput.schema';
import { SentimentExtractionCreateWithoutPostInputObjectSchema as SentimentExtractionCreateWithoutPostInputObjectSchema } from './SentimentExtractionCreateWithoutPostInput.schema';
import { SentimentExtractionUncheckedCreateWithoutPostInputObjectSchema as SentimentExtractionUncheckedCreateWithoutPostInputObjectSchema } from './SentimentExtractionUncheckedCreateWithoutPostInput.schema';
import { SentimentExtractionWhereInputObjectSchema as SentimentExtractionWhereInputObjectSchema } from './SentimentExtractionWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => SentimentExtractionUpdateWithoutPostInputObjectSchema), z.lazy(() => SentimentExtractionUncheckedUpdateWithoutPostInputObjectSchema)]),
  create: z.union([z.lazy(() => SentimentExtractionCreateWithoutPostInputObjectSchema), z.lazy(() => SentimentExtractionUncheckedCreateWithoutPostInputObjectSchema)]),
  where: z.lazy(() => SentimentExtractionWhereInputObjectSchema).optional()
}).strict();
export const SentimentExtractionUpsertWithoutPostInputObjectSchema: z.ZodType<Prisma.SentimentExtractionUpsertWithoutPostInput> = makeSchema() as unknown as z.ZodType<Prisma.SentimentExtractionUpsertWithoutPostInput>;
export const SentimentExtractionUpsertWithoutPostInputObjectZodSchema = makeSchema();
