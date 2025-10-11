import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { PostUncheckedCreateNestedManyWithoutRestaurantsMentionedInputObjectSchema as PostUncheckedCreateNestedManyWithoutRestaurantsMentionedInputObjectSchema } from './PostUncheckedCreateNestedManyWithoutRestaurantsMentionedInput.schema';
import { CommentUncheckedCreateNestedManyWithoutRestaurantsMentionedInputObjectSchema as CommentUncheckedCreateNestedManyWithoutRestaurantsMentionedInputObjectSchema } from './CommentUncheckedCreateNestedManyWithoutRestaurantsMentionedInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.number().int().optional(),
  name: z.string(),
  address: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  zipCode: z.string().optional().nullable(),
  source: z.string().optional(),
  googlePlaceId: z.string().optional().nullable(),
  metadata: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.coerce.date().optional(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutRestaurantsMentionedInputObjectSchema),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutRestaurantsMentionedInputObjectSchema)
}).strict();
export const RestaurantUncheckedCreateInputObjectSchema: z.ZodType<Prisma.RestaurantUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantUncheckedCreateInput>;
export const RestaurantUncheckedCreateInputObjectZodSchema = makeSchema();
