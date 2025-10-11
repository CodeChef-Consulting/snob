import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.number().int().optional(),
  postId: z.number().int().optional().nullable(),
  commentId: z.number().int().optional().nullable(),
  restaurantsMentioned: z.string(),
  primaryRestaurant: z.string(),
  dishesMentioned: z.string(),
  isSubjective: z.boolean(),
  attemptedLinkToRestaurantsMentioned: z.boolean().optional(),
  extractedAt: z.coerce.date().optional(),
  model: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();
export const RestaurantExtractionUncheckedCreateInputObjectSchema: z.ZodType<Prisma.RestaurantExtractionUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantExtractionUncheckedCreateInput>;
export const RestaurantExtractionUncheckedCreateInputObjectZodSchema = makeSchema();
