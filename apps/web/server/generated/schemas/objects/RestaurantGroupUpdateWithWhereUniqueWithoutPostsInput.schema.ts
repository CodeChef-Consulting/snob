import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantGroupWhereUniqueInputObjectSchema as RestaurantGroupWhereUniqueInputObjectSchema } from './RestaurantGroupWhereUniqueInput.schema';
import { RestaurantGroupUpdateWithoutPostsInputObjectSchema as RestaurantGroupUpdateWithoutPostsInputObjectSchema } from './RestaurantGroupUpdateWithoutPostsInput.schema';
import { RestaurantGroupUncheckedUpdateWithoutPostsInputObjectSchema as RestaurantGroupUncheckedUpdateWithoutPostsInputObjectSchema } from './RestaurantGroupUncheckedUpdateWithoutPostsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RestaurantGroupWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => RestaurantGroupUpdateWithoutPostsInputObjectSchema), z.lazy(() => RestaurantGroupUncheckedUpdateWithoutPostsInputObjectSchema)])
}).strict();
export const RestaurantGroupUpdateWithWhereUniqueWithoutPostsInputObjectSchema: z.ZodType<Prisma.RestaurantGroupUpdateWithWhereUniqueWithoutPostsInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantGroupUpdateWithWhereUniqueWithoutPostsInput>;
export const RestaurantGroupUpdateWithWhereUniqueWithoutPostsInputObjectZodSchema = makeSchema();
