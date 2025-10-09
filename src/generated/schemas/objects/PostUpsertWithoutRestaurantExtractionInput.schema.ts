import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PostUpdateWithoutRestaurantExtractionInputObjectSchema as PostUpdateWithoutRestaurantExtractionInputObjectSchema } from './PostUpdateWithoutRestaurantExtractionInput.schema';
import { PostUncheckedUpdateWithoutRestaurantExtractionInputObjectSchema as PostUncheckedUpdateWithoutRestaurantExtractionInputObjectSchema } from './PostUncheckedUpdateWithoutRestaurantExtractionInput.schema';
import { PostCreateWithoutRestaurantExtractionInputObjectSchema as PostCreateWithoutRestaurantExtractionInputObjectSchema } from './PostCreateWithoutRestaurantExtractionInput.schema';
import { PostUncheckedCreateWithoutRestaurantExtractionInputObjectSchema as PostUncheckedCreateWithoutRestaurantExtractionInputObjectSchema } from './PostUncheckedCreateWithoutRestaurantExtractionInput.schema';
import { PostWhereInputObjectSchema as PostWhereInputObjectSchema } from './PostWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => PostUpdateWithoutRestaurantExtractionInputObjectSchema), z.lazy(() => PostUncheckedUpdateWithoutRestaurantExtractionInputObjectSchema)]),
  create: z.union([z.lazy(() => PostCreateWithoutRestaurantExtractionInputObjectSchema), z.lazy(() => PostUncheckedCreateWithoutRestaurantExtractionInputObjectSchema)]),
  where: z.lazy(() => PostWhereInputObjectSchema).optional()
}).strict();
export const PostUpsertWithoutRestaurantExtractionInputObjectSchema: z.ZodType<Prisma.PostUpsertWithoutRestaurantExtractionInput> = makeSchema() as unknown as z.ZodType<Prisma.PostUpsertWithoutRestaurantExtractionInput>;
export const PostUpsertWithoutRestaurantExtractionInputObjectZodSchema = makeSchema();
