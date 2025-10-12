import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SentimentExtractionWhereInputObjectSchema as SentimentExtractionWhereInputObjectSchema } from './SentimentExtractionWhereInput.schema';
import { SentimentExtractionUpdateWithoutPostInputObjectSchema as SentimentExtractionUpdateWithoutPostInputObjectSchema } from './SentimentExtractionUpdateWithoutPostInput.schema';
import { SentimentExtractionUncheckedUpdateWithoutPostInputObjectSchema as SentimentExtractionUncheckedUpdateWithoutPostInputObjectSchema } from './SentimentExtractionUncheckedUpdateWithoutPostInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => SentimentExtractionWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => SentimentExtractionUpdateWithoutPostInputObjectSchema), z.lazy(() => SentimentExtractionUncheckedUpdateWithoutPostInputObjectSchema)])
}).strict();
export const SentimentExtractionUpdateToOneWithWhereWithoutPostInputObjectSchema: z.ZodType<Prisma.SentimentExtractionUpdateToOneWithWhereWithoutPostInput> = makeSchema() as unknown as z.ZodType<Prisma.SentimentExtractionUpdateToOneWithWhereWithoutPostInput>;
export const SentimentExtractionUpdateToOneWithWhereWithoutPostInputObjectZodSchema = makeSchema();
