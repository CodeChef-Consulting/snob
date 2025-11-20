import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantExtractionCreaterestaurantsMentionedInputObjectSchema as RestaurantExtractionCreaterestaurantsMentionedInputObjectSchema } from './RestaurantExtractionCreaterestaurantsMentionedInput.schema';
import { RestaurantExtractionCreatedishesMentionedInputObjectSchema as RestaurantExtractionCreatedishesMentionedInputObjectSchema } from './RestaurantExtractionCreatedishesMentionedInput.schema'

const makeSchema = () => z.object({
  id: z.number().int().optional(),
  postId: z.number().int().optional().nullable(),
  commentId: z.number().int().optional().nullable(),
  restaurantsMentioned: z.union([z.lazy(() => RestaurantExtractionCreaterestaurantsMentionedInputObjectSchema), z.string().array()]).optional(),
  primaryRestaurant: z.string().optional().nullable(),
  dishesMentioned: z.union([z.lazy(() => RestaurantExtractionCreatedishesMentionedInputObjectSchema), z.string().array()]).optional(),
  isSubjective: z.boolean(),
  attemptedLinkToRestaurantsMentioned: z.boolean().optional(),
  extractedAt: z.coerce.date().optional(),
  model: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();
export const RestaurantExtractionUncheckedCreateInputObjectSchema: z.ZodType<Prisma.RestaurantExtractionUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantExtractionUncheckedCreateInput>;
export const RestaurantExtractionUncheckedCreateInputObjectZodSchema = makeSchema();
