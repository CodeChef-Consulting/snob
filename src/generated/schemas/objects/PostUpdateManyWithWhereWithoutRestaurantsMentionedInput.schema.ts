import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PostScalarWhereInputObjectSchema as PostScalarWhereInputObjectSchema } from './PostScalarWhereInput.schema';
import { PostUpdateManyMutationInputObjectSchema as PostUpdateManyMutationInputObjectSchema } from './PostUpdateManyMutationInput.schema';
import { PostUncheckedUpdateManyWithoutRestaurantsMentionedInputObjectSchema as PostUncheckedUpdateManyWithoutRestaurantsMentionedInputObjectSchema } from './PostUncheckedUpdateManyWithoutRestaurantsMentionedInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PostScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => PostUpdateManyMutationInputObjectSchema), z.lazy(() => PostUncheckedUpdateManyWithoutRestaurantsMentionedInputObjectSchema)])
}).strict();
export const PostUpdateManyWithWhereWithoutRestaurantsMentionedInputObjectSchema: z.ZodType<Prisma.PostUpdateManyWithWhereWithoutRestaurantsMentionedInput> = makeSchema() as unknown as z.ZodType<Prisma.PostUpdateManyWithWhereWithoutRestaurantsMentionedInput>;
export const PostUpdateManyWithWhereWithoutRestaurantsMentionedInputObjectZodSchema = makeSchema();
