import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantUpdateWithoutPostsInputObjectSchema as RestaurantUpdateWithoutPostsInputObjectSchema } from './RestaurantUpdateWithoutPostsInput.schema';
import { RestaurantUncheckedUpdateWithoutPostsInputObjectSchema as RestaurantUncheckedUpdateWithoutPostsInputObjectSchema } from './RestaurantUncheckedUpdateWithoutPostsInput.schema';
import { RestaurantCreateWithoutPostsInputObjectSchema as RestaurantCreateWithoutPostsInputObjectSchema } from './RestaurantCreateWithoutPostsInput.schema';
import { RestaurantUncheckedCreateWithoutPostsInputObjectSchema as RestaurantUncheckedCreateWithoutPostsInputObjectSchema } from './RestaurantUncheckedCreateWithoutPostsInput.schema';
import { RestaurantWhereInputObjectSchema as RestaurantWhereInputObjectSchema } from './RestaurantWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => RestaurantUpdateWithoutPostsInputObjectSchema), z.lazy(() => RestaurantUncheckedUpdateWithoutPostsInputObjectSchema)]),
  create: z.union([z.lazy(() => RestaurantCreateWithoutPostsInputObjectSchema), z.lazy(() => RestaurantUncheckedCreateWithoutPostsInputObjectSchema)]),
  where: z.lazy(() => RestaurantWhereInputObjectSchema).optional()
}).strict();
export const RestaurantUpsertWithoutPostsInputObjectSchema: z.ZodType<Prisma.RestaurantUpsertWithoutPostsInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantUpsertWithoutPostsInput>;
export const RestaurantUpsertWithoutPostsInputObjectZodSchema = makeSchema();
