import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PostWhereUniqueInputObjectSchema } from './PostWhereUniqueInput.schema';
import { PostUpdateWithoutRestaurantInputObjectSchema } from './PostUpdateWithoutRestaurantInput.schema';
import { PostUncheckedUpdateWithoutRestaurantInputObjectSchema } from './PostUncheckedUpdateWithoutRestaurantInput.schema';
import { PostCreateWithoutRestaurantInputObjectSchema } from './PostCreateWithoutRestaurantInput.schema';
import { PostUncheckedCreateWithoutRestaurantInputObjectSchema } from './PostUncheckedCreateWithoutRestaurantInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PostWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => PostUpdateWithoutRestaurantInputObjectSchema), z.lazy(() => PostUncheckedUpdateWithoutRestaurantInputObjectSchema)]),
  create: z.union([z.lazy(() => PostCreateWithoutRestaurantInputObjectSchema), z.lazy(() => PostUncheckedCreateWithoutRestaurantInputObjectSchema)])
}).strict();
export const PostUpsertWithWhereUniqueWithoutRestaurantInputObjectSchema: z.ZodType<Prisma.PostUpsertWithWhereUniqueWithoutRestaurantInput> = makeSchema() as unknown as z.ZodType<Prisma.PostUpsertWithWhereUniqueWithoutRestaurantInput>;
export const PostUpsertWithWhereUniqueWithoutRestaurantInputObjectZodSchema = makeSchema();
