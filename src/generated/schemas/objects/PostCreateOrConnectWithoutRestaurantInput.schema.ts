import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PostWhereUniqueInputObjectSchema as PostWhereUniqueInputObjectSchema } from './PostWhereUniqueInput.schema';
import { PostCreateWithoutRestaurantInputObjectSchema as PostCreateWithoutRestaurantInputObjectSchema } from './PostCreateWithoutRestaurantInput.schema';
import { PostUncheckedCreateWithoutRestaurantInputObjectSchema as PostUncheckedCreateWithoutRestaurantInputObjectSchema } from './PostUncheckedCreateWithoutRestaurantInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PostWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => PostCreateWithoutRestaurantInputObjectSchema), z.lazy(() => PostUncheckedCreateWithoutRestaurantInputObjectSchema)])
}).strict();
export const PostCreateOrConnectWithoutRestaurantInputObjectSchema: z.ZodType<Prisma.PostCreateOrConnectWithoutRestaurantInput> = makeSchema() as unknown as z.ZodType<Prisma.PostCreateOrConnectWithoutRestaurantInput>;
export const PostCreateOrConnectWithoutRestaurantInputObjectZodSchema = makeSchema();
