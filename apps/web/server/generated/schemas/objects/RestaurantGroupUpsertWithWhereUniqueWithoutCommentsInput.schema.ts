import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantGroupWhereUniqueInputObjectSchema as RestaurantGroupWhereUniqueInputObjectSchema } from './RestaurantGroupWhereUniqueInput.schema';
import { RestaurantGroupUpdateWithoutCommentsInputObjectSchema as RestaurantGroupUpdateWithoutCommentsInputObjectSchema } from './RestaurantGroupUpdateWithoutCommentsInput.schema';
import { RestaurantGroupUncheckedUpdateWithoutCommentsInputObjectSchema as RestaurantGroupUncheckedUpdateWithoutCommentsInputObjectSchema } from './RestaurantGroupUncheckedUpdateWithoutCommentsInput.schema';
import { RestaurantGroupCreateWithoutCommentsInputObjectSchema as RestaurantGroupCreateWithoutCommentsInputObjectSchema } from './RestaurantGroupCreateWithoutCommentsInput.schema';
import { RestaurantGroupUncheckedCreateWithoutCommentsInputObjectSchema as RestaurantGroupUncheckedCreateWithoutCommentsInputObjectSchema } from './RestaurantGroupUncheckedCreateWithoutCommentsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RestaurantGroupWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => RestaurantGroupUpdateWithoutCommentsInputObjectSchema), z.lazy(() => RestaurantGroupUncheckedUpdateWithoutCommentsInputObjectSchema)]),
  create: z.union([z.lazy(() => RestaurantGroupCreateWithoutCommentsInputObjectSchema), z.lazy(() => RestaurantGroupUncheckedCreateWithoutCommentsInputObjectSchema)])
}).strict();
export const RestaurantGroupUpsertWithWhereUniqueWithoutCommentsInputObjectSchema: z.ZodType<Prisma.RestaurantGroupUpsertWithWhereUniqueWithoutCommentsInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantGroupUpsertWithWhereUniqueWithoutCommentsInput>;
export const RestaurantGroupUpsertWithWhereUniqueWithoutCommentsInputObjectZodSchema = makeSchema();
