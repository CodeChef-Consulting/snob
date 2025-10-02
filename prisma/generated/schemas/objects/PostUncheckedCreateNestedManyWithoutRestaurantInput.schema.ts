import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PostCreateWithoutRestaurantInputObjectSchema } from './PostCreateWithoutRestaurantInput.schema';
import { PostUncheckedCreateWithoutRestaurantInputObjectSchema } from './PostUncheckedCreateWithoutRestaurantInput.schema';
import { PostCreateOrConnectWithoutRestaurantInputObjectSchema } from './PostCreateOrConnectWithoutRestaurantInput.schema';
import { PostCreateManyRestaurantInputEnvelopeObjectSchema } from './PostCreateManyRestaurantInputEnvelope.schema';
import { PostWhereUniqueInputObjectSchema } from './PostWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PostCreateWithoutRestaurantInputObjectSchema), z.lazy(() => PostCreateWithoutRestaurantInputObjectSchema).array(), z.lazy(() => PostUncheckedCreateWithoutRestaurantInputObjectSchema), z.lazy(() => PostUncheckedCreateWithoutRestaurantInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PostCreateOrConnectWithoutRestaurantInputObjectSchema), z.lazy(() => PostCreateOrConnectWithoutRestaurantInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => PostCreateManyRestaurantInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => PostWhereUniqueInputObjectSchema), z.lazy(() => PostWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const PostUncheckedCreateNestedManyWithoutRestaurantInputObjectSchema: z.ZodType<Prisma.PostUncheckedCreateNestedManyWithoutRestaurantInput> = makeSchema() as unknown as z.ZodType<Prisma.PostUncheckedCreateNestedManyWithoutRestaurantInput>;
export const PostUncheckedCreateNestedManyWithoutRestaurantInputObjectZodSchema = makeSchema();
