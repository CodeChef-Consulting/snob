import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantGroupCreateWithoutPostsInputObjectSchema as RestaurantGroupCreateWithoutPostsInputObjectSchema } from './RestaurantGroupCreateWithoutPostsInput.schema';
import { RestaurantGroupUncheckedCreateWithoutPostsInputObjectSchema as RestaurantGroupUncheckedCreateWithoutPostsInputObjectSchema } from './RestaurantGroupUncheckedCreateWithoutPostsInput.schema';
import { RestaurantGroupCreateOrConnectWithoutPostsInputObjectSchema as RestaurantGroupCreateOrConnectWithoutPostsInputObjectSchema } from './RestaurantGroupCreateOrConnectWithoutPostsInput.schema';
import { RestaurantGroupUpsertWithWhereUniqueWithoutPostsInputObjectSchema as RestaurantGroupUpsertWithWhereUniqueWithoutPostsInputObjectSchema } from './RestaurantGroupUpsertWithWhereUniqueWithoutPostsInput.schema';
import { RestaurantGroupWhereUniqueInputObjectSchema as RestaurantGroupWhereUniqueInputObjectSchema } from './RestaurantGroupWhereUniqueInput.schema';
import { RestaurantGroupUpdateWithWhereUniqueWithoutPostsInputObjectSchema as RestaurantGroupUpdateWithWhereUniqueWithoutPostsInputObjectSchema } from './RestaurantGroupUpdateWithWhereUniqueWithoutPostsInput.schema';
import { RestaurantGroupUpdateManyWithWhereWithoutPostsInputObjectSchema as RestaurantGroupUpdateManyWithWhereWithoutPostsInputObjectSchema } from './RestaurantGroupUpdateManyWithWhereWithoutPostsInput.schema';
import { RestaurantGroupScalarWhereInputObjectSchema as RestaurantGroupScalarWhereInputObjectSchema } from './RestaurantGroupScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => RestaurantGroupCreateWithoutPostsInputObjectSchema), z.lazy(() => RestaurantGroupCreateWithoutPostsInputObjectSchema).array(), z.lazy(() => RestaurantGroupUncheckedCreateWithoutPostsInputObjectSchema), z.lazy(() => RestaurantGroupUncheckedCreateWithoutPostsInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => RestaurantGroupCreateOrConnectWithoutPostsInputObjectSchema), z.lazy(() => RestaurantGroupCreateOrConnectWithoutPostsInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => RestaurantGroupUpsertWithWhereUniqueWithoutPostsInputObjectSchema), z.lazy(() => RestaurantGroupUpsertWithWhereUniqueWithoutPostsInputObjectSchema).array()]).optional(),
  set: z.union([z.lazy(() => RestaurantGroupWhereUniqueInputObjectSchema), z.lazy(() => RestaurantGroupWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => RestaurantGroupWhereUniqueInputObjectSchema), z.lazy(() => RestaurantGroupWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => RestaurantGroupWhereUniqueInputObjectSchema), z.lazy(() => RestaurantGroupWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => RestaurantGroupWhereUniqueInputObjectSchema), z.lazy(() => RestaurantGroupWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => RestaurantGroupUpdateWithWhereUniqueWithoutPostsInputObjectSchema), z.lazy(() => RestaurantGroupUpdateWithWhereUniqueWithoutPostsInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => RestaurantGroupUpdateManyWithWhereWithoutPostsInputObjectSchema), z.lazy(() => RestaurantGroupUpdateManyWithWhereWithoutPostsInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => RestaurantGroupScalarWhereInputObjectSchema), z.lazy(() => RestaurantGroupScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const RestaurantGroupUncheckedUpdateManyWithoutPostsNestedInputObjectSchema: z.ZodType<Prisma.RestaurantGroupUncheckedUpdateManyWithoutPostsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantGroupUncheckedUpdateManyWithoutPostsNestedInput>;
export const RestaurantGroupUncheckedUpdateManyWithoutPostsNestedInputObjectZodSchema = makeSchema();
