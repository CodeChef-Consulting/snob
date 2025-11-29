import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PostScalarWhereInputObjectSchema as PostScalarWhereInputObjectSchema } from './PostScalarWhereInput.schema';
import { PostUpdateManyMutationInputObjectSchema as PostUpdateManyMutationInputObjectSchema } from './PostUpdateManyMutationInput.schema';
import { PostUncheckedUpdateManyWithoutRestaurantGroupsMentionedInputObjectSchema as PostUncheckedUpdateManyWithoutRestaurantGroupsMentionedInputObjectSchema } from './PostUncheckedUpdateManyWithoutRestaurantGroupsMentionedInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PostScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => PostUpdateManyMutationInputObjectSchema), z.lazy(() => PostUncheckedUpdateManyWithoutRestaurantGroupsMentionedInputObjectSchema)])
}).strict();
export const PostUpdateManyWithWhereWithoutRestaurantGroupsMentionedInputObjectSchema: z.ZodType<Prisma.PostUpdateManyWithWhereWithoutRestaurantGroupsMentionedInput> = makeSchema() as unknown as z.ZodType<Prisma.PostUpdateManyWithWhereWithoutRestaurantGroupsMentionedInput>;
export const PostUpdateManyWithWhereWithoutRestaurantGroupsMentionedInputObjectZodSchema = makeSchema();
