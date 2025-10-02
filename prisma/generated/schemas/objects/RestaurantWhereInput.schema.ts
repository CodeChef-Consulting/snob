import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { PostListRelationFilterObjectSchema } from './PostListRelationFilter.schema'

const restaurantwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => RestaurantWhereInputObjectSchema), z.lazy(() => RestaurantWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => RestaurantWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => RestaurantWhereInputObjectSchema), z.lazy(() => RestaurantWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  address: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  city: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  state: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  zipCode: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  phone: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  website: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  cuisine: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  priceRange: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  metadata: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  posts: z.lazy(() => PostListRelationFilterObjectSchema).optional()
}).strict();
export const RestaurantWhereInputObjectSchema: z.ZodType<Prisma.RestaurantWhereInput> = restaurantwhereinputSchema as unknown as z.ZodType<Prisma.RestaurantWhereInput>;
export const RestaurantWhereInputObjectZodSchema = restaurantwhereinputSchema;
