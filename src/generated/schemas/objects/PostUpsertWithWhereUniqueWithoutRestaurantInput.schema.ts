import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PostWhereUniqueInputObjectSchema as PostWhereUniqueInputObjectSchema } from './PostWhereUniqueInput.schema';
import { PostUpdateWithoutRestaurantInputObjectSchema as PostUpdateWithoutRestaurantInputObjectSchema } from './PostUpdateWithoutRestaurantInput.schema';
import { PostUncheckedUpdateWithoutRestaurantInputObjectSchema as PostUncheckedUpdateWithoutRestaurantInputObjectSchema } from './PostUncheckedUpdateWithoutRestaurantInput.schema';
import { PostCreateWithoutRestaurantInputObjectSchema as PostCreateWithoutRestaurantInputObjectSchema } from './PostCreateWithoutRestaurantInput.schema';
import { PostUncheckedCreateWithoutRestaurantInputObjectSchema as PostUncheckedCreateWithoutRestaurantInputObjectSchema } from './PostUncheckedCreateWithoutRestaurantInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PostWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => PostUpdateWithoutRestaurantInputObjectSchema), z.lazy(() => PostUncheckedUpdateWithoutRestaurantInputObjectSchema)]),
  create: z.union([z.lazy(() => PostCreateWithoutRestaurantInputObjectSchema), z.lazy(() => PostUncheckedCreateWithoutRestaurantInputObjectSchema)])
}).strict();
export const PostUpsertWithWhereUniqueWithoutRestaurantInputObjectSchema: z.ZodType<Prisma.PostUpsertWithWhereUniqueWithoutRestaurantInput> = makeSchema() as unknown as z.ZodType<Prisma.PostUpsertWithWhereUniqueWithoutRestaurantInput>;
export const PostUpsertWithWhereUniqueWithoutRestaurantInputObjectZodSchema = makeSchema();
