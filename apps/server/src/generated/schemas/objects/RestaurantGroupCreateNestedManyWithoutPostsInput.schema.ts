import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantGroupCreateWithoutPostsInputObjectSchema as RestaurantGroupCreateWithoutPostsInputObjectSchema } from './RestaurantGroupCreateWithoutPostsInput.schema';
import { RestaurantGroupUncheckedCreateWithoutPostsInputObjectSchema as RestaurantGroupUncheckedCreateWithoutPostsInputObjectSchema } from './RestaurantGroupUncheckedCreateWithoutPostsInput.schema';
import { RestaurantGroupCreateOrConnectWithoutPostsInputObjectSchema as RestaurantGroupCreateOrConnectWithoutPostsInputObjectSchema } from './RestaurantGroupCreateOrConnectWithoutPostsInput.schema';
import { RestaurantGroupWhereUniqueInputObjectSchema as RestaurantGroupWhereUniqueInputObjectSchema } from './RestaurantGroupWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => RestaurantGroupCreateWithoutPostsInputObjectSchema), z.lazy(() => RestaurantGroupCreateWithoutPostsInputObjectSchema).array(), z.lazy(() => RestaurantGroupUncheckedCreateWithoutPostsInputObjectSchema), z.lazy(() => RestaurantGroupUncheckedCreateWithoutPostsInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => RestaurantGroupCreateOrConnectWithoutPostsInputObjectSchema), z.lazy(() => RestaurantGroupCreateOrConnectWithoutPostsInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => RestaurantGroupWhereUniqueInputObjectSchema), z.lazy(() => RestaurantGroupWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const RestaurantGroupCreateNestedManyWithoutPostsInputObjectSchema: z.ZodType<Prisma.RestaurantGroupCreateNestedManyWithoutPostsInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantGroupCreateNestedManyWithoutPostsInput>;
export const RestaurantGroupCreateNestedManyWithoutPostsInputObjectZodSchema = makeSchema();
