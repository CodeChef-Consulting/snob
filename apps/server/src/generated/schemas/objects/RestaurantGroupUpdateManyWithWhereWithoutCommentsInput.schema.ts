import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantGroupScalarWhereInputObjectSchema as RestaurantGroupScalarWhereInputObjectSchema } from './RestaurantGroupScalarWhereInput.schema';
import { RestaurantGroupUpdateManyMutationInputObjectSchema as RestaurantGroupUpdateManyMutationInputObjectSchema } from './RestaurantGroupUpdateManyMutationInput.schema';
import { RestaurantGroupUncheckedUpdateManyWithoutCommentsInputObjectSchema as RestaurantGroupUncheckedUpdateManyWithoutCommentsInputObjectSchema } from './RestaurantGroupUncheckedUpdateManyWithoutCommentsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RestaurantGroupScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => RestaurantGroupUpdateManyMutationInputObjectSchema), z.lazy(() => RestaurantGroupUncheckedUpdateManyWithoutCommentsInputObjectSchema)])
}).strict();
export const RestaurantGroupUpdateManyWithWhereWithoutCommentsInputObjectSchema: z.ZodType<Prisma.RestaurantGroupUpdateManyWithWhereWithoutCommentsInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantGroupUpdateManyWithWhereWithoutCommentsInput>;
export const RestaurantGroupUpdateManyWithWhereWithoutCommentsInputObjectZodSchema = makeSchema();
