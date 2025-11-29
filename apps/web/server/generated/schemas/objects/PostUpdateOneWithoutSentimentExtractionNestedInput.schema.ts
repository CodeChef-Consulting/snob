import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PostCreateWithoutSentimentExtractionInputObjectSchema as PostCreateWithoutSentimentExtractionInputObjectSchema } from './PostCreateWithoutSentimentExtractionInput.schema';
import { PostUncheckedCreateWithoutSentimentExtractionInputObjectSchema as PostUncheckedCreateWithoutSentimentExtractionInputObjectSchema } from './PostUncheckedCreateWithoutSentimentExtractionInput.schema';
import { PostCreateOrConnectWithoutSentimentExtractionInputObjectSchema as PostCreateOrConnectWithoutSentimentExtractionInputObjectSchema } from './PostCreateOrConnectWithoutSentimentExtractionInput.schema';
import { PostUpsertWithoutSentimentExtractionInputObjectSchema as PostUpsertWithoutSentimentExtractionInputObjectSchema } from './PostUpsertWithoutSentimentExtractionInput.schema';
import { PostWhereInputObjectSchema as PostWhereInputObjectSchema } from './PostWhereInput.schema';
import { PostWhereUniqueInputObjectSchema as PostWhereUniqueInputObjectSchema } from './PostWhereUniqueInput.schema';
import { PostUpdateToOneWithWhereWithoutSentimentExtractionInputObjectSchema as PostUpdateToOneWithWhereWithoutSentimentExtractionInputObjectSchema } from './PostUpdateToOneWithWhereWithoutSentimentExtractionInput.schema';
import { PostUpdateWithoutSentimentExtractionInputObjectSchema as PostUpdateWithoutSentimentExtractionInputObjectSchema } from './PostUpdateWithoutSentimentExtractionInput.schema';
import { PostUncheckedUpdateWithoutSentimentExtractionInputObjectSchema as PostUncheckedUpdateWithoutSentimentExtractionInputObjectSchema } from './PostUncheckedUpdateWithoutSentimentExtractionInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PostCreateWithoutSentimentExtractionInputObjectSchema), z.lazy(() => PostUncheckedCreateWithoutSentimentExtractionInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => PostCreateOrConnectWithoutSentimentExtractionInputObjectSchema).optional(),
  upsert: z.lazy(() => PostUpsertWithoutSentimentExtractionInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => PostWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => PostWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => PostWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => PostUpdateToOneWithWhereWithoutSentimentExtractionInputObjectSchema), z.lazy(() => PostUpdateWithoutSentimentExtractionInputObjectSchema), z.lazy(() => PostUncheckedUpdateWithoutSentimentExtractionInputObjectSchema)]).optional()
}).strict();
export const PostUpdateOneWithoutSentimentExtractionNestedInputObjectSchema: z.ZodType<Prisma.PostUpdateOneWithoutSentimentExtractionNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.PostUpdateOneWithoutSentimentExtractionNestedInput>;
export const PostUpdateOneWithoutSentimentExtractionNestedInputObjectZodSchema = makeSchema();
