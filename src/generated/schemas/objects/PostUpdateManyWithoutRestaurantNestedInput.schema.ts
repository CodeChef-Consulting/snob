import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PostCreateWithoutRestaurantInputObjectSchema as PostCreateWithoutRestaurantInputObjectSchema } from './PostCreateWithoutRestaurantInput.schema';
import { PostUncheckedCreateWithoutRestaurantInputObjectSchema as PostUncheckedCreateWithoutRestaurantInputObjectSchema } from './PostUncheckedCreateWithoutRestaurantInput.schema';
import { PostCreateOrConnectWithoutRestaurantInputObjectSchema as PostCreateOrConnectWithoutRestaurantInputObjectSchema } from './PostCreateOrConnectWithoutRestaurantInput.schema';
import { PostUpsertWithWhereUniqueWithoutRestaurantInputObjectSchema as PostUpsertWithWhereUniqueWithoutRestaurantInputObjectSchema } from './PostUpsertWithWhereUniqueWithoutRestaurantInput.schema';
import { RestaurantPostCreateManyRestaurantInputEnvelopeObjectSchema as PostCreateManyRestaurantInputEnvelopeObjectSchema } from './PostCreateManyRestaurantInputEnvelope.schema';
import { PostWhereUniqueInputObjectSchema as PostWhereUniqueInputObjectSchema } from './PostWhereUniqueInput.schema';
import { PostUpdateWithWhereUniqueWithoutRestaurantInputObjectSchema as PostUpdateWithWhereUniqueWithoutRestaurantInputObjectSchema } from './PostUpdateWithWhereUniqueWithoutRestaurantInput.schema';
import { PostUpdateManyWithWhereWithoutRestaurantInputObjectSchema as PostUpdateManyWithWhereWithoutRestaurantInputObjectSchema } from './PostUpdateManyWithWhereWithoutRestaurantInput.schema';
import { PostScalarWhereInputObjectSchema as PostScalarWhereInputObjectSchema } from './PostScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PostCreateWithoutRestaurantInputObjectSchema), z.lazy(() => PostCreateWithoutRestaurantInputObjectSchema).array(), z.lazy(() => PostUncheckedCreateWithoutRestaurantInputObjectSchema), z.lazy(() => PostUncheckedCreateWithoutRestaurantInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PostCreateOrConnectWithoutRestaurantInputObjectSchema), z.lazy(() => PostCreateOrConnectWithoutRestaurantInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => PostUpsertWithWhereUniqueWithoutRestaurantInputObjectSchema), z.lazy(() => PostUpsertWithWhereUniqueWithoutRestaurantInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => PostCreateManyRestaurantInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => PostWhereUniqueInputObjectSchema), z.lazy(() => PostWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => PostWhereUniqueInputObjectSchema), z.lazy(() => PostWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => PostWhereUniqueInputObjectSchema), z.lazy(() => PostWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => PostWhereUniqueInputObjectSchema), z.lazy(() => PostWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => PostUpdateWithWhereUniqueWithoutRestaurantInputObjectSchema), z.lazy(() => PostUpdateWithWhereUniqueWithoutRestaurantInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => PostUpdateManyWithWhereWithoutRestaurantInputObjectSchema), z.lazy(() => PostUpdateManyWithWhereWithoutRestaurantInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => PostScalarWhereInputObjectSchema), z.lazy(() => PostScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const PostUpdateManyWithoutRestaurantNestedInputObjectSchema: z.ZodType<Prisma.PostUpdateManyWithoutRestaurantNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.PostUpdateManyWithoutRestaurantNestedInput>;
export const PostUpdateManyWithoutRestaurantNestedInputObjectZodSchema = makeSchema();
