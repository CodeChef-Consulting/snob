import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PostWhereUniqueInputObjectSchema as PostWhereUniqueInputObjectSchema } from './PostWhereUniqueInput.schema';
import { PostUpdateWithoutRestaurantGroupsMentionedInputObjectSchema as PostUpdateWithoutRestaurantGroupsMentionedInputObjectSchema } from './PostUpdateWithoutRestaurantGroupsMentionedInput.schema';
import { PostUncheckedUpdateWithoutRestaurantGroupsMentionedInputObjectSchema as PostUncheckedUpdateWithoutRestaurantGroupsMentionedInputObjectSchema } from './PostUncheckedUpdateWithoutRestaurantGroupsMentionedInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PostWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => PostUpdateWithoutRestaurantGroupsMentionedInputObjectSchema), z.lazy(() => PostUncheckedUpdateWithoutRestaurantGroupsMentionedInputObjectSchema)])
}).strict();
export const PostUpdateWithWhereUniqueWithoutRestaurantGroupsMentionedInputObjectSchema: z.ZodType<Prisma.PostUpdateWithWhereUniqueWithoutRestaurantGroupsMentionedInput> = makeSchema() as unknown as z.ZodType<Prisma.PostUpdateWithWhereUniqueWithoutRestaurantGroupsMentionedInput>;
export const PostUpdateWithWhereUniqueWithoutRestaurantGroupsMentionedInputObjectZodSchema = makeSchema();
