import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { FloatNullableFilterObjectSchema as FloatNullableFilterObjectSchema } from './FloatNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const restaurantgroupscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => RestaurantGroupScalarWhereInputObjectSchema), z.lazy(() => RestaurantGroupScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => RestaurantGroupScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => RestaurantGroupScalarWhereInputObjectSchema), z.lazy(() => RestaurantGroupScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  rawScore: z.union([z.lazy(() => FloatNullableFilterObjectSchema), z.number()]).optional().nullable(),
  normalizedScore: z.union([z.lazy(() => FloatNullableFilterObjectSchema), z.number()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const RestaurantGroupScalarWhereInputObjectSchema: z.ZodType<Prisma.RestaurantGroupScalarWhereInput> = restaurantgroupscalarwhereinputSchema as unknown as z.ZodType<Prisma.RestaurantGroupScalarWhereInput>;
export const RestaurantGroupScalarWhereInputObjectZodSchema = restaurantgroupscalarwhereinputSchema;
