import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentWhereInputObjectSchema as CommentWhereInputObjectSchema } from './CommentWhereInput.schema';
import { CommentUpdateWithoutSentimentExtractionInputObjectSchema as CommentUpdateWithoutSentimentExtractionInputObjectSchema } from './CommentUpdateWithoutSentimentExtractionInput.schema';
import { CommentUncheckedUpdateWithoutSentimentExtractionInputObjectSchema as CommentUncheckedUpdateWithoutSentimentExtractionInputObjectSchema } from './CommentUncheckedUpdateWithoutSentimentExtractionInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CommentWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => CommentUpdateWithoutSentimentExtractionInputObjectSchema), z.lazy(() => CommentUncheckedUpdateWithoutSentimentExtractionInputObjectSchema)])
}).strict();
export const CommentUpdateToOneWithWhereWithoutSentimentExtractionInputObjectSchema: z.ZodType<Prisma.CommentUpdateToOneWithWhereWithoutSentimentExtractionInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentUpdateToOneWithWhereWithoutSentimentExtractionInput>;
export const CommentUpdateToOneWithWhereWithoutSentimentExtractionInputObjectZodSchema = makeSchema();
