import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantLocationWhereUniqueInputObjectSchema as RestaurantLocationWhereUniqueInputObjectSchema } from './RestaurantLocationWhereUniqueInput.schema';
import { RestaurantLocationUpdateWithoutGroupInputObjectSchema as RestaurantLocationUpdateWithoutGroupInputObjectSchema } from './RestaurantLocationUpdateWithoutGroupInput.schema';
import { RestaurantLocationUncheckedUpdateWithoutGroupInputObjectSchema as RestaurantLocationUncheckedUpdateWithoutGroupInputObjectSchema } from './RestaurantLocationUncheckedUpdateWithoutGroupInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RestaurantLocationWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => RestaurantLocationUpdateWithoutGroupInputObjectSchema), z.lazy(() => RestaurantLocationUncheckedUpdateWithoutGroupInputObjectSchema)])
}).strict();
export const RestaurantLocationUpdateWithWhereUniqueWithoutGroupInputObjectSchema: z.ZodType<Prisma.RestaurantLocationUpdateWithWhereUniqueWithoutGroupInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantLocationUpdateWithWhereUniqueWithoutGroupInput>;
export const RestaurantLocationUpdateWithWhereUniqueWithoutGroupInputObjectZodSchema = makeSchema();
