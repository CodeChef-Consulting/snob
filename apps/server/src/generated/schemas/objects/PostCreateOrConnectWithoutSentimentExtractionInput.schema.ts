import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PostWhereUniqueInputObjectSchema as PostWhereUniqueInputObjectSchema } from './PostWhereUniqueInput.schema';
import { PostCreateWithoutSentimentExtractionInputObjectSchema as PostCreateWithoutSentimentExtractionInputObjectSchema } from './PostCreateWithoutSentimentExtractionInput.schema';
import { PostUncheckedCreateWithoutSentimentExtractionInputObjectSchema as PostUncheckedCreateWithoutSentimentExtractionInputObjectSchema } from './PostUncheckedCreateWithoutSentimentExtractionInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PostWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => PostCreateWithoutSentimentExtractionInputObjectSchema), z.lazy(() => PostUncheckedCreateWithoutSentimentExtractionInputObjectSchema)])
}).strict();
export const PostCreateOrConnectWithoutSentimentExtractionInputObjectSchema: z.ZodType<Prisma.PostCreateOrConnectWithoutSentimentExtractionInput> = makeSchema() as unknown as z.ZodType<Prisma.PostCreateOrConnectWithoutSentimentExtractionInput>;
export const PostCreateOrConnectWithoutSentimentExtractionInputObjectZodSchema = makeSchema();
