import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.number().int().optional(),
  postId: z.number().int().optional().nullable(),
  commentId: z.number().int().optional().nullable(),
  restaurantsMentioned: z.string().optional().nullable(),
  primaryRestaurant: z.string().optional().nullable(),
  dishesMentioned: z.string().optional().nullable(),
  isSubjective: z.boolean(),
  attemptedLinkToRestaurantsMentioned: z.boolean().optional(),
  extractedAt: z.coerce.date().optional(),
  model: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const RestaurantExtractionCreateManyInputObjectSchema: z.ZodType<Prisma.RestaurantExtractionCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantExtractionCreateManyInput>;
export const RestaurantExtractionCreateManyInputObjectZodSchema = makeSchema();
