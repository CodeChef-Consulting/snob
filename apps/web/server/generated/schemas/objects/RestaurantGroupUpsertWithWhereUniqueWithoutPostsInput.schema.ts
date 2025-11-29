import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantGroupWhereUniqueInputObjectSchema as RestaurantGroupWhereUniqueInputObjectSchema } from './RestaurantGroupWhereUniqueInput.schema';
import { RestaurantGroupUpdateWithoutPostsInputObjectSchema as RestaurantGroupUpdateWithoutPostsInputObjectSchema } from './RestaurantGroupUpdateWithoutPostsInput.schema';
import { RestaurantGroupUncheckedUpdateWithoutPostsInputObjectSchema as RestaurantGroupUncheckedUpdateWithoutPostsInputObjectSchema } from './RestaurantGroupUncheckedUpdateWithoutPostsInput.schema';
import { RestaurantGroupCreateWithoutPostsInputObjectSchema as RestaurantGroupCreateWithoutPostsInputObjectSchema } from './RestaurantGroupCreateWithoutPostsInput.schema';
import { RestaurantGroupUncheckedCreateWithoutPostsInputObjectSchema as RestaurantGroupUncheckedCreateWithoutPostsInputObjectSchema } from './RestaurantGroupUncheckedCreateWithoutPostsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RestaurantGroupWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => RestaurantGroupUpdateWithoutPostsInputObjectSchema), z.lazy(() => RestaurantGroupUncheckedUpdateWithoutPostsInputObjectSchema)]),
  create: z.union([z.lazy(() => RestaurantGroupCreateWithoutPostsInputObjectSchema), z.lazy(() => RestaurantGroupUncheckedCreateWithoutPostsInputObjectSchema)])
}).strict();
export const RestaurantGroupUpsertWithWhereUniqueWithoutPostsInputObjectSchema: z.ZodType<Prisma.RestaurantGroupUpsertWithWhereUniqueWithoutPostsInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantGroupUpsertWithWhereUniqueWithoutPostsInput>;
export const RestaurantGroupUpsertWithWhereUniqueWithoutPostsInputObjectZodSchema = makeSchema();
