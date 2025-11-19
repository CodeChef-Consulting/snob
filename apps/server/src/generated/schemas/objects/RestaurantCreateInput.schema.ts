import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { PostCreateNestedManyWithoutRestaurantsMentionedInputObjectSchema as PostCreateNestedManyWithoutRestaurantsMentionedInputObjectSchema } from './PostCreateNestedManyWithoutRestaurantsMentionedInput.schema';
import { CommentCreateNestedManyWithoutRestaurantsMentionedInputObjectSchema as CommentCreateNestedManyWithoutRestaurantsMentionedInputObjectSchema } from './CommentCreateNestedManyWithoutRestaurantsMentionedInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  name: z.string(),
  address: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  zipCode: z.string().optional().nullable(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  source: z.string().optional(),
  googlePlaceId: z.string().optional().nullable(),
  lookupAliases: z.string().optional().nullable(),
  metadata: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  rawScore: z.number().optional().nullable(),
  normalizedScore: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  posts: z.lazy(() => PostCreateNestedManyWithoutRestaurantsMentionedInputObjectSchema),
  comments: z.lazy(() => CommentCreateNestedManyWithoutRestaurantsMentionedInputObjectSchema)
}).strict();
export const RestaurantCreateInputObjectSchema: z.ZodType<Prisma.RestaurantCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantCreateInput>;
export const RestaurantCreateInputObjectZodSchema = makeSchema();
