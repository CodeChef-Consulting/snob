import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantWhereUniqueInputObjectSchema as RestaurantWhereUniqueInputObjectSchema } from './RestaurantWhereUniqueInput.schema';
import { RestaurantUpdateWithoutPostsInputObjectSchema as RestaurantUpdateWithoutPostsInputObjectSchema } from './RestaurantUpdateWithoutPostsInput.schema';
import { RestaurantUncheckedUpdateWithoutPostsInputObjectSchema as RestaurantUncheckedUpdateWithoutPostsInputObjectSchema } from './RestaurantUncheckedUpdateWithoutPostsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RestaurantWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => RestaurantUpdateWithoutPostsInputObjectSchema), z.lazy(() => RestaurantUncheckedUpdateWithoutPostsInputObjectSchema)])
}).strict();
export const RestaurantUpdateWithWhereUniqueWithoutPostsInputObjectSchema: z.ZodType<Prisma.RestaurantUpdateWithWhereUniqueWithoutPostsInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantUpdateWithWhereUniqueWithoutPostsInput>;
export const RestaurantUpdateWithWhereUniqueWithoutPostsInputObjectZodSchema = makeSchema();
