import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PostCreateNestedOneWithoutRestaurantExtractionInputObjectSchema as PostCreateNestedOneWithoutRestaurantExtractionInputObjectSchema } from './PostCreateNestedOneWithoutRestaurantExtractionInput.schema'

const makeSchema = () => z.object({
  restaurantsMentioned: z.string(),
  primaryRestaurant: z.string(),
  dishesMentioned: z.string(),
  isSubjective: z.boolean(),
  extractedAt: z.coerce.date().optional(),
  model: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  post: z.lazy(() => PostCreateNestedOneWithoutRestaurantExtractionInputObjectSchema).optional()
}).strict();
export const RestaurantExtractionCreateWithoutCommentInputObjectSchema: z.ZodType<Prisma.RestaurantExtractionCreateWithoutCommentInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantExtractionCreateWithoutCommentInput>;
export const RestaurantExtractionCreateWithoutCommentInputObjectZodSchema = makeSchema();
