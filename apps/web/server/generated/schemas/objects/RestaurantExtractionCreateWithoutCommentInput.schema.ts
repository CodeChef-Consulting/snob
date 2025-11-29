import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantExtractionCreaterestaurantsMentionedInputObjectSchema as RestaurantExtractionCreaterestaurantsMentionedInputObjectSchema } from './RestaurantExtractionCreaterestaurantsMentionedInput.schema';
import { RestaurantExtractionCreatedishesMentionedInputObjectSchema as RestaurantExtractionCreatedishesMentionedInputObjectSchema } from './RestaurantExtractionCreatedishesMentionedInput.schema';
import { PostCreateNestedOneWithoutRestaurantExtractionInputObjectSchema as PostCreateNestedOneWithoutRestaurantExtractionInputObjectSchema } from './PostCreateNestedOneWithoutRestaurantExtractionInput.schema'

const makeSchema = () => z.object({
  restaurantsMentioned: z.union([z.lazy(() => RestaurantExtractionCreaterestaurantsMentionedInputObjectSchema), z.string().array()]).optional(),
  primaryRestaurant: z.string().optional().nullable(),
  dishesMentioned: z.union([z.lazy(() => RestaurantExtractionCreatedishesMentionedInputObjectSchema), z.string().array()]).optional(),
  isSubjective: z.boolean(),
  attemptedLinkToRestaurantsMentioned: z.boolean().optional(),
  extractedAt: z.coerce.date().optional(),
  model: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  post: z.lazy(() => PostCreateNestedOneWithoutRestaurantExtractionInputObjectSchema).optional()
}).strict();
export const RestaurantExtractionCreateWithoutCommentInputObjectSchema: z.ZodType<Prisma.RestaurantExtractionCreateWithoutCommentInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantExtractionCreateWithoutCommentInput>;
export const RestaurantExtractionCreateWithoutCommentInputObjectZodSchema = makeSchema();
