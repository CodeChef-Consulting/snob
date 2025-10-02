import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantCreateWithoutPostsInputObjectSchema } from './RestaurantCreateWithoutPostsInput.schema';
import { RestaurantUncheckedCreateWithoutPostsInputObjectSchema } from './RestaurantUncheckedCreateWithoutPostsInput.schema';
import { RestaurantCreateOrConnectWithoutPostsInputObjectSchema } from './RestaurantCreateOrConnectWithoutPostsInput.schema';
import { RestaurantWhereUniqueInputObjectSchema } from './RestaurantWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => RestaurantCreateWithoutPostsInputObjectSchema), z.lazy(() => RestaurantUncheckedCreateWithoutPostsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => RestaurantCreateOrConnectWithoutPostsInputObjectSchema).optional(),
  connect: z.lazy(() => RestaurantWhereUniqueInputObjectSchema).optional()
}).strict();
export const RestaurantCreateNestedOneWithoutPostsInputObjectSchema: z.ZodType<Prisma.RestaurantCreateNestedOneWithoutPostsInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantCreateNestedOneWithoutPostsInput>;
export const RestaurantCreateNestedOneWithoutPostsInputObjectZodSchema = makeSchema();
