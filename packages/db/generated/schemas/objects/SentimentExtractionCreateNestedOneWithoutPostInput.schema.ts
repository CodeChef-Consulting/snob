import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SentimentExtractionCreateWithoutPostInputObjectSchema as SentimentExtractionCreateWithoutPostInputObjectSchema } from './SentimentExtractionCreateWithoutPostInput.schema';
import { SentimentExtractionUncheckedCreateWithoutPostInputObjectSchema as SentimentExtractionUncheckedCreateWithoutPostInputObjectSchema } from './SentimentExtractionUncheckedCreateWithoutPostInput.schema';
import { SentimentExtractionCreateOrConnectWithoutPostInputObjectSchema as SentimentExtractionCreateOrConnectWithoutPostInputObjectSchema } from './SentimentExtractionCreateOrConnectWithoutPostInput.schema';
import { SentimentExtractionWhereUniqueInputObjectSchema as SentimentExtractionWhereUniqueInputObjectSchema } from './SentimentExtractionWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => SentimentExtractionCreateWithoutPostInputObjectSchema), z.lazy(() => SentimentExtractionUncheckedCreateWithoutPostInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => SentimentExtractionCreateOrConnectWithoutPostInputObjectSchema).optional(),
  connect: z.lazy(() => SentimentExtractionWhereUniqueInputObjectSchema).optional()
}).strict();
export const SentimentExtractionCreateNestedOneWithoutPostInputObjectSchema: z.ZodType<Prisma.SentimentExtractionCreateNestedOneWithoutPostInput> = makeSchema() as unknown as z.ZodType<Prisma.SentimentExtractionCreateNestedOneWithoutPostInput>;
export const SentimentExtractionCreateNestedOneWithoutPostInputObjectZodSchema = makeSchema();
