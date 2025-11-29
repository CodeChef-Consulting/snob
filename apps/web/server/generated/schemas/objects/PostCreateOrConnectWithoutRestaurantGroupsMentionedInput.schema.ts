import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PostWhereUniqueInputObjectSchema as PostWhereUniqueInputObjectSchema } from './PostWhereUniqueInput.schema';
import { PostCreateWithoutRestaurantGroupsMentionedInputObjectSchema as PostCreateWithoutRestaurantGroupsMentionedInputObjectSchema } from './PostCreateWithoutRestaurantGroupsMentionedInput.schema';
import { PostUncheckedCreateWithoutRestaurantGroupsMentionedInputObjectSchema as PostUncheckedCreateWithoutRestaurantGroupsMentionedInputObjectSchema } from './PostUncheckedCreateWithoutRestaurantGroupsMentionedInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PostWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => PostCreateWithoutRestaurantGroupsMentionedInputObjectSchema), z.lazy(() => PostUncheckedCreateWithoutRestaurantGroupsMentionedInputObjectSchema)])
}).strict();
export const PostCreateOrConnectWithoutRestaurantGroupsMentionedInputObjectSchema: z.ZodType<Prisma.PostCreateOrConnectWithoutRestaurantGroupsMentionedInput> = makeSchema() as unknown as z.ZodType<Prisma.PostCreateOrConnectWithoutRestaurantGroupsMentionedInput>;
export const PostCreateOrConnectWithoutRestaurantGroupsMentionedInputObjectZodSchema = makeSchema();
