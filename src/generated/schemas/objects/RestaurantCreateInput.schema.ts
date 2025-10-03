import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { PostCreateNestedManyWithoutRestaurantInputObjectSchema as PostCreateNestedManyWithoutRestaurantInputObjectSchema } from './PostCreateNestedManyWithoutRestaurantInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  name: z.string(),
  address: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  zipCode: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  cuisine: z.string().optional().nullable(),
  priceRange: z.string().optional().nullable(),
  metadata: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.coerce.date().optional(),
  posts: z.lazy(() => PostCreateNestedManyWithoutRestaurantInputObjectSchema)
}).strict();
export const RestaurantCreateInputObjectSchema: z.ZodType<Prisma.RestaurantCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantCreateInput>;
export const RestaurantCreateInputObjectZodSchema = makeSchema();
