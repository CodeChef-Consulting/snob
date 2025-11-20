import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantGroupUpdateWithoutLocationsInputObjectSchema as RestaurantGroupUpdateWithoutLocationsInputObjectSchema } from './RestaurantGroupUpdateWithoutLocationsInput.schema';
import { RestaurantGroupUncheckedUpdateWithoutLocationsInputObjectSchema as RestaurantGroupUncheckedUpdateWithoutLocationsInputObjectSchema } from './RestaurantGroupUncheckedUpdateWithoutLocationsInput.schema';
import { RestaurantGroupCreateWithoutLocationsInputObjectSchema as RestaurantGroupCreateWithoutLocationsInputObjectSchema } from './RestaurantGroupCreateWithoutLocationsInput.schema';
import { RestaurantGroupUncheckedCreateWithoutLocationsInputObjectSchema as RestaurantGroupUncheckedCreateWithoutLocationsInputObjectSchema } from './RestaurantGroupUncheckedCreateWithoutLocationsInput.schema';
import { RestaurantGroupWhereInputObjectSchema as RestaurantGroupWhereInputObjectSchema } from './RestaurantGroupWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => RestaurantGroupUpdateWithoutLocationsInputObjectSchema), z.lazy(() => RestaurantGroupUncheckedUpdateWithoutLocationsInputObjectSchema)]),
  create: z.union([z.lazy(() => RestaurantGroupCreateWithoutLocationsInputObjectSchema), z.lazy(() => RestaurantGroupUncheckedCreateWithoutLocationsInputObjectSchema)]),
  where: z.lazy(() => RestaurantGroupWhereInputObjectSchema).optional()
}).strict();
export const RestaurantGroupUpsertWithoutLocationsInputObjectSchema: z.ZodType<Prisma.RestaurantGroupUpsertWithoutLocationsInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantGroupUpsertWithoutLocationsInput>;
export const RestaurantGroupUpsertWithoutLocationsInputObjectZodSchema = makeSchema();
