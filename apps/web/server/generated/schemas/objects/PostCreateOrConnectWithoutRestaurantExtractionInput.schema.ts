import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PostWhereUniqueInputObjectSchema as PostWhereUniqueInputObjectSchema } from './PostWhereUniqueInput.schema';
import { PostCreateWithoutRestaurantExtractionInputObjectSchema as PostCreateWithoutRestaurantExtractionInputObjectSchema } from './PostCreateWithoutRestaurantExtractionInput.schema';
import { PostUncheckedCreateWithoutRestaurantExtractionInputObjectSchema as PostUncheckedCreateWithoutRestaurantExtractionInputObjectSchema } from './PostUncheckedCreateWithoutRestaurantExtractionInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PostWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => PostCreateWithoutRestaurantExtractionInputObjectSchema), z.lazy(() => PostUncheckedCreateWithoutRestaurantExtractionInputObjectSchema)])
}).strict();
export const PostCreateOrConnectWithoutRestaurantExtractionInputObjectSchema: z.ZodType<Prisma.PostCreateOrConnectWithoutRestaurantExtractionInput> = makeSchema() as unknown as z.ZodType<Prisma.PostCreateOrConnectWithoutRestaurantExtractionInput>;
export const PostCreateOrConnectWithoutRestaurantExtractionInputObjectZodSchema = makeSchema();
