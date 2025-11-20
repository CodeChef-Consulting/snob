import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantGroupWhereUniqueInputObjectSchema as RestaurantGroupWhereUniqueInputObjectSchema } from './RestaurantGroupWhereUniqueInput.schema';
import { RestaurantGroupUpdateWithoutCommentsInputObjectSchema as RestaurantGroupUpdateWithoutCommentsInputObjectSchema } from './RestaurantGroupUpdateWithoutCommentsInput.schema';
import { RestaurantGroupUncheckedUpdateWithoutCommentsInputObjectSchema as RestaurantGroupUncheckedUpdateWithoutCommentsInputObjectSchema } from './RestaurantGroupUncheckedUpdateWithoutCommentsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RestaurantGroupWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => RestaurantGroupUpdateWithoutCommentsInputObjectSchema), z.lazy(() => RestaurantGroupUncheckedUpdateWithoutCommentsInputObjectSchema)])
}).strict();
export const RestaurantGroupUpdateWithWhereUniqueWithoutCommentsInputObjectSchema: z.ZodType<Prisma.RestaurantGroupUpdateWithWhereUniqueWithoutCommentsInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantGroupUpdateWithWhereUniqueWithoutCommentsInput>;
export const RestaurantGroupUpdateWithWhereUniqueWithoutCommentsInputObjectZodSchema = makeSchema();
