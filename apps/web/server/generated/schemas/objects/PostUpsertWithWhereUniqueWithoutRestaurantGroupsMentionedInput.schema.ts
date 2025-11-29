import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PostWhereUniqueInputObjectSchema as PostWhereUniqueInputObjectSchema } from './PostWhereUniqueInput.schema';
import { PostUpdateWithoutRestaurantGroupsMentionedInputObjectSchema as PostUpdateWithoutRestaurantGroupsMentionedInputObjectSchema } from './PostUpdateWithoutRestaurantGroupsMentionedInput.schema';
import { PostUncheckedUpdateWithoutRestaurantGroupsMentionedInputObjectSchema as PostUncheckedUpdateWithoutRestaurantGroupsMentionedInputObjectSchema } from './PostUncheckedUpdateWithoutRestaurantGroupsMentionedInput.schema';
import { PostCreateWithoutRestaurantGroupsMentionedInputObjectSchema as PostCreateWithoutRestaurantGroupsMentionedInputObjectSchema } from './PostCreateWithoutRestaurantGroupsMentionedInput.schema';
import { PostUncheckedCreateWithoutRestaurantGroupsMentionedInputObjectSchema as PostUncheckedCreateWithoutRestaurantGroupsMentionedInputObjectSchema } from './PostUncheckedCreateWithoutRestaurantGroupsMentionedInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PostWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => PostUpdateWithoutRestaurantGroupsMentionedInputObjectSchema), z.lazy(() => PostUncheckedUpdateWithoutRestaurantGroupsMentionedInputObjectSchema)]),
  create: z.union([z.lazy(() => PostCreateWithoutRestaurantGroupsMentionedInputObjectSchema), z.lazy(() => PostUncheckedCreateWithoutRestaurantGroupsMentionedInputObjectSchema)])
}).strict();
export const PostUpsertWithWhereUniqueWithoutRestaurantGroupsMentionedInputObjectSchema: z.ZodType<Prisma.PostUpsertWithWhereUniqueWithoutRestaurantGroupsMentionedInput> = makeSchema() as unknown as z.ZodType<Prisma.PostUpsertWithWhereUniqueWithoutRestaurantGroupsMentionedInput>;
export const PostUpsertWithWhereUniqueWithoutRestaurantGroupsMentionedInputObjectZodSchema = makeSchema();
