import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantWhereUniqueInputObjectSchema as RestaurantWhereUniqueInputObjectSchema } from './RestaurantWhereUniqueInput.schema';
import { RestaurantUpdateWithoutCommentsInputObjectSchema as RestaurantUpdateWithoutCommentsInputObjectSchema } from './RestaurantUpdateWithoutCommentsInput.schema';
import { RestaurantUncheckedUpdateWithoutCommentsInputObjectSchema as RestaurantUncheckedUpdateWithoutCommentsInputObjectSchema } from './RestaurantUncheckedUpdateWithoutCommentsInput.schema';
import { RestaurantCreateWithoutCommentsInputObjectSchema as RestaurantCreateWithoutCommentsInputObjectSchema } from './RestaurantCreateWithoutCommentsInput.schema';
import { RestaurantUncheckedCreateWithoutCommentsInputObjectSchema as RestaurantUncheckedCreateWithoutCommentsInputObjectSchema } from './RestaurantUncheckedCreateWithoutCommentsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RestaurantWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => RestaurantUpdateWithoutCommentsInputObjectSchema), z.lazy(() => RestaurantUncheckedUpdateWithoutCommentsInputObjectSchema)]),
  create: z.union([z.lazy(() => RestaurantCreateWithoutCommentsInputObjectSchema), z.lazy(() => RestaurantUncheckedCreateWithoutCommentsInputObjectSchema)])
}).strict();
export const RestaurantUpsertWithWhereUniqueWithoutCommentsInputObjectSchema: z.ZodType<Prisma.RestaurantUpsertWithWhereUniqueWithoutCommentsInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantUpsertWithWhereUniqueWithoutCommentsInput>;
export const RestaurantUpsertWithWhereUniqueWithoutCommentsInputObjectZodSchema = makeSchema();
