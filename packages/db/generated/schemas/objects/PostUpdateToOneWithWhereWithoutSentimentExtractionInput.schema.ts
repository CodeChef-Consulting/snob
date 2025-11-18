import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PostWhereInputObjectSchema as PostWhereInputObjectSchema } from './PostWhereInput.schema';
import { PostUpdateWithoutSentimentExtractionInputObjectSchema as PostUpdateWithoutSentimentExtractionInputObjectSchema } from './PostUpdateWithoutSentimentExtractionInput.schema';
import { PostUncheckedUpdateWithoutSentimentExtractionInputObjectSchema as PostUncheckedUpdateWithoutSentimentExtractionInputObjectSchema } from './PostUncheckedUpdateWithoutSentimentExtractionInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PostWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => PostUpdateWithoutSentimentExtractionInputObjectSchema), z.lazy(() => PostUncheckedUpdateWithoutSentimentExtractionInputObjectSchema)])
}).strict();
export const PostUpdateToOneWithWhereWithoutSentimentExtractionInputObjectSchema: z.ZodType<Prisma.PostUpdateToOneWithWhereWithoutSentimentExtractionInput> = makeSchema() as unknown as z.ZodType<Prisma.PostUpdateToOneWithWhereWithoutSentimentExtractionInput>;
export const PostUpdateToOneWithWhereWithoutSentimentExtractionInputObjectZodSchema = makeSchema();
