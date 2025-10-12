import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentWhereUniqueInputObjectSchema as CommentWhereUniqueInputObjectSchema } from './CommentWhereUniqueInput.schema';
import { CommentCreateWithoutSentimentExtractionInputObjectSchema as CommentCreateWithoutSentimentExtractionInputObjectSchema } from './CommentCreateWithoutSentimentExtractionInput.schema';
import { CommentUncheckedCreateWithoutSentimentExtractionInputObjectSchema as CommentUncheckedCreateWithoutSentimentExtractionInputObjectSchema } from './CommentUncheckedCreateWithoutSentimentExtractionInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CommentWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CommentCreateWithoutSentimentExtractionInputObjectSchema), z.lazy(() => CommentUncheckedCreateWithoutSentimentExtractionInputObjectSchema)])
}).strict();
export const CommentCreateOrConnectWithoutSentimentExtractionInputObjectSchema: z.ZodType<Prisma.CommentCreateOrConnectWithoutSentimentExtractionInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentCreateOrConnectWithoutSentimentExtractionInput>;
export const CommentCreateOrConnectWithoutSentimentExtractionInputObjectZodSchema = makeSchema();
