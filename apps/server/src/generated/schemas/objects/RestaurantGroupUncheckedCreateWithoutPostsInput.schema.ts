import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantLocationUncheckedCreateNestedManyWithoutGroupInputObjectSchema as RestaurantLocationUncheckedCreateNestedManyWithoutGroupInputObjectSchema } from './RestaurantLocationUncheckedCreateNestedManyWithoutGroupInput.schema';
import { CommentUncheckedCreateNestedManyWithoutRestaurantGroupsMentionedInputObjectSchema as CommentUncheckedCreateNestedManyWithoutRestaurantGroupsMentionedInputObjectSchema } from './CommentUncheckedCreateNestedManyWithoutRestaurantGroupsMentionedInput.schema'

const makeSchema = () => z.object({
  id: z.number().int().optional(),
  name: z.string(),
  rawScore: z.number().optional().nullable(),
  normalizedScore: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  locations: z.lazy(() => RestaurantLocationUncheckedCreateNestedManyWithoutGroupInputObjectSchema).optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutRestaurantGroupsMentionedInputObjectSchema).optional()
}).strict();
export const RestaurantGroupUncheckedCreateWithoutPostsInputObjectSchema: z.ZodType<Prisma.RestaurantGroupUncheckedCreateWithoutPostsInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantGroupUncheckedCreateWithoutPostsInput>;
export const RestaurantGroupUncheckedCreateWithoutPostsInputObjectZodSchema = makeSchema();
