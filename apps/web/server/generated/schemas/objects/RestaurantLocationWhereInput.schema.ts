import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { FloatNullableFilterObjectSchema as FloatNullableFilterObjectSchema } from './FloatNullableFilter.schema';
import { StringNullableListFilterObjectSchema as StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { RestaurantGroupScalarRelationFilterObjectSchema as RestaurantGroupScalarRelationFilterObjectSchema } from './RestaurantGroupScalarRelationFilter.schema';
import { RestaurantGroupWhereInputObjectSchema as RestaurantGroupWhereInputObjectSchema } from './RestaurantGroupWhereInput.schema'

const restaurantlocationwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => RestaurantLocationWhereInputObjectSchema), z.lazy(() => RestaurantLocationWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => RestaurantLocationWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => RestaurantLocationWhereInputObjectSchema), z.lazy(() => RestaurantLocationWhereInputObjectSchema).array()]).optional(),
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
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  groupId: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  group: z.union([z.lazy(() => RestaurantGroupScalarRelationFilterObjectSchema), z.lazy(() => RestaurantGroupWhereInputObjectSchema)]).optional()
}).strict();
export const RestaurantLocationWhereInputObjectSchema: z.ZodType<Prisma.RestaurantLocationWhereInput> = restaurantlocationwhereinputSchema as unknown as z.ZodType<Prisma.RestaurantLocationWhereInput>;
export const RestaurantLocationWhereInputObjectZodSchema = restaurantlocationwhereinputSchema;
