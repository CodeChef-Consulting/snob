import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantGroupCreateWithoutCommentsInputObjectSchema as RestaurantGroupCreateWithoutCommentsInputObjectSchema } from './RestaurantGroupCreateWithoutCommentsInput.schema';
import { RestaurantGroupUncheckedCreateWithoutCommentsInputObjectSchema as RestaurantGroupUncheckedCreateWithoutCommentsInputObjectSchema } from './RestaurantGroupUncheckedCreateWithoutCommentsInput.schema';
import { RestaurantGroupCreateOrConnectWithoutCommentsInputObjectSchema as RestaurantGroupCreateOrConnectWithoutCommentsInputObjectSchema } from './RestaurantGroupCreateOrConnectWithoutCommentsInput.schema';
import { RestaurantGroupWhereUniqueInputObjectSchema as RestaurantGroupWhereUniqueInputObjectSchema } from './RestaurantGroupWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => RestaurantGroupCreateWithoutCommentsInputObjectSchema), z.lazy(() => RestaurantGroupCreateWithoutCommentsInputObjectSchema).array(), z.lazy(() => RestaurantGroupUncheckedCreateWithoutCommentsInputObjectSchema), z.lazy(() => RestaurantGroupUncheckedCreateWithoutCommentsInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => RestaurantGroupCreateOrConnectWithoutCommentsInputObjectSchema), z.lazy(() => RestaurantGroupCreateOrConnectWithoutCommentsInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => RestaurantGroupWhereUniqueInputObjectSchema), z.lazy(() => RestaurantGroupWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const RestaurantGroupCreateNestedManyWithoutCommentsInputObjectSchema: z.ZodType<Prisma.RestaurantGroupCreateNestedManyWithoutCommentsInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantGroupCreateNestedManyWithoutCommentsInput>;
export const RestaurantGroupCreateNestedManyWithoutCommentsInputObjectZodSchema = makeSchema();
