import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentCreateNestedOneWithoutRestaurantExtractionInputObjectSchema as CommentCreateNestedOneWithoutRestaurantExtractionInputObjectSchema } from './CommentCreateNestedOneWithoutRestaurantExtractionInput.schema'

const makeSchema = () => z.object({
  restaurantsMentioned: z.string(),
  primaryRestaurant: z.string(),
  dishesMentioned: z.string(),
  isSubjective: z.boolean(),
  attemptedLinkToRestaurantsMentioned: z.boolean().optional(),
  extractedAt: z.coerce.date().optional(),
  model: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  comment: z.lazy(() => CommentCreateNestedOneWithoutRestaurantExtractionInputObjectSchema).optional()
}).strict();
export const RestaurantExtractionCreateWithoutPostInputObjectSchema: z.ZodType<Prisma.RestaurantExtractionCreateWithoutPostInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantExtractionCreateWithoutPostInput>;
export const RestaurantExtractionCreateWithoutPostInputObjectZodSchema = makeSchema();
