import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { CommentCreateNestedManyWithoutRestaurantsMentionedInputObjectSchema as CommentCreateNestedManyWithoutRestaurantsMentionedInputObjectSchema } from './CommentCreateNestedManyWithoutRestaurantsMentionedInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  name: z.string(),
  address: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  zipCode: z.string().optional().nullable(),
  source: z.string().optional(),
  googlePlaceId: z.string().optional().nullable(),
  lookupAliases: z.string().optional().nullable(),
  metadata: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  comments: z.lazy(() => CommentCreateNestedManyWithoutRestaurantsMentionedInputObjectSchema).optional()
}).strict();
export const RestaurantCreateWithoutPostsInputObjectSchema: z.ZodType<Prisma.RestaurantCreateWithoutPostsInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantCreateWithoutPostsInput>;
export const RestaurantCreateWithoutPostsInputObjectZodSchema = makeSchema();
