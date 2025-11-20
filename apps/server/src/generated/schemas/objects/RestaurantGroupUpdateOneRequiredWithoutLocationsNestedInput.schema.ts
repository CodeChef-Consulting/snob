import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantGroupCreateWithoutLocationsInputObjectSchema as RestaurantGroupCreateWithoutLocationsInputObjectSchema } from './RestaurantGroupCreateWithoutLocationsInput.schema';
import { RestaurantGroupUncheckedCreateWithoutLocationsInputObjectSchema as RestaurantGroupUncheckedCreateWithoutLocationsInputObjectSchema } from './RestaurantGroupUncheckedCreateWithoutLocationsInput.schema';
import { RestaurantGroupCreateOrConnectWithoutLocationsInputObjectSchema as RestaurantGroupCreateOrConnectWithoutLocationsInputObjectSchema } from './RestaurantGroupCreateOrConnectWithoutLocationsInput.schema';
import { RestaurantGroupUpsertWithoutLocationsInputObjectSchema as RestaurantGroupUpsertWithoutLocationsInputObjectSchema } from './RestaurantGroupUpsertWithoutLocationsInput.schema';
import { RestaurantGroupWhereUniqueInputObjectSchema as RestaurantGroupWhereUniqueInputObjectSchema } from './RestaurantGroupWhereUniqueInput.schema';
import { RestaurantGroupUpdateToOneWithWhereWithoutLocationsInputObjectSchema as RestaurantGroupUpdateToOneWithWhereWithoutLocationsInputObjectSchema } from './RestaurantGroupUpdateToOneWithWhereWithoutLocationsInput.schema';
import { RestaurantGroupUpdateWithoutLocationsInputObjectSchema as RestaurantGroupUpdateWithoutLocationsInputObjectSchema } from './RestaurantGroupUpdateWithoutLocationsInput.schema';
import { RestaurantGroupUncheckedUpdateWithoutLocationsInputObjectSchema as RestaurantGroupUncheckedUpdateWithoutLocationsInputObjectSchema } from './RestaurantGroupUncheckedUpdateWithoutLocationsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => RestaurantGroupCreateWithoutLocationsInputObjectSchema), z.lazy(() => RestaurantGroupUncheckedCreateWithoutLocationsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => RestaurantGroupCreateOrConnectWithoutLocationsInputObjectSchema).optional(),
  upsert: z.lazy(() => RestaurantGroupUpsertWithoutLocationsInputObjectSchema).optional(),
  connect: z.lazy(() => RestaurantGroupWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => RestaurantGroupUpdateToOneWithWhereWithoutLocationsInputObjectSchema), z.lazy(() => RestaurantGroupUpdateWithoutLocationsInputObjectSchema), z.lazy(() => RestaurantGroupUncheckedUpdateWithoutLocationsInputObjectSchema)]).optional()
}).strict();
export const RestaurantGroupUpdateOneRequiredWithoutLocationsNestedInputObjectSchema: z.ZodType<Prisma.RestaurantGroupUpdateOneRequiredWithoutLocationsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantGroupUpdateOneRequiredWithoutLocationsNestedInput>;
export const RestaurantGroupUpdateOneRequiredWithoutLocationsNestedInputObjectZodSchema = makeSchema();
