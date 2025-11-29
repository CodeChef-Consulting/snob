import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PostCreateWithoutRestaurantsMentionedInputObjectSchema as PostCreateWithoutRestaurantsMentionedInputObjectSchema } from './PostCreateWithoutRestaurantsMentionedInput.schema';
import { PostUncheckedCreateWithoutRestaurantsMentionedInputObjectSchema as PostUncheckedCreateWithoutRestaurantsMentionedInputObjectSchema } from './PostUncheckedCreateWithoutRestaurantsMentionedInput.schema';
import { PostCreateOrConnectWithoutRestaurantsMentionedInputObjectSchema as PostCreateOrConnectWithoutRestaurantsMentionedInputObjectSchema } from './PostCreateOrConnectWithoutRestaurantsMentionedInput.schema';
import { PostUpsertWithWhereUniqueWithoutRestaurantsMentionedInputObjectSchema as PostUpsertWithWhereUniqueWithoutRestaurantsMentionedInputObjectSchema } from './PostUpsertWithWhereUniqueWithoutRestaurantsMentionedInput.schema';
import { PostWhereUniqueInputObjectSchema as PostWhereUniqueInputObjectSchema } from './PostWhereUniqueInput.schema';
import { PostUpdateWithWhereUniqueWithoutRestaurantsMentionedInputObjectSchema as PostUpdateWithWhereUniqueWithoutRestaurantsMentionedInputObjectSchema } from './PostUpdateWithWhereUniqueWithoutRestaurantsMentionedInput.schema';
import { PostUpdateManyWithWhereWithoutRestaurantsMentionedInputObjectSchema as PostUpdateManyWithWhereWithoutRestaurantsMentionedInputObjectSchema } from './PostUpdateManyWithWhereWithoutRestaurantsMentionedInput.schema';
import { PostScalarWhereInputObjectSchema as PostScalarWhereInputObjectSchema } from './PostScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PostCreateWithoutRestaurantsMentionedInputObjectSchema), z.lazy(() => PostCreateWithoutRestaurantsMentionedInputObjectSchema).array(), z.lazy(() => PostUncheckedCreateWithoutRestaurantsMentionedInputObjectSchema), z.lazy(() => PostUncheckedCreateWithoutRestaurantsMentionedInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PostCreateOrConnectWithoutRestaurantsMentionedInputObjectSchema), z.lazy(() => PostCreateOrConnectWithoutRestaurantsMentionedInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => PostUpsertWithWhereUniqueWithoutRestaurantsMentionedInputObjectSchema), z.lazy(() => PostUpsertWithWhereUniqueWithoutRestaurantsMentionedInputObjectSchema).array()]).optional(),
  set: z.union([z.lazy(() => PostWhereUniqueInputObjectSchema), z.lazy(() => PostWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => PostWhereUniqueInputObjectSchema), z.lazy(() => PostWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => PostWhereUniqueInputObjectSchema), z.lazy(() => PostWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => PostWhereUniqueInputObjectSchema), z.lazy(() => PostWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => PostUpdateWithWhereUniqueWithoutRestaurantsMentionedInputObjectSchema), z.lazy(() => PostUpdateWithWhereUniqueWithoutRestaurantsMentionedInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => PostUpdateManyWithWhereWithoutRestaurantsMentionedInputObjectSchema), z.lazy(() => PostUpdateManyWithWhereWithoutRestaurantsMentionedInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => PostScalarWhereInputObjectSchema), z.lazy(() => PostScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const PostUpdateManyWithoutRestaurantsMentionedNestedInputObjectSchema: z.ZodType<Prisma.PostUpdateManyWithoutRestaurantsMentionedNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.PostUpdateManyWithoutRestaurantsMentionedNestedInput>;
export const PostUpdateManyWithoutRestaurantsMentionedNestedInputObjectZodSchema = makeSchema();
