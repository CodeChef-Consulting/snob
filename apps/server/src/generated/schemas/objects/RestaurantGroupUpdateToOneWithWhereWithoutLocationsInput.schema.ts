import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantGroupWhereInputObjectSchema as RestaurantGroupWhereInputObjectSchema } from './RestaurantGroupWhereInput.schema';
import { RestaurantGroupUpdateWithoutLocationsInputObjectSchema as RestaurantGroupUpdateWithoutLocationsInputObjectSchema } from './RestaurantGroupUpdateWithoutLocationsInput.schema';
import { RestaurantGroupUncheckedUpdateWithoutLocationsInputObjectSchema as RestaurantGroupUncheckedUpdateWithoutLocationsInputObjectSchema } from './RestaurantGroupUncheckedUpdateWithoutLocationsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RestaurantGroupWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => RestaurantGroupUpdateWithoutLocationsInputObjectSchema), z.lazy(() => RestaurantGroupUncheckedUpdateWithoutLocationsInputObjectSchema)])
}).strict();
export const RestaurantGroupUpdateToOneWithWhereWithoutLocationsInputObjectSchema: z.ZodType<Prisma.RestaurantGroupUpdateToOneWithWhereWithoutLocationsInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantGroupUpdateToOneWithWhereWithoutLocationsInput>;
export const RestaurantGroupUpdateToOneWithWhereWithoutLocationsInputObjectZodSchema = makeSchema();
