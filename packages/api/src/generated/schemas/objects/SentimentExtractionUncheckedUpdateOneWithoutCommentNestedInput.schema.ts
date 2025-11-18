import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SentimentExtractionCreateWithoutCommentInputObjectSchema as SentimentExtractionCreateWithoutCommentInputObjectSchema } from './SentimentExtractionCreateWithoutCommentInput.schema';
import { SentimentExtractionUncheckedCreateWithoutCommentInputObjectSchema as SentimentExtractionUncheckedCreateWithoutCommentInputObjectSchema } from './SentimentExtractionUncheckedCreateWithoutCommentInput.schema';
import { SentimentExtractionCreateOrConnectWithoutCommentInputObjectSchema as SentimentExtractionCreateOrConnectWithoutCommentInputObjectSchema } from './SentimentExtractionCreateOrConnectWithoutCommentInput.schema';
import { SentimentExtractionUpsertWithoutCommentInputObjectSchema as SentimentExtractionUpsertWithoutCommentInputObjectSchema } from './SentimentExtractionUpsertWithoutCommentInput.schema';
import { SentimentExtractionWhereInputObjectSchema as SentimentExtractionWhereInputObjectSchema } from './SentimentExtractionWhereInput.schema';
import { SentimentExtractionWhereUniqueInputObjectSchema as SentimentExtractionWhereUniqueInputObjectSchema } from './SentimentExtractionWhereUniqueInput.schema';
import { SentimentExtractionUpdateToOneWithWhereWithoutCommentInputObjectSchema as SentimentExtractionUpdateToOneWithWhereWithoutCommentInputObjectSchema } from './SentimentExtractionUpdateToOneWithWhereWithoutCommentInput.schema';
import { SentimentExtractionUpdateWithoutCommentInputObjectSchema as SentimentExtractionUpdateWithoutCommentInputObjectSchema } from './SentimentExtractionUpdateWithoutCommentInput.schema';
import { SentimentExtractionUncheckedUpdateWithoutCommentInputObjectSchema as SentimentExtractionUncheckedUpdateWithoutCommentInputObjectSchema } from './SentimentExtractionUncheckedUpdateWithoutCommentInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => SentimentExtractionCreateWithoutCommentInputObjectSchema), z.lazy(() => SentimentExtractionUncheckedCreateWithoutCommentInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => SentimentExtractionCreateOrConnectWithoutCommentInputObjectSchema).optional(),
  upsert: z.lazy(() => SentimentExtractionUpsertWithoutCommentInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => SentimentExtractionWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => SentimentExtractionWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => SentimentExtractionWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => SentimentExtractionUpdateToOneWithWhereWithoutCommentInputObjectSchema), z.lazy(() => SentimentExtractionUpdateWithoutCommentInputObjectSchema), z.lazy(() => SentimentExtractionUncheckedUpdateWithoutCommentInputObjectSchema)]).optional()
}).strict();
export const SentimentExtractionUncheckedUpdateOneWithoutCommentNestedInputObjectSchema: z.ZodType<Prisma.SentimentExtractionUncheckedUpdateOneWithoutCommentNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.SentimentExtractionUncheckedUpdateOneWithoutCommentNestedInput>;
export const SentimentExtractionUncheckedUpdateOneWithoutCommentNestedInputObjectZodSchema = makeSchema();
