import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantWhereUniqueInputObjectSchema as RestaurantWhereUniqueInputObjectSchema } from './RestaurantWhereUniqueInput.schema';
import { RestaurantCreateWithoutCommentsInputObjectSchema as RestaurantCreateWithoutCommentsInputObjectSchema } from './RestaurantCreateWithoutCommentsInput.schema';
import { RestaurantUncheckedCreateWithoutCommentsInputObjectSchema as RestaurantUncheckedCreateWithoutCommentsInputObjectSchema } from './RestaurantUncheckedCreateWithoutCommentsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RestaurantWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => RestaurantCreateWithoutCommentsInputObjectSchema), z.lazy(() => RestaurantUncheckedCreateWithoutCommentsInputObjectSchema)])
}).strict();
export const RestaurantCreateOrConnectWithoutCommentsInputObjectSchema: z.ZodType<Prisma.RestaurantCreateOrConnectWithoutCommentsInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantCreateOrConnectWithoutCommentsInput>;
export const RestaurantCreateOrConnectWithoutCommentsInputObjectZodSchema = makeSchema();
