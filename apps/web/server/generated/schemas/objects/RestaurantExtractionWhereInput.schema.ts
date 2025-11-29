import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { IntNullableFilterObjectSchema as IntNullableFilterObjectSchema } from './IntNullableFilter.schema';
import { StringNullableListFilterObjectSchema as StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { PostNullableScalarRelationFilterObjectSchema as PostNullableScalarRelationFilterObjectSchema } from './PostNullableScalarRelationFilter.schema';
import { PostWhereInputObjectSchema as PostWhereInputObjectSchema } from './PostWhereInput.schema';
import { CommentNullableScalarRelationFilterObjectSchema as CommentNullableScalarRelationFilterObjectSchema } from './CommentNullableScalarRelationFilter.schema';
import { CommentWhereInputObjectSchema as CommentWhereInputObjectSchema } from './CommentWhereInput.schema'

const restaurantextractionwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => RestaurantExtractionWhereInputObjectSchema), z.lazy(() => RestaurantExtractionWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => RestaurantExtractionWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => RestaurantExtractionWhereInputObjectSchema), z.lazy(() => RestaurantExtractionWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  postId: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  commentId: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  restaurantsMentioned: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
  primaryRestaurant: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  dishesMentioned: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
  isSubjective: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  attemptedLinkToRestaurantsMentioned: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  extractedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  model: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  post: z.union([z.lazy(() => PostNullableScalarRelationFilterObjectSchema), z.lazy(() => PostWhereInputObjectSchema)]).optional(),
  comment: z.union([z.lazy(() => CommentNullableScalarRelationFilterObjectSchema), z.lazy(() => CommentWhereInputObjectSchema)]).optional()
}).strict();
export const RestaurantExtractionWhereInputObjectSchema: z.ZodType<Prisma.RestaurantExtractionWhereInput> = restaurantextractionwhereinputSchema as unknown as z.ZodType<Prisma.RestaurantExtractionWhereInput>;
export const RestaurantExtractionWhereInputObjectZodSchema = restaurantextractionwhereinputSchema;
