import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PostWhereUniqueInputObjectSchema as PostWhereUniqueInputObjectSchema } from './PostWhereUniqueInput.schema';
import { PostUpdateWithoutRestaurantsMentionedInputObjectSchema as PostUpdateWithoutRestaurantsMentionedInputObjectSchema } from './PostUpdateWithoutRestaurantsMentionedInput.schema';
import { PostUncheckedUpdateWithoutRestaurantsMentionedInputObjectSchema as PostUncheckedUpdateWithoutRestaurantsMentionedInputObjectSchema } from './PostUncheckedUpdateWithoutRestaurantsMentionedInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PostWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => PostUpdateWithoutRestaurantsMentionedInputObjectSchema), z.lazy(() => PostUncheckedUpdateWithoutRestaurantsMentionedInputObjectSchema)])
}).strict();
export const PostUpdateWithWhereUniqueWithoutRestaurantsMentionedInputObjectSchema: z.ZodType<Prisma.PostUpdateWithWhereUniqueWithoutRestaurantsMentionedInput> = makeSchema() as unknown as z.ZodType<Prisma.PostUpdateWithWhereUniqueWithoutRestaurantsMentionedInput>;
export const PostUpdateWithWhereUniqueWithoutRestaurantsMentionedInputObjectZodSchema = makeSchema();
