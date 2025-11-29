import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PostUncheckedCreateNestedManyWithoutRestaurantGroupsMentionedInputObjectSchema as PostUncheckedCreateNestedManyWithoutRestaurantGroupsMentionedInputObjectSchema } from './PostUncheckedCreateNestedManyWithoutRestaurantGroupsMentionedInput.schema';
import { CommentUncheckedCreateNestedManyWithoutRestaurantGroupsMentionedInputObjectSchema as CommentUncheckedCreateNestedManyWithoutRestaurantGroupsMentionedInputObjectSchema } from './CommentUncheckedCreateNestedManyWithoutRestaurantGroupsMentionedInput.schema'

const makeSchema = () => z.object({
  id: z.number().int().optional(),
  name: z.string(),
  rawScore: z.number().optional().nullable(),
  normalizedScore: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutRestaurantGroupsMentionedInputObjectSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutRestaurantGroupsMentionedInputObjectSchema).optional()
}).strict();
export const RestaurantGroupUncheckedCreateWithoutLocationsInputObjectSchema: z.ZodType<Prisma.RestaurantGroupUncheckedCreateWithoutLocationsInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantGroupUncheckedCreateWithoutLocationsInput>;
export const RestaurantGroupUncheckedCreateWithoutLocationsInputObjectZodSchema = makeSchema();
