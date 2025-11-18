import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PostWhereUniqueInputObjectSchema as PostWhereUniqueInputObjectSchema } from './PostWhereUniqueInput.schema';
import { PostCreateWithoutRestaurantsMentionedInputObjectSchema as PostCreateWithoutRestaurantsMentionedInputObjectSchema } from './PostCreateWithoutRestaurantsMentionedInput.schema';
import { PostUncheckedCreateWithoutRestaurantsMentionedInputObjectSchema as PostUncheckedCreateWithoutRestaurantsMentionedInputObjectSchema } from './PostUncheckedCreateWithoutRestaurantsMentionedInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PostWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => PostCreateWithoutRestaurantsMentionedInputObjectSchema), z.lazy(() => PostUncheckedCreateWithoutRestaurantsMentionedInputObjectSchema)])
}).strict();
export const PostCreateOrConnectWithoutRestaurantsMentionedInputObjectSchema: z.ZodType<Prisma.PostCreateOrConnectWithoutRestaurantsMentionedInput> = makeSchema() as unknown as z.ZodType<Prisma.PostCreateOrConnectWithoutRestaurantsMentionedInput>;
export const PostCreateOrConnectWithoutRestaurantsMentionedInputObjectZodSchema = makeSchema();
