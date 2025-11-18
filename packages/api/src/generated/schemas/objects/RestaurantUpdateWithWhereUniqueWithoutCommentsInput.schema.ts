import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantWhereUniqueInputObjectSchema as RestaurantWhereUniqueInputObjectSchema } from './RestaurantWhereUniqueInput.schema';
import { RestaurantUpdateWithoutCommentsInputObjectSchema as RestaurantUpdateWithoutCommentsInputObjectSchema } from './RestaurantUpdateWithoutCommentsInput.schema';
import { RestaurantUncheckedUpdateWithoutCommentsInputObjectSchema as RestaurantUncheckedUpdateWithoutCommentsInputObjectSchema } from './RestaurantUncheckedUpdateWithoutCommentsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RestaurantWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => RestaurantUpdateWithoutCommentsInputObjectSchema), z.lazy(() => RestaurantUncheckedUpdateWithoutCommentsInputObjectSchema)])
}).strict();
export const RestaurantUpdateWithWhereUniqueWithoutCommentsInputObjectSchema: z.ZodType<Prisma.RestaurantUpdateWithWhereUniqueWithoutCommentsInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantUpdateWithWhereUniqueWithoutCommentsInput>;
export const RestaurantUpdateWithWhereUniqueWithoutCommentsInputObjectZodSchema = makeSchema();
