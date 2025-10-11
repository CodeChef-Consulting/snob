import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
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
  updatedAt: z.coerce.date().optional(),
  comments: z.lazy(() => CommentUncheckedCreateNestedManyWithoutRestaurantsMentionedInputObjectSchema).optional()
}).strict();
export const RestaurantUncheckedCreateWithoutPostsInputObjectSchema: z.ZodType<Prisma.RestaurantUncheckedCreateWithoutPostsInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantUncheckedCreateWithoutPostsInput>;
export const RestaurantUncheckedCreateWithoutPostsInputObjectZodSchema = makeSchema();
