import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PostWhereUniqueInputObjectSchema as PostWhereUniqueInputObjectSchema } from './PostWhereUniqueInput.schema';
import { PostUpdateWithoutRestaurantInputObjectSchema as PostUpdateWithoutRestaurantInputObjectSchema } from './PostUpdateWithoutRestaurantInput.schema';
import { PostUncheckedUpdateWithoutRestaurantInputObjectSchema as PostUncheckedUpdateWithoutRestaurantInputObjectSchema } from './PostUncheckedUpdateWithoutRestaurantInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PostWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => PostUpdateWithoutRestaurantInputObjectSchema), z.lazy(() => PostUncheckedUpdateWithoutRestaurantInputObjectSchema)])
}).strict();
export const PostUpdateWithWhereUniqueWithoutRestaurantInputObjectSchema: z.ZodType<Prisma.PostUpdateWithWhereUniqueWithoutRestaurantInput> = makeSchema() as unknown as z.ZodType<Prisma.PostUpdateWithWhereUniqueWithoutRestaurantInput>;
export const PostUpdateWithWhereUniqueWithoutRestaurantInputObjectZodSchema = makeSchema();
