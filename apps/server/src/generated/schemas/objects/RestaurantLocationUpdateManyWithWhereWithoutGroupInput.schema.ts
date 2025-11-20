import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantLocationScalarWhereInputObjectSchema as RestaurantLocationScalarWhereInputObjectSchema } from './RestaurantLocationScalarWhereInput.schema';
import { RestaurantLocationUpdateManyMutationInputObjectSchema as RestaurantLocationUpdateManyMutationInputObjectSchema } from './RestaurantLocationUpdateManyMutationInput.schema';
import { RestaurantLocationUncheckedUpdateManyWithoutGroupInputObjectSchema as RestaurantLocationUncheckedUpdateManyWithoutGroupInputObjectSchema } from './RestaurantLocationUncheckedUpdateManyWithoutGroupInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RestaurantLocationScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => RestaurantLocationUpdateManyMutationInputObjectSchema), z.lazy(() => RestaurantLocationUncheckedUpdateManyWithoutGroupInputObjectSchema)])
}).strict();
export const RestaurantLocationUpdateManyWithWhereWithoutGroupInputObjectSchema: z.ZodType<Prisma.RestaurantLocationUpdateManyWithWhereWithoutGroupInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantLocationUpdateManyWithWhereWithoutGroupInput>;
export const RestaurantLocationUpdateManyWithWhereWithoutGroupInputObjectZodSchema = makeSchema();
