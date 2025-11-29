import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { FloatNullableFilterObjectSchema as FloatNullableFilterObjectSchema } from './FloatNullableFilter.schema';
import { StringNullableListFilterObjectSchema as StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { PostListRelationFilterObjectSchema as PostListRelationFilterObjectSchema } from './PostListRelationFilter.schema';
import { CommentListRelationFilterObjectSchema as CommentListRelationFilterObjectSchema } from './CommentListRelationFilter.schema'

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
  latitude: z.union([z.lazy(() => FloatNullableFilterObjectSchema), z.number()]).optional().nullable(),
  longitude: z.union([z.lazy(() => FloatNullableFilterObjectSchema), z.number()]).optional().nullable(),
  source: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  googlePlaceId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  lookupAliases: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
  metadata: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  rawScore: z.union([z.lazy(() => FloatNullableFilterObjectSchema), z.number()]).optional().nullable(),
  normalizedScore: z.union([z.lazy(() => FloatNullableFilterObjectSchema), z.number()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  posts: z.lazy(() => PostListRelationFilterObjectSchema).optional(),
  comments: z.lazy(() => CommentListRelationFilterObjectSchema).optional()
}).strict();
export const RestaurantWhereInputObjectSchema: z.ZodType<Prisma.RestaurantWhereInput> = restaurantwhereinputSchema as unknown as z.ZodType<Prisma.RestaurantWhereInput>;
export const RestaurantWhereInputObjectZodSchema = restaurantwhereinputSchema;
