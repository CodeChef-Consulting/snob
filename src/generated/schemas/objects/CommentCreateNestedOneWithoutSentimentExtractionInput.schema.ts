import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentCreateWithoutSentimentExtractionInputObjectSchema as CommentCreateWithoutSentimentExtractionInputObjectSchema } from './CommentCreateWithoutSentimentExtractionInput.schema';
import { CommentUncheckedCreateWithoutSentimentExtractionInputObjectSchema as CommentUncheckedCreateWithoutSentimentExtractionInputObjectSchema } from './CommentUncheckedCreateWithoutSentimentExtractionInput.schema';
import { CommentCreateOrConnectWithoutSentimentExtractionInputObjectSchema as CommentCreateOrConnectWithoutSentimentExtractionInputObjectSchema } from './CommentCreateOrConnectWithoutSentimentExtractionInput.schema';
import { CommentWhereUniqueInputObjectSchema as CommentWhereUniqueInputObjectSchema } from './CommentWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CommentCreateWithoutSentimentExtractionInputObjectSchema), z.lazy(() => CommentUncheckedCreateWithoutSentimentExtractionInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CommentCreateOrConnectWithoutSentimentExtractionInputObjectSchema).optional(),
  connect: z.lazy(() => CommentWhereUniqueInputObjectSchema).optional()
}).strict();
export const CommentCreateNestedOneWithoutSentimentExtractionInputObjectSchema: z.ZodType<Prisma.CommentCreateNestedOneWithoutSentimentExtractionInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentCreateNestedOneWithoutSentimentExtractionInput>;
export const CommentCreateNestedOneWithoutSentimentExtractionInputObjectZodSchema = makeSchema();
