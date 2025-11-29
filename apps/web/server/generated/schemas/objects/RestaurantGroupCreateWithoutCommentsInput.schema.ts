import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantLocationCreateNestedManyWithoutGroupInputObjectSchema as RestaurantLocationCreateNestedManyWithoutGroupInputObjectSchema } from './RestaurantLocationCreateNestedManyWithoutGroupInput.schema';
import { PostCreateNestedManyWithoutRestaurantGroupsMentionedInputObjectSchema as PostCreateNestedManyWithoutRestaurantGroupsMentionedInputObjectSchema } from './PostCreateNestedManyWithoutRestaurantGroupsMentionedInput.schema'

const makeSchema = () => z.object({
  name: z.string(),
  rawScore: z.number().optional().nullable(),
  normalizedScore: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  locations: z.lazy(() => RestaurantLocationCreateNestedManyWithoutGroupInputObjectSchema).optional(),
  posts: z.lazy(() => PostCreateNestedManyWithoutRestaurantGroupsMentionedInputObjectSchema).optional()
}).strict();
export const RestaurantGroupCreateWithoutCommentsInputObjectSchema: z.ZodType<Prisma.RestaurantGroupCreateWithoutCommentsInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantGroupCreateWithoutCommentsInput>;
export const RestaurantGroupCreateWithoutCommentsInputObjectZodSchema = makeSchema();
