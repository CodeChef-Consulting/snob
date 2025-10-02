import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantCreateWithoutPostsInputObjectSchema } from './RestaurantCreateWithoutPostsInput.schema';
import { RestaurantUncheckedCreateWithoutPostsInputObjectSchema } from './RestaurantUncheckedCreateWithoutPostsInput.schema';
import { RestaurantCreateOrConnectWithoutPostsInputObjectSchema } from './RestaurantCreateOrConnectWithoutPostsInput.schema';
import { RestaurantUpsertWithoutPostsInputObjectSchema } from './RestaurantUpsertWithoutPostsInput.schema';
import { RestaurantWhereInputObjectSchema } from './RestaurantWhereInput.schema';
import { RestaurantWhereUniqueInputObjectSchema } from './RestaurantWhereUniqueInput.schema';
import { RestaurantUpdateToOneWithWhereWithoutPostsInputObjectSchema } from './RestaurantUpdateToOneWithWhereWithoutPostsInput.schema';
import { RestaurantUpdateWithoutPostsInputObjectSchema } from './RestaurantUpdateWithoutPostsInput.schema';
import { RestaurantUncheckedUpdateWithoutPostsInputObjectSchema } from './RestaurantUncheckedUpdateWithoutPostsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => RestaurantCreateWithoutPostsInputObjectSchema), z.lazy(() => RestaurantUncheckedCreateWithoutPostsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => RestaurantCreateOrConnectWithoutPostsInputObjectSchema).optional(),
  upsert: z.lazy(() => RestaurantUpsertWithoutPostsInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => RestaurantWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => RestaurantWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => RestaurantWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => RestaurantUpdateToOneWithWhereWithoutPostsInputObjectSchema), z.lazy(() => RestaurantUpdateWithoutPostsInputObjectSchema), z.lazy(() => RestaurantUncheckedUpdateWithoutPostsInputObjectSchema)]).optional()
}).strict();
export const RestaurantUpdateOneWithoutPostsNestedInputObjectSchema: z.ZodType<Prisma.RestaurantUpdateOneWithoutPostsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantUpdateOneWithoutPostsNestedInput>;
export const RestaurantUpdateOneWithoutPostsNestedInputObjectZodSchema = makeSchema();
