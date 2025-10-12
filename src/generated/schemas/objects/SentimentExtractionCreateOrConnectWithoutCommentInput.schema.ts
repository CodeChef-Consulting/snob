import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SentimentExtractionWhereUniqueInputObjectSchema as SentimentExtractionWhereUniqueInputObjectSchema } from './SentimentExtractionWhereUniqueInput.schema';
import { SentimentExtractionCreateWithoutCommentInputObjectSchema as SentimentExtractionCreateWithoutCommentInputObjectSchema } from './SentimentExtractionCreateWithoutCommentInput.schema';
import { SentimentExtractionUncheckedCreateWithoutCommentInputObjectSchema as SentimentExtractionUncheckedCreateWithoutCommentInputObjectSchema } from './SentimentExtractionUncheckedCreateWithoutCommentInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => SentimentExtractionWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => SentimentExtractionCreateWithoutCommentInputObjectSchema), z.lazy(() => SentimentExtractionUncheckedCreateWithoutCommentInputObjectSchema)])
}).strict();
export const SentimentExtractionCreateOrConnectWithoutCommentInputObjectSchema: z.ZodType<Prisma.SentimentExtractionCreateOrConnectWithoutCommentInput> = makeSchema() as unknown as z.ZodType<Prisma.SentimentExtractionCreateOrConnectWithoutCommentInput>;
export const SentimentExtractionCreateOrConnectWithoutCommentInputObjectZodSchema = makeSchema();
