import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantExtractionCreatedishesMentionedInputObjectSchema as RestaurantExtractionCreatedishesMentionedInputObjectSchema } from './RestaurantExtractionCreatedishesMentionedInput.schema';
import { PostCreateNestedOneWithoutRestaurantExtractionInputObjectSchema as PostCreateNestedOneWithoutRestaurantExtractionInputObjectSchema } from './PostCreateNestedOneWithoutRestaurantExtractionInput.schema';
import { CommentCreateNestedOneWithoutRestaurantExtractionInputObjectSchema as CommentCreateNestedOneWithoutRestaurantExtractionInputObjectSchema } from './CommentCreateNestedOneWithoutRestaurantExtractionInput.schema'

const makeSchema = () => z.object({
  restaurantsMentioned: z.string().optional().nullable(),
  primaryRestaurant: z.string().optional().nullable(),
  dishesMentioned: z.union([z.lazy(() => RestaurantExtractionCreatedishesMentionedInputObjectSchema), z.string().array()]).optional(),
  isSubjective: z.boolean(),
  attemptedLinkToRestaurantsMentioned: z.boolean().optional(),
  extractedAt: z.coerce.date().optional(),
  model: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  post: z.lazy(() => PostCreateNestedOneWithoutRestaurantExtractionInputObjectSchema).optional(),
  comment: z.lazy(() => CommentCreateNestedOneWithoutRestaurantExtractionInputObjectSchema).optional()
}).strict();
export const RestaurantExtractionCreateInputObjectSchema: z.ZodType<Prisma.RestaurantExtractionCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantExtractionCreateInput>;
export const RestaurantExtractionCreateInputObjectZodSchema = makeSchema();
