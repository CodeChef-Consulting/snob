import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantCreatelookupAliasesInputObjectSchema as RestaurantCreatelookupAliasesInputObjectSchema } from './RestaurantCreatelookupAliasesInput.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { PostUncheckedCreateNestedManyWithoutRestaurantsMentionedInputObjectSchema as PostUncheckedCreateNestedManyWithoutRestaurantsMentionedInputObjectSchema } from './PostUncheckedCreateNestedManyWithoutRestaurantsMentionedInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.number().int().optional(),
  name: z.string(),
  address: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  zipCode: z.string().optional().nullable(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  source: z.string().optional(),
  googlePlaceId: z.string().optional().nullable(),
  lookupAliases: z.union([z.lazy(() => RestaurantCreatelookupAliasesInputObjectSchema), z.string().array()]).optional(),
  metadata: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  rawScore: z.number().optional().nullable(),
  normalizedScore: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutRestaurantsMentionedInputObjectSchema).optional()
}).strict();
export const RestaurantUncheckedCreateWithoutCommentsInputObjectSchema: z.ZodType<Prisma.RestaurantUncheckedCreateWithoutCommentsInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantUncheckedCreateWithoutCommentsInput>;
export const RestaurantUncheckedCreateWithoutCommentsInputObjectZodSchema = makeSchema();
