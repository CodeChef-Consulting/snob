import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantScalarWhereInputObjectSchema as RestaurantScalarWhereInputObjectSchema } from './RestaurantScalarWhereInput.schema';
import { RestaurantUpdateManyMutationInputObjectSchema as RestaurantUpdateManyMutationInputObjectSchema } from './RestaurantUpdateManyMutationInput.schema';
import { RestaurantUncheckedUpdateManyWithoutPostsInputObjectSchema as RestaurantUncheckedUpdateManyWithoutPostsInputObjectSchema } from './RestaurantUncheckedUpdateManyWithoutPostsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RestaurantScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => RestaurantUpdateManyMutationInputObjectSchema), z.lazy(() => RestaurantUncheckedUpdateManyWithoutPostsInputObjectSchema)])
}).strict();
export const RestaurantUpdateManyWithWhereWithoutPostsInputObjectSchema: z.ZodType<Prisma.RestaurantUpdateManyWithWhereWithoutPostsInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantUpdateManyWithWhereWithoutPostsInput>;
export const RestaurantUpdateManyWithWhereWithoutPostsInputObjectZodSchema = makeSchema();
