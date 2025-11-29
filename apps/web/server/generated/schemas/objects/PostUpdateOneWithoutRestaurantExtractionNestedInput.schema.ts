import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PostCreateWithoutRestaurantExtractionInputObjectSchema as PostCreateWithoutRestaurantExtractionInputObjectSchema } from './PostCreateWithoutRestaurantExtractionInput.schema';
import { PostUncheckedCreateWithoutRestaurantExtractionInputObjectSchema as PostUncheckedCreateWithoutRestaurantExtractionInputObjectSchema } from './PostUncheckedCreateWithoutRestaurantExtractionInput.schema';
import { PostCreateOrConnectWithoutRestaurantExtractionInputObjectSchema as PostCreateOrConnectWithoutRestaurantExtractionInputObjectSchema } from './PostCreateOrConnectWithoutRestaurantExtractionInput.schema';
import { PostUpsertWithoutRestaurantExtractionInputObjectSchema as PostUpsertWithoutRestaurantExtractionInputObjectSchema } from './PostUpsertWithoutRestaurantExtractionInput.schema';
import { PostWhereInputObjectSchema as PostWhereInputObjectSchema } from './PostWhereInput.schema';
import { PostWhereUniqueInputObjectSchema as PostWhereUniqueInputObjectSchema } from './PostWhereUniqueInput.schema';
import { PostUpdateToOneWithWhereWithoutRestaurantExtractionInputObjectSchema as PostUpdateToOneWithWhereWithoutRestaurantExtractionInputObjectSchema } from './PostUpdateToOneWithWhereWithoutRestaurantExtractionInput.schema';
import { PostUpdateWithoutRestaurantExtractionInputObjectSchema as PostUpdateWithoutRestaurantExtractionInputObjectSchema } from './PostUpdateWithoutRestaurantExtractionInput.schema';
import { PostUncheckedUpdateWithoutRestaurantExtractionInputObjectSchema as PostUncheckedUpdateWithoutRestaurantExtractionInputObjectSchema } from './PostUncheckedUpdateWithoutRestaurantExtractionInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PostCreateWithoutRestaurantExtractionInputObjectSchema), z.lazy(() => PostUncheckedCreateWithoutRestaurantExtractionInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => PostCreateOrConnectWithoutRestaurantExtractionInputObjectSchema).optional(),
  upsert: z.lazy(() => PostUpsertWithoutRestaurantExtractionInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => PostWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => PostWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => PostWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => PostUpdateToOneWithWhereWithoutRestaurantExtractionInputObjectSchema), z.lazy(() => PostUpdateWithoutRestaurantExtractionInputObjectSchema), z.lazy(() => PostUncheckedUpdateWithoutRestaurantExtractionInputObjectSchema)]).optional()
}).strict();
export const PostUpdateOneWithoutRestaurantExtractionNestedInputObjectSchema: z.ZodType<Prisma.PostUpdateOneWithoutRestaurantExtractionNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.PostUpdateOneWithoutRestaurantExtractionNestedInput>;
export const PostUpdateOneWithoutRestaurantExtractionNestedInputObjectZodSchema = makeSchema();
