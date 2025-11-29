import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantLocationWhereUniqueInputObjectSchema as RestaurantLocationWhereUniqueInputObjectSchema } from './RestaurantLocationWhereUniqueInput.schema';
import { RestaurantLocationCreateWithoutGroupInputObjectSchema as RestaurantLocationCreateWithoutGroupInputObjectSchema } from './RestaurantLocationCreateWithoutGroupInput.schema';
import { RestaurantLocationUncheckedCreateWithoutGroupInputObjectSchema as RestaurantLocationUncheckedCreateWithoutGroupInputObjectSchema } from './RestaurantLocationUncheckedCreateWithoutGroupInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RestaurantLocationWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => RestaurantLocationCreateWithoutGroupInputObjectSchema), z.lazy(() => RestaurantLocationUncheckedCreateWithoutGroupInputObjectSchema)])
}).strict();
export const RestaurantLocationCreateOrConnectWithoutGroupInputObjectSchema: z.ZodType<Prisma.RestaurantLocationCreateOrConnectWithoutGroupInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantLocationCreateOrConnectWithoutGroupInput>;
export const RestaurantLocationCreateOrConnectWithoutGroupInputObjectZodSchema = makeSchema();
