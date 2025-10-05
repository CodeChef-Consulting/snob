import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PostCreateWithoutRestaurantsMentionedInputObjectSchema as PostCreateWithoutRestaurantsMentionedInputObjectSchema } from './PostCreateWithoutRestaurantsMentionedInput.schema';
import { PostUncheckedCreateWithoutRestaurantsMentionedInputObjectSchema as PostUncheckedCreateWithoutRestaurantsMentionedInputObjectSchema } from './PostUncheckedCreateWithoutRestaurantsMentionedInput.schema';
import { PostCreateOrConnectWithoutRestaurantsMentionedInputObjectSchema as PostCreateOrConnectWithoutRestaurantsMentionedInputObjectSchema } from './PostCreateOrConnectWithoutRestaurantsMentionedInput.schema';
import { PostWhereUniqueInputObjectSchema as PostWhereUniqueInputObjectSchema } from './PostWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PostCreateWithoutRestaurantsMentionedInputObjectSchema), z.lazy(() => PostCreateWithoutRestaurantsMentionedInputObjectSchema).array(), z.lazy(() => PostUncheckedCreateWithoutRestaurantsMentionedInputObjectSchema), z.lazy(() => PostUncheckedCreateWithoutRestaurantsMentionedInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PostCreateOrConnectWithoutRestaurantsMentionedInputObjectSchema), z.lazy(() => PostCreateOrConnectWithoutRestaurantsMentionedInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => PostWhereUniqueInputObjectSchema), z.lazy(() => PostWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const PostCreateNestedManyWithoutRestaurantsMentionedInputObjectSchema: z.ZodType<Prisma.PostCreateNestedManyWithoutRestaurantsMentionedInput> = makeSchema() as unknown as z.ZodType<Prisma.PostCreateNestedManyWithoutRestaurantsMentionedInput>;
export const PostCreateNestedManyWithoutRestaurantsMentionedInputObjectZodSchema = makeSchema();
