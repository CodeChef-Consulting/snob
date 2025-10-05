import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantCreateWithoutCommentsInputObjectSchema as RestaurantCreateWithoutCommentsInputObjectSchema } from './RestaurantCreateWithoutCommentsInput.schema';
import { RestaurantUncheckedCreateWithoutCommentsInputObjectSchema as RestaurantUncheckedCreateWithoutCommentsInputObjectSchema } from './RestaurantUncheckedCreateWithoutCommentsInput.schema';
import { RestaurantCreateOrConnectWithoutCommentsInputObjectSchema as RestaurantCreateOrConnectWithoutCommentsInputObjectSchema } from './RestaurantCreateOrConnectWithoutCommentsInput.schema';
import { RestaurantWhereUniqueInputObjectSchema as RestaurantWhereUniqueInputObjectSchema } from './RestaurantWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => RestaurantCreateWithoutCommentsInputObjectSchema), z.lazy(() => RestaurantCreateWithoutCommentsInputObjectSchema).array(), z.lazy(() => RestaurantUncheckedCreateWithoutCommentsInputObjectSchema), z.lazy(() => RestaurantUncheckedCreateWithoutCommentsInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => RestaurantCreateOrConnectWithoutCommentsInputObjectSchema), z.lazy(() => RestaurantCreateOrConnectWithoutCommentsInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => RestaurantWhereUniqueInputObjectSchema), z.lazy(() => RestaurantWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const RestaurantUncheckedCreateNestedManyWithoutCommentsInputObjectSchema: z.ZodType<Prisma.RestaurantUncheckedCreateNestedManyWithoutCommentsInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantUncheckedCreateNestedManyWithoutCommentsInput>;
export const RestaurantUncheckedCreateNestedManyWithoutCommentsInputObjectZodSchema = makeSchema();
