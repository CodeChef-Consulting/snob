import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SentimentExtractionWhereUniqueInputObjectSchema as SentimentExtractionWhereUniqueInputObjectSchema } from './SentimentExtractionWhereUniqueInput.schema';
import { SentimentExtractionCreateWithoutPostInputObjectSchema as SentimentExtractionCreateWithoutPostInputObjectSchema } from './SentimentExtractionCreateWithoutPostInput.schema';
import { SentimentExtractionUncheckedCreateWithoutPostInputObjectSchema as SentimentExtractionUncheckedCreateWithoutPostInputObjectSchema } from './SentimentExtractionUncheckedCreateWithoutPostInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => SentimentExtractionWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => SentimentExtractionCreateWithoutPostInputObjectSchema), z.lazy(() => SentimentExtractionUncheckedCreateWithoutPostInputObjectSchema)])
}).strict();
export const SentimentExtractionCreateOrConnectWithoutPostInputObjectSchema: z.ZodType<Prisma.SentimentExtractionCreateOrConnectWithoutPostInput> = makeSchema() as unknown as z.ZodType<Prisma.SentimentExtractionCreateOrConnectWithoutPostInput>;
export const SentimentExtractionCreateOrConnectWithoutPostInputObjectZodSchema = makeSchema();
