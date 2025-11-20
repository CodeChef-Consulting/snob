import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantLocationCreateNestedManyWithoutGroupInputObjectSchema as RestaurantLocationCreateNestedManyWithoutGroupInputObjectSchema } from './RestaurantLocationCreateNestedManyWithoutGroupInput.schema';
import { PostCreateNestedManyWithoutRestaurantGroupsMentionedInputObjectSchema as PostCreateNestedManyWithoutRestaurantGroupsMentionedInputObjectSchema } from './PostCreateNestedManyWithoutRestaurantGroupsMentionedInput.schema';
import { CommentCreateNestedManyWithoutRestaurantGroupsMentionedInputObjectSchema as CommentCreateNestedManyWithoutRestaurantGroupsMentionedInputObjectSchema } from './CommentCreateNestedManyWithoutRestaurantGroupsMentionedInput.schema'

const makeSchema = () => z.object({
  name: z.string(),
  rawScore: z.number().optional().nullable(),
  normalizedScore: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  locations: z.lazy(() => RestaurantLocationCreateNestedManyWithoutGroupInputObjectSchema),
  posts: z.lazy(() => PostCreateNestedManyWithoutRestaurantGroupsMentionedInputObjectSchema),
  comments: z.lazy(() => CommentCreateNestedManyWithoutRestaurantGroupsMentionedInputObjectSchema)
}).strict();
export const RestaurantGroupCreateInputObjectSchema: z.ZodType<Prisma.RestaurantGroupCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantGroupCreateInput>;
export const RestaurantGroupCreateInputObjectZodSchema = makeSchema();
