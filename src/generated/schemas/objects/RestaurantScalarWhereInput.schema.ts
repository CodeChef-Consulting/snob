import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { FloatNullableFilterObjectSchema as FloatNullableFilterObjectSchema } from './FloatNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const restaurantscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => RestaurantScalarWhereInputObjectSchema), z.lazy(() => RestaurantScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => RestaurantScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => RestaurantScalarWhereInputObjectSchema), z.lazy(() => RestaurantScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  address: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  city: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  state: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  zipCode: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  source: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  googlePlaceId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  lookupAliases: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  metadata: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  rawScore: z.union([z.lazy(() => FloatNullableFilterObjectSchema), z.number()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const RestaurantScalarWhereInputObjectSchema: z.ZodType<Prisma.RestaurantScalarWhereInput> = restaurantscalarwhereinputSchema as unknown as z.ZodType<Prisma.RestaurantScalarWhereInput>;
export const RestaurantScalarWhereInputObjectZodSchema = restaurantscalarwhereinputSchema;
