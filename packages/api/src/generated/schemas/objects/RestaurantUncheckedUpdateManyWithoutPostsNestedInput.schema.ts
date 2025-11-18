import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantCreateWithoutPostsInputObjectSchema as RestaurantCreateWithoutPostsInputObjectSchema } from './RestaurantCreateWithoutPostsInput.schema';
import { RestaurantUncheckedCreateWithoutPostsInputObjectSchema as RestaurantUncheckedCreateWithoutPostsInputObjectSchema } from './RestaurantUncheckedCreateWithoutPostsInput.schema';
import { RestaurantCreateOrConnectWithoutPostsInputObjectSchema as RestaurantCreateOrConnectWithoutPostsInputObjectSchema } from './RestaurantCreateOrConnectWithoutPostsInput.schema';
import { RestaurantUpsertWithWhereUniqueWithoutPostsInputObjectSchema as RestaurantUpsertWithWhereUniqueWithoutPostsInputObjectSchema } from './RestaurantUpsertWithWhereUniqueWithoutPostsInput.schema';
import { RestaurantWhereUniqueInputObjectSchema as RestaurantWhereUniqueInputObjectSchema } from './RestaurantWhereUniqueInput.schema';
import { RestaurantUpdateWithWhereUniqueWithoutPostsInputObjectSchema as RestaurantUpdateWithWhereUniqueWithoutPostsInputObjectSchema } from './RestaurantUpdateWithWhereUniqueWithoutPostsInput.schema';
import { RestaurantUpdateManyWithWhereWithoutPostsInputObjectSchema as RestaurantUpdateManyWithWhereWithoutPostsInputObjectSchema } from './RestaurantUpdateManyWithWhereWithoutPostsInput.schema';
import { RestaurantScalarWhereInputObjectSchema as RestaurantScalarWhereInputObjectSchema } from './RestaurantScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => RestaurantCreateWithoutPostsInputObjectSchema), z.lazy(() => RestaurantCreateWithoutPostsInputObjectSchema).array(), z.lazy(() => RestaurantUncheckedCreateWithoutPostsInputObjectSchema), z.lazy(() => RestaurantUncheckedCreateWithoutPostsInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => RestaurantCreateOrConnectWithoutPostsInputObjectSchema), z.lazy(() => RestaurantCreateOrConnectWithoutPostsInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => RestaurantUpsertWithWhereUniqueWithoutPostsInputObjectSchema), z.lazy(() => RestaurantUpsertWithWhereUniqueWithoutPostsInputObjectSchema).array()]).optional(),
  set: z.union([z.lazy(() => RestaurantWhereUniqueInputObjectSchema), z.lazy(() => RestaurantWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => RestaurantWhereUniqueInputObjectSchema), z.lazy(() => RestaurantWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => RestaurantWhereUniqueInputObjectSchema), z.lazy(() => RestaurantWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => RestaurantWhereUniqueInputObjectSchema), z.lazy(() => RestaurantWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => RestaurantUpdateWithWhereUniqueWithoutPostsInputObjectSchema), z.lazy(() => RestaurantUpdateWithWhereUniqueWithoutPostsInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => RestaurantUpdateManyWithWhereWithoutPostsInputObjectSchema), z.lazy(() => RestaurantUpdateManyWithWhereWithoutPostsInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => RestaurantScalarWhereInputObjectSchema), z.lazy(() => RestaurantScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const RestaurantUncheckedUpdateManyWithoutPostsNestedInputObjectSchema: z.ZodType<Prisma.RestaurantUncheckedUpdateManyWithoutPostsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantUncheckedUpdateManyWithoutPostsNestedInput>;
export const RestaurantUncheckedUpdateManyWithoutPostsNestedInputObjectZodSchema = makeSchema();
