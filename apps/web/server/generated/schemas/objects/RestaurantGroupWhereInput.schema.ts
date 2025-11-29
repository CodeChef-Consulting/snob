import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { FloatNullableFilterObjectSchema as FloatNullableFilterObjectSchema } from './FloatNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { RestaurantLocationListRelationFilterObjectSchema as RestaurantLocationListRelationFilterObjectSchema } from './RestaurantLocationListRelationFilter.schema';
import { PostListRelationFilterObjectSchema as PostListRelationFilterObjectSchema } from './PostListRelationFilter.schema';
import { CommentListRelationFilterObjectSchema as CommentListRelationFilterObjectSchema } from './CommentListRelationFilter.schema'

const restaurantgroupwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => RestaurantGroupWhereInputObjectSchema), z.lazy(() => RestaurantGroupWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => RestaurantGroupWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => RestaurantGroupWhereInputObjectSchema), z.lazy(() => RestaurantGroupWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  rawScore: z.union([z.lazy(() => FloatNullableFilterObjectSchema), z.number()]).optional().nullable(),
  normalizedScore: z.union([z.lazy(() => FloatNullableFilterObjectSchema), z.number()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  locations: z.lazy(() => RestaurantLocationListRelationFilterObjectSchema).optional(),
  posts: z.lazy(() => PostListRelationFilterObjectSchema).optional(),
  comments: z.lazy(() => CommentListRelationFilterObjectSchema).optional()
}).strict();
export const RestaurantGroupWhereInputObjectSchema: z.ZodType<Prisma.RestaurantGroupWhereInput> = restaurantgroupwhereinputSchema as unknown as z.ZodType<Prisma.RestaurantGroupWhereInput>;
export const RestaurantGroupWhereInputObjectZodSchema = restaurantgroupwhereinputSchema;
