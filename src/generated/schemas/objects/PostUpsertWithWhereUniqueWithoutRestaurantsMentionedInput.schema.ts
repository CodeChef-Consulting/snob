import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PostWhereUniqueInputObjectSchema as PostWhereUniqueInputObjectSchema } from './PostWhereUniqueInput.schema';
import { PostUpdateWithoutRestaurantsMentionedInputObjectSchema as PostUpdateWithoutRestaurantsMentionedInputObjectSchema } from './PostUpdateWithoutRestaurantsMentionedInput.schema';
import { PostUncheckedUpdateWithoutRestaurantsMentionedInputObjectSchema as PostUncheckedUpdateWithoutRestaurantsMentionedInputObjectSchema } from './PostUncheckedUpdateWithoutRestaurantsMentionedInput.schema';
import { PostCreateWithoutRestaurantsMentionedInputObjectSchema as PostCreateWithoutRestaurantsMentionedInputObjectSchema } from './PostCreateWithoutRestaurantsMentionedInput.schema';
import { PostUncheckedCreateWithoutRestaurantsMentionedInputObjectSchema as PostUncheckedCreateWithoutRestaurantsMentionedInputObjectSchema } from './PostUncheckedCreateWithoutRestaurantsMentionedInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PostWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => PostUpdateWithoutRestaurantsMentionedInputObjectSchema), z.lazy(() => PostUncheckedUpdateWithoutRestaurantsMentionedInputObjectSchema)]),
  create: z.union([z.lazy(() => PostCreateWithoutRestaurantsMentionedInputObjectSchema), z.lazy(() => PostUncheckedCreateWithoutRestaurantsMentionedInputObjectSchema)])
}).strict();
export const PostUpsertWithWhereUniqueWithoutRestaurantsMentionedInputObjectSchema: z.ZodType<Prisma.PostUpsertWithWhereUniqueWithoutRestaurantsMentionedInput> = makeSchema() as unknown as z.ZodType<Prisma.PostUpsertWithWhereUniqueWithoutRestaurantsMentionedInput>;
export const PostUpsertWithWhereUniqueWithoutRestaurantsMentionedInputObjectZodSchema = makeSchema();
