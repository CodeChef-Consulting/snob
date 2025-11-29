import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantGroupScalarWhereInputObjectSchema as RestaurantGroupScalarWhereInputObjectSchema } from './RestaurantGroupScalarWhereInput.schema';
import { RestaurantGroupUpdateManyMutationInputObjectSchema as RestaurantGroupUpdateManyMutationInputObjectSchema } from './RestaurantGroupUpdateManyMutationInput.schema';
import { RestaurantGroupUncheckedUpdateManyWithoutPostsInputObjectSchema as RestaurantGroupUncheckedUpdateManyWithoutPostsInputObjectSchema } from './RestaurantGroupUncheckedUpdateManyWithoutPostsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RestaurantGroupScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => RestaurantGroupUpdateManyMutationInputObjectSchema), z.lazy(() => RestaurantGroupUncheckedUpdateManyWithoutPostsInputObjectSchema)])
}).strict();
export const RestaurantGroupUpdateManyWithWhereWithoutPostsInputObjectSchema: z.ZodType<Prisma.RestaurantGroupUpdateManyWithWhereWithoutPostsInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantGroupUpdateManyWithWhereWithoutPostsInput>;
export const RestaurantGroupUpdateManyWithWhereWithoutPostsInputObjectZodSchema = makeSchema();
