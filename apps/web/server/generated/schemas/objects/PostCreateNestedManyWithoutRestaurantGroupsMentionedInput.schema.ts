import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PostCreateWithoutRestaurantGroupsMentionedInputObjectSchema as PostCreateWithoutRestaurantGroupsMentionedInputObjectSchema } from './PostCreateWithoutRestaurantGroupsMentionedInput.schema';
import { PostUncheckedCreateWithoutRestaurantGroupsMentionedInputObjectSchema as PostUncheckedCreateWithoutRestaurantGroupsMentionedInputObjectSchema } from './PostUncheckedCreateWithoutRestaurantGroupsMentionedInput.schema';
import { PostCreateOrConnectWithoutRestaurantGroupsMentionedInputObjectSchema as PostCreateOrConnectWithoutRestaurantGroupsMentionedInputObjectSchema } from './PostCreateOrConnectWithoutRestaurantGroupsMentionedInput.schema';
import { PostWhereUniqueInputObjectSchema as PostWhereUniqueInputObjectSchema } from './PostWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PostCreateWithoutRestaurantGroupsMentionedInputObjectSchema), z.lazy(() => PostCreateWithoutRestaurantGroupsMentionedInputObjectSchema).array(), z.lazy(() => PostUncheckedCreateWithoutRestaurantGroupsMentionedInputObjectSchema), z.lazy(() => PostUncheckedCreateWithoutRestaurantGroupsMentionedInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PostCreateOrConnectWithoutRestaurantGroupsMentionedInputObjectSchema), z.lazy(() => PostCreateOrConnectWithoutRestaurantGroupsMentionedInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => PostWhereUniqueInputObjectSchema), z.lazy(() => PostWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const PostCreateNestedManyWithoutRestaurantGroupsMentionedInputObjectSchema: z.ZodType<Prisma.PostCreateNestedManyWithoutRestaurantGroupsMentionedInput> = makeSchema() as unknown as z.ZodType<Prisma.PostCreateNestedManyWithoutRestaurantGroupsMentionedInput>;
export const PostCreateNestedManyWithoutRestaurantGroupsMentionedInputObjectZodSchema = makeSchema();
