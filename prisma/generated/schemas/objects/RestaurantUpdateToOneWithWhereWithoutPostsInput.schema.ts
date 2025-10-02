import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantWhereInputObjectSchema } from './RestaurantWhereInput.schema';
import { RestaurantUpdateWithoutPostsInputObjectSchema } from './RestaurantUpdateWithoutPostsInput.schema';
import { RestaurantUncheckedUpdateWithoutPostsInputObjectSchema } from './RestaurantUncheckedUpdateWithoutPostsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RestaurantWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => RestaurantUpdateWithoutPostsInputObjectSchema), z.lazy(() => RestaurantUncheckedUpdateWithoutPostsInputObjectSchema)])
}).strict();
export const RestaurantUpdateToOneWithWhereWithoutPostsInputObjectSchema: z.ZodType<Prisma.RestaurantUpdateToOneWithWhereWithoutPostsInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantUpdateToOneWithWhereWithoutPostsInput>;
export const RestaurantUpdateToOneWithWhereWithoutPostsInputObjectZodSchema = makeSchema();
