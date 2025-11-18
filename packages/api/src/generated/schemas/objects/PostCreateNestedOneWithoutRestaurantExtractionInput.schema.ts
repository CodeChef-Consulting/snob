import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PostCreateWithoutRestaurantExtractionInputObjectSchema as PostCreateWithoutRestaurantExtractionInputObjectSchema } from './PostCreateWithoutRestaurantExtractionInput.schema';
import { PostUncheckedCreateWithoutRestaurantExtractionInputObjectSchema as PostUncheckedCreateWithoutRestaurantExtractionInputObjectSchema } from './PostUncheckedCreateWithoutRestaurantExtractionInput.schema';
import { PostCreateOrConnectWithoutRestaurantExtractionInputObjectSchema as PostCreateOrConnectWithoutRestaurantExtractionInputObjectSchema } from './PostCreateOrConnectWithoutRestaurantExtractionInput.schema';
import { PostWhereUniqueInputObjectSchema as PostWhereUniqueInputObjectSchema } from './PostWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PostCreateWithoutRestaurantExtractionInputObjectSchema), z.lazy(() => PostUncheckedCreateWithoutRestaurantExtractionInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => PostCreateOrConnectWithoutRestaurantExtractionInputObjectSchema).optional(),
  connect: z.lazy(() => PostWhereUniqueInputObjectSchema).optional()
}).strict();
export const PostCreateNestedOneWithoutRestaurantExtractionInputObjectSchema: z.ZodType<Prisma.PostCreateNestedOneWithoutRestaurantExtractionInput> = makeSchema() as unknown as z.ZodType<Prisma.PostCreateNestedOneWithoutRestaurantExtractionInput>;
export const PostCreateNestedOneWithoutRestaurantExtractionInputObjectZodSchema = makeSchema();
