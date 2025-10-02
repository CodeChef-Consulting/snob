import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PostScalarWhereInputObjectSchema } from './PostScalarWhereInput.schema';
import { PostUpdateManyMutationInputObjectSchema } from './PostUpdateManyMutationInput.schema';
import { PostUncheckedUpdateManyWithoutRestaurantInputObjectSchema } from './PostUncheckedUpdateManyWithoutRestaurantInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PostScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => PostUpdateManyMutationInputObjectSchema), z.lazy(() => PostUncheckedUpdateManyWithoutRestaurantInputObjectSchema)])
}).strict();
export const PostUpdateManyWithWhereWithoutRestaurantInputObjectSchema: z.ZodType<Prisma.PostUpdateManyWithWhereWithoutRestaurantInput> = makeSchema() as unknown as z.ZodType<Prisma.PostUpdateManyWithWhereWithoutRestaurantInput>;
export const PostUpdateManyWithWhereWithoutRestaurantInputObjectZodSchema = makeSchema();
