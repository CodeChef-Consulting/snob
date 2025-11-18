import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SentimentExtractionCreateWithoutPostInputObjectSchema as SentimentExtractionCreateWithoutPostInputObjectSchema } from './SentimentExtractionCreateWithoutPostInput.schema';
import { SentimentExtractionUncheckedCreateWithoutPostInputObjectSchema as SentimentExtractionUncheckedCreateWithoutPostInputObjectSchema } from './SentimentExtractionUncheckedCreateWithoutPostInput.schema';
import { SentimentExtractionCreateOrConnectWithoutPostInputObjectSchema as SentimentExtractionCreateOrConnectWithoutPostInputObjectSchema } from './SentimentExtractionCreateOrConnectWithoutPostInput.schema';
import { SentimentExtractionUpsertWithoutPostInputObjectSchema as SentimentExtractionUpsertWithoutPostInputObjectSchema } from './SentimentExtractionUpsertWithoutPostInput.schema';
import { SentimentExtractionWhereInputObjectSchema as SentimentExtractionWhereInputObjectSchema } from './SentimentExtractionWhereInput.schema';
import { SentimentExtractionWhereUniqueInputObjectSchema as SentimentExtractionWhereUniqueInputObjectSchema } from './SentimentExtractionWhereUniqueInput.schema';
import { SentimentExtractionUpdateToOneWithWhereWithoutPostInputObjectSchema as SentimentExtractionUpdateToOneWithWhereWithoutPostInputObjectSchema } from './SentimentExtractionUpdateToOneWithWhereWithoutPostInput.schema';
import { SentimentExtractionUpdateWithoutPostInputObjectSchema as SentimentExtractionUpdateWithoutPostInputObjectSchema } from './SentimentExtractionUpdateWithoutPostInput.schema';
import { SentimentExtractionUncheckedUpdateWithoutPostInputObjectSchema as SentimentExtractionUncheckedUpdateWithoutPostInputObjectSchema } from './SentimentExtractionUncheckedUpdateWithoutPostInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => SentimentExtractionCreateWithoutPostInputObjectSchema), z.lazy(() => SentimentExtractionUncheckedCreateWithoutPostInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => SentimentExtractionCreateOrConnectWithoutPostInputObjectSchema).optional(),
  upsert: z.lazy(() => SentimentExtractionUpsertWithoutPostInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => SentimentExtractionWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => SentimentExtractionWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => SentimentExtractionWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => SentimentExtractionUpdateToOneWithWhereWithoutPostInputObjectSchema), z.lazy(() => SentimentExtractionUpdateWithoutPostInputObjectSchema), z.lazy(() => SentimentExtractionUncheckedUpdateWithoutPostInputObjectSchema)]).optional()
}).strict();
export const SentimentExtractionUpdateOneWithoutPostNestedInputObjectSchema: z.ZodType<Prisma.SentimentExtractionUpdateOneWithoutPostNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.SentimentExtractionUpdateOneWithoutPostNestedInput>;
export const SentimentExtractionUpdateOneWithoutPostNestedInputObjectZodSchema = makeSchema();
