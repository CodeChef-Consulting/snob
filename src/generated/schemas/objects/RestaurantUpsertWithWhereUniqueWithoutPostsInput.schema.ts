import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantWhereUniqueInputObjectSchema as RestaurantWhereUniqueInputObjectSchema } from './RestaurantWhereUniqueInput.schema';
import { RestaurantUpdateWithoutPostsInputObjectSchema as RestaurantUpdateWithoutPostsInputObjectSchema } from './RestaurantUpdateWithoutPostsInput.schema';
import { RestaurantUncheckedUpdateWithoutPostsInputObjectSchema as RestaurantUncheckedUpdateWithoutPostsInputObjectSchema } from './RestaurantUncheckedUpdateWithoutPostsInput.schema';
import { RestaurantCreateWithoutPostsInputObjectSchema as RestaurantCreateWithoutPostsInputObjectSchema } from './RestaurantCreateWithoutPostsInput.schema';
import { RestaurantUncheckedCreateWithoutPostsInputObjectSchema as RestaurantUncheckedCreateWithoutPostsInputObjectSchema } from './RestaurantUncheckedCreateWithoutPostsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RestaurantWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => RestaurantUpdateWithoutPostsInputObjectSchema), z.lazy(() => RestaurantUncheckedUpdateWithoutPostsInputObjectSchema)]),
  create: z.union([z.lazy(() => RestaurantCreateWithoutPostsInputObjectSchema), z.lazy(() => RestaurantUncheckedCreateWithoutPostsInputObjectSchema)])
}).strict();
export const RestaurantUpsertWithWhereUniqueWithoutPostsInputObjectSchema: z.ZodType<Prisma.RestaurantUpsertWithWhereUniqueWithoutPostsInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantUpsertWithWhereUniqueWithoutPostsInput>;
export const RestaurantUpsertWithWhereUniqueWithoutPostsInputObjectZodSchema = makeSchema();
