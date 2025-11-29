import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantLocationCreateNestedManyWithoutGroupInputObjectSchema as RestaurantLocationCreateNestedManyWithoutGroupInputObjectSchema } from './RestaurantLocationCreateNestedManyWithoutGroupInput.schema';
import { CommentCreateNestedManyWithoutRestaurantGroupsMentionedInputObjectSchema as CommentCreateNestedManyWithoutRestaurantGroupsMentionedInputObjectSchema } from './CommentCreateNestedManyWithoutRestaurantGroupsMentionedInput.schema'

const makeSchema = () => z.object({
  name: z.string(),
  rawScore: z.number().optional().nullable(),
  normalizedScore: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  locations: z.lazy(() => RestaurantLocationCreateNestedManyWithoutGroupInputObjectSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutRestaurantGroupsMentionedInputObjectSchema).optional()
}).strict();
export const RestaurantGroupCreateWithoutPostsInputObjectSchema: z.ZodType<Prisma.RestaurantGroupCreateWithoutPostsInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantGroupCreateWithoutPostsInput>;
export const RestaurantGroupCreateWithoutPostsInputObjectZodSchema = makeSchema();
