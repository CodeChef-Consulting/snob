import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PostWhereInputObjectSchema as PostWhereInputObjectSchema } from './PostWhereInput.schema';
import { PostUpdateWithoutRestaurantExtractionInputObjectSchema as PostUpdateWithoutRestaurantExtractionInputObjectSchema } from './PostUpdateWithoutRestaurantExtractionInput.schema';
import { PostUncheckedUpdateWithoutRestaurantExtractionInputObjectSchema as PostUncheckedUpdateWithoutRestaurantExtractionInputObjectSchema } from './PostUncheckedUpdateWithoutRestaurantExtractionInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PostWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => PostUpdateWithoutRestaurantExtractionInputObjectSchema), z.lazy(() => PostUncheckedUpdateWithoutRestaurantExtractionInputObjectSchema)])
}).strict();
export const PostUpdateToOneWithWhereWithoutRestaurantExtractionInputObjectSchema: z.ZodType<Prisma.PostUpdateToOneWithWhereWithoutRestaurantExtractionInput> = makeSchema() as unknown as z.ZodType<Prisma.PostUpdateToOneWithWhereWithoutRestaurantExtractionInput>;
export const PostUpdateToOneWithWhereWithoutRestaurantExtractionInputObjectZodSchema = makeSchema();
