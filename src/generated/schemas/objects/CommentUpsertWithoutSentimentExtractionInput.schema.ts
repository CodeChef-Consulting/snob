import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentUpdateWithoutSentimentExtractionInputObjectSchema as CommentUpdateWithoutSentimentExtractionInputObjectSchema } from './CommentUpdateWithoutSentimentExtractionInput.schema';
import { CommentUncheckedUpdateWithoutSentimentExtractionInputObjectSchema as CommentUncheckedUpdateWithoutSentimentExtractionInputObjectSchema } from './CommentUncheckedUpdateWithoutSentimentExtractionInput.schema';
import { CommentCreateWithoutSentimentExtractionInputObjectSchema as CommentCreateWithoutSentimentExtractionInputObjectSchema } from './CommentCreateWithoutSentimentExtractionInput.schema';
import { CommentUncheckedCreateWithoutSentimentExtractionInputObjectSchema as CommentUncheckedCreateWithoutSentimentExtractionInputObjectSchema } from './CommentUncheckedCreateWithoutSentimentExtractionInput.schema';
import { CommentWhereInputObjectSchema as CommentWhereInputObjectSchema } from './CommentWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => CommentUpdateWithoutSentimentExtractionInputObjectSchema), z.lazy(() => CommentUncheckedUpdateWithoutSentimentExtractionInputObjectSchema)]),
  create: z.union([z.lazy(() => CommentCreateWithoutSentimentExtractionInputObjectSchema), z.lazy(() => CommentUncheckedCreateWithoutSentimentExtractionInputObjectSchema)]),
  where: z.lazy(() => CommentWhereInputObjectSchema).optional()
}).strict();
export const CommentUpsertWithoutSentimentExtractionInputObjectSchema: z.ZodType<Prisma.CommentUpsertWithoutSentimentExtractionInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentUpsertWithoutSentimentExtractionInput>;
export const CommentUpsertWithoutSentimentExtractionInputObjectZodSchema = makeSchema();
