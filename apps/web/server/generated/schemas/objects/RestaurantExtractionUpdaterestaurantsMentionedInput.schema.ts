import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  set: z.string().array().optional(),
  push: z.union([z.string(), z.string().array()]).optional()
}).strict();
export const RestaurantExtractionUpdaterestaurantsMentionedInputObjectSchema: z.ZodType<Prisma.RestaurantExtractionUpdaterestaurantsMentionedInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantExtractionUpdaterestaurantsMentionedInput>;
export const RestaurantExtractionUpdaterestaurantsMentionedInputObjectZodSchema = makeSchema();
