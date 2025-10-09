import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.number().int().optional(),
  postId: z.number().int().optional().nullable(),
  restaurantsMentioned: z.string(),
  primaryRestaurant: z.string(),
  dishesMentioned: z.string(),
  isSubjective: z.boolean(),
  extractedAt: z.coerce.date().optional(),
  model: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const RestaurantExtractionUncheckedCreateWithoutCommentInputObjectSchema: z.ZodType<Prisma.RestaurantExtractionUncheckedCreateWithoutCommentInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantExtractionUncheckedCreateWithoutCommentInput>;
export const RestaurantExtractionUncheckedCreateWithoutCommentInputObjectZodSchema = makeSchema();
