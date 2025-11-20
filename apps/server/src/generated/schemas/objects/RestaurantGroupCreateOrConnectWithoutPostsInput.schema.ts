import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantGroupWhereUniqueInputObjectSchema as RestaurantGroupWhereUniqueInputObjectSchema } from './RestaurantGroupWhereUniqueInput.schema';
import { RestaurantGroupCreateWithoutPostsInputObjectSchema as RestaurantGroupCreateWithoutPostsInputObjectSchema } from './RestaurantGroupCreateWithoutPostsInput.schema';
import { RestaurantGroupUncheckedCreateWithoutPostsInputObjectSchema as RestaurantGroupUncheckedCreateWithoutPostsInputObjectSchema } from './RestaurantGroupUncheckedCreateWithoutPostsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RestaurantGroupWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => RestaurantGroupCreateWithoutPostsInputObjectSchema), z.lazy(() => RestaurantGroupUncheckedCreateWithoutPostsInputObjectSchema)])
}).strict();
export const RestaurantGroupCreateOrConnectWithoutPostsInputObjectSchema: z.ZodType<Prisma.RestaurantGroupCreateOrConnectWithoutPostsInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantGroupCreateOrConnectWithoutPostsInput>;
export const RestaurantGroupCreateOrConnectWithoutPostsInputObjectZodSchema = makeSchema();
