import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantLocationCreateWithoutGroupInputObjectSchema as RestaurantLocationCreateWithoutGroupInputObjectSchema } from './RestaurantLocationCreateWithoutGroupInput.schema';
import { RestaurantLocationUncheckedCreateWithoutGroupInputObjectSchema as RestaurantLocationUncheckedCreateWithoutGroupInputObjectSchema } from './RestaurantLocationUncheckedCreateWithoutGroupInput.schema';
import { RestaurantLocationCreateOrConnectWithoutGroupInputObjectSchema as RestaurantLocationCreateOrConnectWithoutGroupInputObjectSchema } from './RestaurantLocationCreateOrConnectWithoutGroupInput.schema';
import { RestaurantLocationUpsertWithWhereUniqueWithoutGroupInputObjectSchema as RestaurantLocationUpsertWithWhereUniqueWithoutGroupInputObjectSchema } from './RestaurantLocationUpsertWithWhereUniqueWithoutGroupInput.schema';
import { RestaurantLocationCreateManyGroupInputEnvelopeObjectSchema as RestaurantLocationCreateManyGroupInputEnvelopeObjectSchema } from './RestaurantLocationCreateManyGroupInputEnvelope.schema';
import { RestaurantLocationWhereUniqueInputObjectSchema as RestaurantLocationWhereUniqueInputObjectSchema } from './RestaurantLocationWhereUniqueInput.schema';
import { RestaurantLocationUpdateWithWhereUniqueWithoutGroupInputObjectSchema as RestaurantLocationUpdateWithWhereUniqueWithoutGroupInputObjectSchema } from './RestaurantLocationUpdateWithWhereUniqueWithoutGroupInput.schema';
import { RestaurantLocationUpdateManyWithWhereWithoutGroupInputObjectSchema as RestaurantLocationUpdateManyWithWhereWithoutGroupInputObjectSchema } from './RestaurantLocationUpdateManyWithWhereWithoutGroupInput.schema';
import { RestaurantLocationScalarWhereInputObjectSchema as RestaurantLocationScalarWhereInputObjectSchema } from './RestaurantLocationScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => RestaurantLocationCreateWithoutGroupInputObjectSchema), z.lazy(() => RestaurantLocationCreateWithoutGroupInputObjectSchema).array(), z.lazy(() => RestaurantLocationUncheckedCreateWithoutGroupInputObjectSchema), z.lazy(() => RestaurantLocationUncheckedCreateWithoutGroupInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => RestaurantLocationCreateOrConnectWithoutGroupInputObjectSchema), z.lazy(() => RestaurantLocationCreateOrConnectWithoutGroupInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => RestaurantLocationUpsertWithWhereUniqueWithoutGroupInputObjectSchema), z.lazy(() => RestaurantLocationUpsertWithWhereUniqueWithoutGroupInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => RestaurantLocationCreateManyGroupInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => RestaurantLocationWhereUniqueInputObjectSchema), z.lazy(() => RestaurantLocationWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => RestaurantLocationWhereUniqueInputObjectSchema), z.lazy(() => RestaurantLocationWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => RestaurantLocationWhereUniqueInputObjectSchema), z.lazy(() => RestaurantLocationWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => RestaurantLocationWhereUniqueInputObjectSchema), z.lazy(() => RestaurantLocationWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => RestaurantLocationUpdateWithWhereUniqueWithoutGroupInputObjectSchema), z.lazy(() => RestaurantLocationUpdateWithWhereUniqueWithoutGroupInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => RestaurantLocationUpdateManyWithWhereWithoutGroupInputObjectSchema), z.lazy(() => RestaurantLocationUpdateManyWithWhereWithoutGroupInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => RestaurantLocationScalarWhereInputObjectSchema), z.lazy(() => RestaurantLocationScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const RestaurantLocationUpdateManyWithoutGroupNestedInputObjectSchema: z.ZodType<Prisma.RestaurantLocationUpdateManyWithoutGroupNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantLocationUpdateManyWithoutGroupNestedInput>;
export const RestaurantLocationUpdateManyWithoutGroupNestedInputObjectZodSchema = makeSchema();
