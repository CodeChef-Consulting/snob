import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantLocationUncheckedCreateNestedManyWithoutGroupInputObjectSchema as RestaurantLocationUncheckedCreateNestedManyWithoutGroupInputObjectSchema } from './RestaurantLocationUncheckedCreateNestedManyWithoutGroupInput.schema';
import { PostUncheckedCreateNestedManyWithoutRestaurantGroupsMentionedInputObjectSchema as PostUncheckedCreateNestedManyWithoutRestaurantGroupsMentionedInputObjectSchema } from './PostUncheckedCreateNestedManyWithoutRestaurantGroupsMentionedInput.schema';
import { CommentUncheckedCreateNestedManyWithoutRestaurantGroupsMentionedInputObjectSchema as CommentUncheckedCreateNestedManyWithoutRestaurantGroupsMentionedInputObjectSchema } from './CommentUncheckedCreateNestedManyWithoutRestaurantGroupsMentionedInput.schema'

const makeSchema = () => z.object({
  id: z.number().int().optional(),
  name: z.string(),
  rawScore: z.number().optional().nullable(),
  normalizedScore: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  locations: z.lazy(() => RestaurantLocationUncheckedCreateNestedManyWithoutGroupInputObjectSchema),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutRestaurantGroupsMentionedInputObjectSchema),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutRestaurantGroupsMentionedInputObjectSchema)
}).strict();
export const RestaurantGroupUncheckedCreateInputObjectSchema: z.ZodType<Prisma.RestaurantGroupUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantGroupUncheckedCreateInput>;
export const RestaurantGroupUncheckedCreateInputObjectZodSchema = makeSchema();
