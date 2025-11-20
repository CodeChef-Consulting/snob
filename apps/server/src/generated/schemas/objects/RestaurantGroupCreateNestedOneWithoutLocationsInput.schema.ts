import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantGroupCreateWithoutLocationsInputObjectSchema as RestaurantGroupCreateWithoutLocationsInputObjectSchema } from './RestaurantGroupCreateWithoutLocationsInput.schema';
import { RestaurantGroupUncheckedCreateWithoutLocationsInputObjectSchema as RestaurantGroupUncheckedCreateWithoutLocationsInputObjectSchema } from './RestaurantGroupUncheckedCreateWithoutLocationsInput.schema';
import { RestaurantGroupCreateOrConnectWithoutLocationsInputObjectSchema as RestaurantGroupCreateOrConnectWithoutLocationsInputObjectSchema } from './RestaurantGroupCreateOrConnectWithoutLocationsInput.schema';
import { RestaurantGroupWhereUniqueInputObjectSchema as RestaurantGroupWhereUniqueInputObjectSchema } from './RestaurantGroupWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => RestaurantGroupCreateWithoutLocationsInputObjectSchema), z.lazy(() => RestaurantGroupUncheckedCreateWithoutLocationsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => RestaurantGroupCreateOrConnectWithoutLocationsInputObjectSchema).optional(),
  connect: z.lazy(() => RestaurantGroupWhereUniqueInputObjectSchema).optional()
}).strict();
export const RestaurantGroupCreateNestedOneWithoutLocationsInputObjectSchema: z.ZodType<Prisma.RestaurantGroupCreateNestedOneWithoutLocationsInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantGroupCreateNestedOneWithoutLocationsInput>;
export const RestaurantGroupCreateNestedOneWithoutLocationsInputObjectZodSchema = makeSchema();
