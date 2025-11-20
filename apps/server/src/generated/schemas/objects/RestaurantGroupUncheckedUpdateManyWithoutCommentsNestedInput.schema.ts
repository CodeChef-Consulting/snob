import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantGroupCreateWithoutCommentsInputObjectSchema as RestaurantGroupCreateWithoutCommentsInputObjectSchema } from './RestaurantGroupCreateWithoutCommentsInput.schema';
import { RestaurantGroupUncheckedCreateWithoutCommentsInputObjectSchema as RestaurantGroupUncheckedCreateWithoutCommentsInputObjectSchema } from './RestaurantGroupUncheckedCreateWithoutCommentsInput.schema';
import { RestaurantGroupCreateOrConnectWithoutCommentsInputObjectSchema as RestaurantGroupCreateOrConnectWithoutCommentsInputObjectSchema } from './RestaurantGroupCreateOrConnectWithoutCommentsInput.schema';
import { RestaurantGroupUpsertWithWhereUniqueWithoutCommentsInputObjectSchema as RestaurantGroupUpsertWithWhereUniqueWithoutCommentsInputObjectSchema } from './RestaurantGroupUpsertWithWhereUniqueWithoutCommentsInput.schema';
import { RestaurantGroupWhereUniqueInputObjectSchema as RestaurantGroupWhereUniqueInputObjectSchema } from './RestaurantGroupWhereUniqueInput.schema';
import { RestaurantGroupUpdateWithWhereUniqueWithoutCommentsInputObjectSchema as RestaurantGroupUpdateWithWhereUniqueWithoutCommentsInputObjectSchema } from './RestaurantGroupUpdateWithWhereUniqueWithoutCommentsInput.schema';
import { RestaurantGroupUpdateManyWithWhereWithoutCommentsInputObjectSchema as RestaurantGroupUpdateManyWithWhereWithoutCommentsInputObjectSchema } from './RestaurantGroupUpdateManyWithWhereWithoutCommentsInput.schema';
import { RestaurantGroupScalarWhereInputObjectSchema as RestaurantGroupScalarWhereInputObjectSchema } from './RestaurantGroupScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => RestaurantGroupCreateWithoutCommentsInputObjectSchema), z.lazy(() => RestaurantGroupCreateWithoutCommentsInputObjectSchema).array(), z.lazy(() => RestaurantGroupUncheckedCreateWithoutCommentsInputObjectSchema), z.lazy(() => RestaurantGroupUncheckedCreateWithoutCommentsInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => RestaurantGroupCreateOrConnectWithoutCommentsInputObjectSchema), z.lazy(() => RestaurantGroupCreateOrConnectWithoutCommentsInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => RestaurantGroupUpsertWithWhereUniqueWithoutCommentsInputObjectSchema), z.lazy(() => RestaurantGroupUpsertWithWhereUniqueWithoutCommentsInputObjectSchema).array()]).optional(),
  set: z.union([z.lazy(() => RestaurantGroupWhereUniqueInputObjectSchema), z.lazy(() => RestaurantGroupWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => RestaurantGroupWhereUniqueInputObjectSchema), z.lazy(() => RestaurantGroupWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => RestaurantGroupWhereUniqueInputObjectSchema), z.lazy(() => RestaurantGroupWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => RestaurantGroupWhereUniqueInputObjectSchema), z.lazy(() => RestaurantGroupWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => RestaurantGroupUpdateWithWhereUniqueWithoutCommentsInputObjectSchema), z.lazy(() => RestaurantGroupUpdateWithWhereUniqueWithoutCommentsInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => RestaurantGroupUpdateManyWithWhereWithoutCommentsInputObjectSchema), z.lazy(() => RestaurantGroupUpdateManyWithWhereWithoutCommentsInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => RestaurantGroupScalarWhereInputObjectSchema), z.lazy(() => RestaurantGroupScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const RestaurantGroupUncheckedUpdateManyWithoutCommentsNestedInputObjectSchema: z.ZodType<Prisma.RestaurantGroupUncheckedUpdateManyWithoutCommentsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantGroupUncheckedUpdateManyWithoutCommentsNestedInput>;
export const RestaurantGroupUncheckedUpdateManyWithoutCommentsNestedInputObjectZodSchema = makeSchema();
