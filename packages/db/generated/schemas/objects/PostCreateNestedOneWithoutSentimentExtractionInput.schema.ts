import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PostCreateWithoutSentimentExtractionInputObjectSchema as PostCreateWithoutSentimentExtractionInputObjectSchema } from './PostCreateWithoutSentimentExtractionInput.schema';
import { PostUncheckedCreateWithoutSentimentExtractionInputObjectSchema as PostUncheckedCreateWithoutSentimentExtractionInputObjectSchema } from './PostUncheckedCreateWithoutSentimentExtractionInput.schema';
import { PostCreateOrConnectWithoutSentimentExtractionInputObjectSchema as PostCreateOrConnectWithoutSentimentExtractionInputObjectSchema } from './PostCreateOrConnectWithoutSentimentExtractionInput.schema';
import { PostWhereUniqueInputObjectSchema as PostWhereUniqueInputObjectSchema } from './PostWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PostCreateWithoutSentimentExtractionInputObjectSchema), z.lazy(() => PostUncheckedCreateWithoutSentimentExtractionInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => PostCreateOrConnectWithoutSentimentExtractionInputObjectSchema).optional(),
  connect: z.lazy(() => PostWhereUniqueInputObjectSchema).optional()
}).strict();
export const PostCreateNestedOneWithoutSentimentExtractionInputObjectSchema: z.ZodType<Prisma.PostCreateNestedOneWithoutSentimentExtractionInput> = makeSchema() as unknown as z.ZodType<Prisma.PostCreateNestedOneWithoutSentimentExtractionInput>;
export const PostCreateNestedOneWithoutSentimentExtractionInputObjectZodSchema = makeSchema();
