import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantLocationCreateWithoutGroupInputObjectSchema as RestaurantLocationCreateWithoutGroupInputObjectSchema } from './RestaurantLocationCreateWithoutGroupInput.schema';
import { RestaurantLocationUncheckedCreateWithoutGroupInputObjectSchema as RestaurantLocationUncheckedCreateWithoutGroupInputObjectSchema } from './RestaurantLocationUncheckedCreateWithoutGroupInput.schema';
import { RestaurantLocationCreateOrConnectWithoutGroupInputObjectSchema as RestaurantLocationCreateOrConnectWithoutGroupInputObjectSchema } from './RestaurantLocationCreateOrConnectWithoutGroupInput.schema';
import { RestaurantLocationCreateManyGroupInputEnvelopeObjectSchema as RestaurantLocationCreateManyGroupInputEnvelopeObjectSchema } from './RestaurantLocationCreateManyGroupInputEnvelope.schema';
import { RestaurantLocationWhereUniqueInputObjectSchema as RestaurantLocationWhereUniqueInputObjectSchema } from './RestaurantLocationWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => RestaurantLocationCreateWithoutGroupInputObjectSchema), z.lazy(() => RestaurantLocationCreateWithoutGroupInputObjectSchema).array(), z.lazy(() => RestaurantLocationUncheckedCreateWithoutGroupInputObjectSchema), z.lazy(() => RestaurantLocationUncheckedCreateWithoutGroupInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => RestaurantLocationCreateOrConnectWithoutGroupInputObjectSchema), z.lazy(() => RestaurantLocationCreateOrConnectWithoutGroupInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => RestaurantLocationCreateManyGroupInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => RestaurantLocationWhereUniqueInputObjectSchema), z.lazy(() => RestaurantLocationWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const RestaurantLocationUncheckedCreateNestedManyWithoutGroupInputObjectSchema: z.ZodType<Prisma.RestaurantLocationUncheckedCreateNestedManyWithoutGroupInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantLocationUncheckedCreateNestedManyWithoutGroupInput>;
export const RestaurantLocationUncheckedCreateNestedManyWithoutGroupInputObjectZodSchema = makeSchema();
