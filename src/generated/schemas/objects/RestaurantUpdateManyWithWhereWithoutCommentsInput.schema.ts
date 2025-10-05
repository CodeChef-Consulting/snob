import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantScalarWhereInputObjectSchema as RestaurantScalarWhereInputObjectSchema } from './RestaurantScalarWhereInput.schema';
import { RestaurantUpdateManyMutationInputObjectSchema as RestaurantUpdateManyMutationInputObjectSchema } from './RestaurantUpdateManyMutationInput.schema';
import { RestaurantUncheckedUpdateManyWithoutCommentsInputObjectSchema as RestaurantUncheckedUpdateManyWithoutCommentsInputObjectSchema } from './RestaurantUncheckedUpdateManyWithoutCommentsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RestaurantScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => RestaurantUpdateManyMutationInputObjectSchema), z.lazy(() => RestaurantUncheckedUpdateManyWithoutCommentsInputObjectSchema)])
}).strict();
export const RestaurantUpdateManyWithWhereWithoutCommentsInputObjectSchema: z.ZodType<Prisma.RestaurantUpdateManyWithWhereWithoutCommentsInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantUpdateManyWithWhereWithoutCommentsInput>;
export const RestaurantUpdateManyWithWhereWithoutCommentsInputObjectZodSchema = makeSchema();
