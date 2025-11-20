import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantGroupWhereUniqueInputObjectSchema as RestaurantGroupWhereUniqueInputObjectSchema } from './RestaurantGroupWhereUniqueInput.schema';
import { RestaurantGroupCreateWithoutLocationsInputObjectSchema as RestaurantGroupCreateWithoutLocationsInputObjectSchema } from './RestaurantGroupCreateWithoutLocationsInput.schema';
import { RestaurantGroupUncheckedCreateWithoutLocationsInputObjectSchema as RestaurantGroupUncheckedCreateWithoutLocationsInputObjectSchema } from './RestaurantGroupUncheckedCreateWithoutLocationsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RestaurantGroupWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => RestaurantGroupCreateWithoutLocationsInputObjectSchema), z.lazy(() => RestaurantGroupUncheckedCreateWithoutLocationsInputObjectSchema)])
}).strict();
export const RestaurantGroupCreateOrConnectWithoutLocationsInputObjectSchema: z.ZodType<Prisma.RestaurantGroupCreateOrConnectWithoutLocationsInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantGroupCreateOrConnectWithoutLocationsInput>;
export const RestaurantGroupCreateOrConnectWithoutLocationsInputObjectZodSchema = makeSchema();
