import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantLocationUncheckedCreateNestedManyWithoutGroupInputObjectSchema as RestaurantLocationUncheckedCreateNestedManyWithoutGroupInputObjectSchema } from './RestaurantLocationUncheckedCreateNestedManyWithoutGroupInput.schema';
import { PostUncheckedCreateNestedManyWithoutRestaurantGroupsMentionedInputObjectSchema as PostUncheckedCreateNestedManyWithoutRestaurantGroupsMentionedInputObjectSchema } from './PostUncheckedCreateNestedManyWithoutRestaurantGroupsMentionedInput.schema'

const makeSchema = () => z.object({
  id: z.number().int().optional(),
  name: z.string(),
  rawScore: z.number().optional().nullable(),
  normalizedScore: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  locations: z.lazy(() => RestaurantLocationUncheckedCreateNestedManyWithoutGroupInputObjectSchema).optional(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutRestaurantGroupsMentionedInputObjectSchema).optional()
}).strict();
export const RestaurantGroupUncheckedCreateWithoutCommentsInputObjectSchema: z.ZodType<Prisma.RestaurantGroupUncheckedCreateWithoutCommentsInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantGroupUncheckedCreateWithoutCommentsInput>;
export const RestaurantGroupUncheckedCreateWithoutCommentsInputObjectZodSchema = makeSchema();
