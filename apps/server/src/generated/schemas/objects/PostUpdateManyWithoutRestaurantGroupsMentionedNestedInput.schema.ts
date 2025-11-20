import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PostCreateWithoutRestaurantGroupsMentionedInputObjectSchema as PostCreateWithoutRestaurantGroupsMentionedInputObjectSchema } from './PostCreateWithoutRestaurantGroupsMentionedInput.schema';
import { PostUncheckedCreateWithoutRestaurantGroupsMentionedInputObjectSchema as PostUncheckedCreateWithoutRestaurantGroupsMentionedInputObjectSchema } from './PostUncheckedCreateWithoutRestaurantGroupsMentionedInput.schema';
import { PostCreateOrConnectWithoutRestaurantGroupsMentionedInputObjectSchema as PostCreateOrConnectWithoutRestaurantGroupsMentionedInputObjectSchema } from './PostCreateOrConnectWithoutRestaurantGroupsMentionedInput.schema';
import { PostUpsertWithWhereUniqueWithoutRestaurantGroupsMentionedInputObjectSchema as PostUpsertWithWhereUniqueWithoutRestaurantGroupsMentionedInputObjectSchema } from './PostUpsertWithWhereUniqueWithoutRestaurantGroupsMentionedInput.schema';
import { PostWhereUniqueInputObjectSchema as PostWhereUniqueInputObjectSchema } from './PostWhereUniqueInput.schema';
import { PostUpdateWithWhereUniqueWithoutRestaurantGroupsMentionedInputObjectSchema as PostUpdateWithWhereUniqueWithoutRestaurantGroupsMentionedInputObjectSchema } from './PostUpdateWithWhereUniqueWithoutRestaurantGroupsMentionedInput.schema';
import { PostUpdateManyWithWhereWithoutRestaurantGroupsMentionedInputObjectSchema as PostUpdateManyWithWhereWithoutRestaurantGroupsMentionedInputObjectSchema } from './PostUpdateManyWithWhereWithoutRestaurantGroupsMentionedInput.schema';
import { PostScalarWhereInputObjectSchema as PostScalarWhereInputObjectSchema } from './PostScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PostCreateWithoutRestaurantGroupsMentionedInputObjectSchema), z.lazy(() => PostCreateWithoutRestaurantGroupsMentionedInputObjectSchema).array(), z.lazy(() => PostUncheckedCreateWithoutRestaurantGroupsMentionedInputObjectSchema), z.lazy(() => PostUncheckedCreateWithoutRestaurantGroupsMentionedInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PostCreateOrConnectWithoutRestaurantGroupsMentionedInputObjectSchema), z.lazy(() => PostCreateOrConnectWithoutRestaurantGroupsMentionedInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => PostUpsertWithWhereUniqueWithoutRestaurantGroupsMentionedInputObjectSchema), z.lazy(() => PostUpsertWithWhereUniqueWithoutRestaurantGroupsMentionedInputObjectSchema).array()]).optional(),
  set: z.union([z.lazy(() => PostWhereUniqueInputObjectSchema), z.lazy(() => PostWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => PostWhereUniqueInputObjectSchema), z.lazy(() => PostWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => PostWhereUniqueInputObjectSchema), z.lazy(() => PostWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => PostWhereUniqueInputObjectSchema), z.lazy(() => PostWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => PostUpdateWithWhereUniqueWithoutRestaurantGroupsMentionedInputObjectSchema), z.lazy(() => PostUpdateWithWhereUniqueWithoutRestaurantGroupsMentionedInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => PostUpdateManyWithWhereWithoutRestaurantGroupsMentionedInputObjectSchema), z.lazy(() => PostUpdateManyWithWhereWithoutRestaurantGroupsMentionedInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => PostScalarWhereInputObjectSchema), z.lazy(() => PostScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const PostUpdateManyWithoutRestaurantGroupsMentionedNestedInputObjectSchema: z.ZodType<Prisma.PostUpdateManyWithoutRestaurantGroupsMentionedNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.PostUpdateManyWithoutRestaurantGroupsMentionedNestedInput>;
export const PostUpdateManyWithoutRestaurantGroupsMentionedNestedInputObjectZodSchema = makeSchema();
