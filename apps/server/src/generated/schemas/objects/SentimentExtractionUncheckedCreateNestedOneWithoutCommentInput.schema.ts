import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SentimentExtractionCreateWithoutCommentInputObjectSchema as SentimentExtractionCreateWithoutCommentInputObjectSchema } from './SentimentExtractionCreateWithoutCommentInput.schema';
import { SentimentExtractionUncheckedCreateWithoutCommentInputObjectSchema as SentimentExtractionUncheckedCreateWithoutCommentInputObjectSchema } from './SentimentExtractionUncheckedCreateWithoutCommentInput.schema';
import { SentimentExtractionCreateOrConnectWithoutCommentInputObjectSchema as SentimentExtractionCreateOrConnectWithoutCommentInputObjectSchema } from './SentimentExtractionCreateOrConnectWithoutCommentInput.schema';
import { SentimentExtractionWhereUniqueInputObjectSchema as SentimentExtractionWhereUniqueInputObjectSchema } from './SentimentExtractionWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => SentimentExtractionCreateWithoutCommentInputObjectSchema), z.lazy(() => SentimentExtractionUncheckedCreateWithoutCommentInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => SentimentExtractionCreateOrConnectWithoutCommentInputObjectSchema).optional(),
  connect: z.lazy(() => SentimentExtractionWhereUniqueInputObjectSchema).optional()
}).strict();
export const SentimentExtractionUncheckedCreateNestedOneWithoutCommentInputObjectSchema: z.ZodType<Prisma.SentimentExtractionUncheckedCreateNestedOneWithoutCommentInput> = makeSchema() as unknown as z.ZodType<Prisma.SentimentExtractionUncheckedCreateNestedOneWithoutCommentInput>;
export const SentimentExtractionUncheckedCreateNestedOneWithoutCommentInputObjectZodSchema = makeSchema();
