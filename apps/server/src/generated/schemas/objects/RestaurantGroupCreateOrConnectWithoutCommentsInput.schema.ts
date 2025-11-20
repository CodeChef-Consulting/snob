import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantGroupWhereUniqueInputObjectSchema as RestaurantGroupWhereUniqueInputObjectSchema } from './RestaurantGroupWhereUniqueInput.schema';
import { RestaurantGroupCreateWithoutCommentsInputObjectSchema as RestaurantGroupCreateWithoutCommentsInputObjectSchema } from './RestaurantGroupCreateWithoutCommentsInput.schema';
import { RestaurantGroupUncheckedCreateWithoutCommentsInputObjectSchema as RestaurantGroupUncheckedCreateWithoutCommentsInputObjectSchema } from './RestaurantGroupUncheckedCreateWithoutCommentsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RestaurantGroupWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => RestaurantGroupCreateWithoutCommentsInputObjectSchema), z.lazy(() => RestaurantGroupUncheckedCreateWithoutCommentsInputObjectSchema)])
}).strict();
export const RestaurantGroupCreateOrConnectWithoutCommentsInputObjectSchema: z.ZodType<Prisma.RestaurantGroupCreateOrConnectWithoutCommentsInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantGroupCreateOrConnectWithoutCommentsInput>;
export const RestaurantGroupCreateOrConnectWithoutCommentsInputObjectZodSchema = makeSchema();
