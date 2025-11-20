import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantLocationWhereUniqueInputObjectSchema as RestaurantLocationWhereUniqueInputObjectSchema } from './RestaurantLocationWhereUniqueInput.schema';
import { RestaurantLocationUpdateWithoutGroupInputObjectSchema as RestaurantLocationUpdateWithoutGroupInputObjectSchema } from './RestaurantLocationUpdateWithoutGroupInput.schema';
import { RestaurantLocationUncheckedUpdateWithoutGroupInputObjectSchema as RestaurantLocationUncheckedUpdateWithoutGroupInputObjectSchema } from './RestaurantLocationUncheckedUpdateWithoutGroupInput.schema';
import { RestaurantLocationCreateWithoutGroupInputObjectSchema as RestaurantLocationCreateWithoutGroupInputObjectSchema } from './RestaurantLocationCreateWithoutGroupInput.schema';
import { RestaurantLocationUncheckedCreateWithoutGroupInputObjectSchema as RestaurantLocationUncheckedCreateWithoutGroupInputObjectSchema } from './RestaurantLocationUncheckedCreateWithoutGroupInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RestaurantLocationWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => RestaurantLocationUpdateWithoutGroupInputObjectSchema), z.lazy(() => RestaurantLocationUncheckedUpdateWithoutGroupInputObjectSchema)]),
  create: z.union([z.lazy(() => RestaurantLocationCreateWithoutGroupInputObjectSchema), z.lazy(() => RestaurantLocationUncheckedCreateWithoutGroupInputObjectSchema)])
}).strict();
export const RestaurantLocationUpsertWithWhereUniqueWithoutGroupInputObjectSchema: z.ZodType<Prisma.RestaurantLocationUpsertWithWhereUniqueWithoutGroupInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantLocationUpsertWithWhereUniqueWithoutGroupInput>;
export const RestaurantLocationUpsertWithWhereUniqueWithoutGroupInputObjectZodSchema = makeSchema();
