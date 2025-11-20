import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IntWithAggregatesFilterObjectSchema as IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { FloatNullableWithAggregatesFilterObjectSchema as FloatNullableWithAggregatesFilterObjectSchema } from './FloatNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const restaurantgroupscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => RestaurantGroupScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => RestaurantGroupScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => RestaurantGroupScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => RestaurantGroupScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => RestaurantGroupScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  name: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  rawScore: z.union([z.lazy(() => FloatNullableWithAggregatesFilterObjectSchema), z.number()]).optional().nullable(),
  normalizedScore: z.union([z.lazy(() => FloatNullableWithAggregatesFilterObjectSchema), z.number()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const RestaurantGroupScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.RestaurantGroupScalarWhereWithAggregatesInput> = restaurantgroupscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.RestaurantGroupScalarWhereWithAggregatesInput>;
export const RestaurantGroupScalarWhereWithAggregatesInputObjectZodSchema = restaurantgroupscalarwherewithaggregatesinputSchema;
