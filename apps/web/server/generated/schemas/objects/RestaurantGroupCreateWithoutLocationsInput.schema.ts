import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PostCreateNestedManyWithoutRestaurantGroupsMentionedInputObjectSchema as PostCreateNestedManyWithoutRestaurantGroupsMentionedInputObjectSchema } from './PostCreateNestedManyWithoutRestaurantGroupsMentionedInput.schema';
import { CommentCreateNestedManyWithoutRestaurantGroupsMentionedInputObjectSchema as CommentCreateNestedManyWithoutRestaurantGroupsMentionedInputObjectSchema } from './CommentCreateNestedManyWithoutRestaurantGroupsMentionedInput.schema'

const makeSchema = () => z.object({
  name: z.string(),
  rawScore: z.number().optional().nullable(),
  normalizedScore: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  posts: z.lazy(() => PostCreateNestedManyWithoutRestaurantGroupsMentionedInputObjectSchema).optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutRestaurantGroupsMentionedInputObjectSchema).optional()
}).strict();
export const RestaurantGroupCreateWithoutLocationsInputObjectSchema: z.ZodType<Prisma.RestaurantGroupCreateWithoutLocationsInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantGroupCreateWithoutLocationsInput>;
export const RestaurantGroupCreateWithoutLocationsInputObjectZodSchema = makeSchema();
