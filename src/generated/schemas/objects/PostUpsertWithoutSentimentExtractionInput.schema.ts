import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PostUpdateWithoutSentimentExtractionInputObjectSchema as PostUpdateWithoutSentimentExtractionInputObjectSchema } from './PostUpdateWithoutSentimentExtractionInput.schema';
import { PostUncheckedUpdateWithoutSentimentExtractionInputObjectSchema as PostUncheckedUpdateWithoutSentimentExtractionInputObjectSchema } from './PostUncheckedUpdateWithoutSentimentExtractionInput.schema';
import { PostCreateWithoutSentimentExtractionInputObjectSchema as PostCreateWithoutSentimentExtractionInputObjectSchema } from './PostCreateWithoutSentimentExtractionInput.schema';
import { PostUncheckedCreateWithoutSentimentExtractionInputObjectSchema as PostUncheckedCreateWithoutSentimentExtractionInputObjectSchema } from './PostUncheckedCreateWithoutSentimentExtractionInput.schema';
import { PostWhereInputObjectSchema as PostWhereInputObjectSchema } from './PostWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => PostUpdateWithoutSentimentExtractionInputObjectSchema), z.lazy(() => PostUncheckedUpdateWithoutSentimentExtractionInputObjectSchema)]),
  create: z.union([z.lazy(() => PostCreateWithoutSentimentExtractionInputObjectSchema), z.lazy(() => PostUncheckedCreateWithoutSentimentExtractionInputObjectSchema)]),
  where: z.lazy(() => PostWhereInputObjectSchema).optional()
}).strict();
export const PostUpsertWithoutSentimentExtractionInputObjectSchema: z.ZodType<Prisma.PostUpsertWithoutSentimentExtractionInput> = makeSchema() as unknown as z.ZodType<Prisma.PostUpsertWithoutSentimentExtractionInput>;
export const PostUpsertWithoutSentimentExtractionInputObjectZodSchema = makeSchema();
