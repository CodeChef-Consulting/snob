import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantWhereUniqueInputObjectSchema } from './RestaurantWhereUniqueInput.schema';
import { RestaurantCreateWithoutPostsInputObjectSchema } from './RestaurantCreateWithoutPostsInput.schema';
import { RestaurantUncheckedCreateWithoutPostsInputObjectSchema } from './RestaurantUncheckedCreateWithoutPostsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RestaurantWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => RestaurantCreateWithoutPostsInputObjectSchema), z.lazy(() => RestaurantUncheckedCreateWithoutPostsInputObjectSchema)])
}).strict();
export const RestaurantCreateOrConnectWithoutPostsInputObjectSchema: z.ZodType<Prisma.RestaurantCreateOrConnectWithoutPostsInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantCreateOrConnectWithoutPostsInput>;
export const RestaurantCreateOrConnectWithoutPostsInputObjectZodSchema = makeSchema();
