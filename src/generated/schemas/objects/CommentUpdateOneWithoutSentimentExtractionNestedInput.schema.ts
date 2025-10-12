import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentCreateWithoutSentimentExtractionInputObjectSchema as CommentCreateWithoutSentimentExtractionInputObjectSchema } from './CommentCreateWithoutSentimentExtractionInput.schema';
import { CommentUncheckedCreateWithoutSentimentExtractionInputObjectSchema as CommentUncheckedCreateWithoutSentimentExtractionInputObjectSchema } from './CommentUncheckedCreateWithoutSentimentExtractionInput.schema';
import { CommentCreateOrConnectWithoutSentimentExtractionInputObjectSchema as CommentCreateOrConnectWithoutSentimentExtractionInputObjectSchema } from './CommentCreateOrConnectWithoutSentimentExtractionInput.schema';
import { CommentUpsertWithoutSentimentExtractionInputObjectSchema as CommentUpsertWithoutSentimentExtractionInputObjectSchema } from './CommentUpsertWithoutSentimentExtractionInput.schema';
import { CommentWhereInputObjectSchema as CommentWhereInputObjectSchema } from './CommentWhereInput.schema';
import { CommentWhereUniqueInputObjectSchema as CommentWhereUniqueInputObjectSchema } from './CommentWhereUniqueInput.schema';
import { CommentUpdateToOneWithWhereWithoutSentimentExtractionInputObjectSchema as CommentUpdateToOneWithWhereWithoutSentimentExtractionInputObjectSchema } from './CommentUpdateToOneWithWhereWithoutSentimentExtractionInput.schema';
import { CommentUpdateWithoutSentimentExtractionInputObjectSchema as CommentUpdateWithoutSentimentExtractionInputObjectSchema } from './CommentUpdateWithoutSentimentExtractionInput.schema';
import { CommentUncheckedUpdateWithoutSentimentExtractionInputObjectSchema as CommentUncheckedUpdateWithoutSentimentExtractionInputObjectSchema } from './CommentUncheckedUpdateWithoutSentimentExtractionInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CommentCreateWithoutSentimentExtractionInputObjectSchema), z.lazy(() => CommentUncheckedCreateWithoutSentimentExtractionInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CommentCreateOrConnectWithoutSentimentExtractionInputObjectSchema).optional(),
  upsert: z.lazy(() => CommentUpsertWithoutSentimentExtractionInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => CommentWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => CommentWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => CommentWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => CommentUpdateToOneWithWhereWithoutSentimentExtractionInputObjectSchema), z.lazy(() => CommentUpdateWithoutSentimentExtractionInputObjectSchema), z.lazy(() => CommentUncheckedUpdateWithoutSentimentExtractionInputObjectSchema)]).optional()
}).strict();
export const CommentUpdateOneWithoutSentimentExtractionNestedInputObjectSchema: z.ZodType<Prisma.CommentUpdateOneWithoutSentimentExtractionNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentUpdateOneWithoutSentimentExtractionNestedInput>;
export const CommentUpdateOneWithoutSentimentExtractionNestedInputObjectZodSchema = makeSchema();
