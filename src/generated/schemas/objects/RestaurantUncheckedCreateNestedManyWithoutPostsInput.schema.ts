import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantCreateWithoutPostsInputObjectSchema as RestaurantCreateWithoutPostsInputObjectSchema } from './RestaurantCreateWithoutPostsInput.schema';
import { RestaurantUncheckedCreateWithoutPostsInputObjectSchema as RestaurantUncheckedCreateWithoutPostsInputObjectSchema } from './RestaurantUncheckedCreateWithoutPostsInput.schema';
import { RestaurantCreateOrConnectWithoutPostsInputObjectSchema as RestaurantCreateOrConnectWithoutPostsInputObjectSchema } from './RestaurantCreateOrConnectWithoutPostsInput.schema';
import { RestaurantWhereUniqueInputObjectSchema as RestaurantWhereUniqueInputObjectSchema } from './RestaurantWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => RestaurantCreateWithoutPostsInputObjectSchema), z.lazy(() => RestaurantCreateWithoutPostsInputObjectSchema).array(), z.lazy(() => RestaurantUncheckedCreateWithoutPostsInputObjectSchema), z.lazy(() => RestaurantUncheckedCreateWithoutPostsInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => RestaurantCreateOrConnectWithoutPostsInputObjectSchema), z.lazy(() => RestaurantCreateOrConnectWithoutPostsInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => RestaurantWhereUniqueInputObjectSchema), z.lazy(() => RestaurantWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const RestaurantUncheckedCreateNestedManyWithoutPostsInputObjectSchema: z.ZodType<Prisma.RestaurantUncheckedCreateNestedManyWithoutPostsInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantUncheckedCreateNestedManyWithoutPostsInput>;
export const RestaurantUncheckedCreateNestedManyWithoutPostsInputObjectZodSchema = makeSchema();
