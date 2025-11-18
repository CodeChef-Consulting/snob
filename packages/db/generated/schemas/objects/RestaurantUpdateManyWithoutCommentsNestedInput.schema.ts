import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantCreateWithoutCommentsInputObjectSchema as RestaurantCreateWithoutCommentsInputObjectSchema } from './RestaurantCreateWithoutCommentsInput.schema';
import { RestaurantUncheckedCreateWithoutCommentsInputObjectSchema as RestaurantUncheckedCreateWithoutCommentsInputObjectSchema } from './RestaurantUncheckedCreateWithoutCommentsInput.schema';
import { RestaurantCreateOrConnectWithoutCommentsInputObjectSchema as RestaurantCreateOrConnectWithoutCommentsInputObjectSchema } from './RestaurantCreateOrConnectWithoutCommentsInput.schema';
import { RestaurantUpsertWithWhereUniqueWithoutCommentsInputObjectSchema as RestaurantUpsertWithWhereUniqueWithoutCommentsInputObjectSchema } from './RestaurantUpsertWithWhereUniqueWithoutCommentsInput.schema';
import { RestaurantWhereUniqueInputObjectSchema as RestaurantWhereUniqueInputObjectSchema } from './RestaurantWhereUniqueInput.schema';
import { RestaurantUpdateWithWhereUniqueWithoutCommentsInputObjectSchema as RestaurantUpdateWithWhereUniqueWithoutCommentsInputObjectSchema } from './RestaurantUpdateWithWhereUniqueWithoutCommentsInput.schema';
import { RestaurantUpdateManyWithWhereWithoutCommentsInputObjectSchema as RestaurantUpdateManyWithWhereWithoutCommentsInputObjectSchema } from './RestaurantUpdateManyWithWhereWithoutCommentsInput.schema';
import { RestaurantScalarWhereInputObjectSchema as RestaurantScalarWhereInputObjectSchema } from './RestaurantScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => RestaurantCreateWithoutCommentsInputObjectSchema), z.lazy(() => RestaurantCreateWithoutCommentsInputObjectSchema).array(), z.lazy(() => RestaurantUncheckedCreateWithoutCommentsInputObjectSchema), z.lazy(() => RestaurantUncheckedCreateWithoutCommentsInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => RestaurantCreateOrConnectWithoutCommentsInputObjectSchema), z.lazy(() => RestaurantCreateOrConnectWithoutCommentsInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => RestaurantUpsertWithWhereUniqueWithoutCommentsInputObjectSchema), z.lazy(() => RestaurantUpsertWithWhereUniqueWithoutCommentsInputObjectSchema).array()]).optional(),
  set: z.union([z.lazy(() => RestaurantWhereUniqueInputObjectSchema), z.lazy(() => RestaurantWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => RestaurantWhereUniqueInputObjectSchema), z.lazy(() => RestaurantWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => RestaurantWhereUniqueInputObjectSchema), z.lazy(() => RestaurantWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => RestaurantWhereUniqueInputObjectSchema), z.lazy(() => RestaurantWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => RestaurantUpdateWithWhereUniqueWithoutCommentsInputObjectSchema), z.lazy(() => RestaurantUpdateWithWhereUniqueWithoutCommentsInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => RestaurantUpdateManyWithWhereWithoutCommentsInputObjectSchema), z.lazy(() => RestaurantUpdateManyWithWhereWithoutCommentsInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => RestaurantScalarWhereInputObjectSchema), z.lazy(() => RestaurantScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const RestaurantUpdateManyWithoutCommentsNestedInputObjectSchema: z.ZodType<Prisma.RestaurantUpdateManyWithoutCommentsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantUpdateManyWithoutCommentsNestedInput>;
export const RestaurantUpdateManyWithoutCommentsNestedInputObjectZodSchema = makeSchema();
