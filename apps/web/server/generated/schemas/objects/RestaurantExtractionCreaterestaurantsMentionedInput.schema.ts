import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  set: z.string().array()
}).strict();
export const RestaurantExtractionCreaterestaurantsMentionedInputObjectSchema: z.ZodType<Prisma.RestaurantExtractionCreaterestaurantsMentionedInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantExtractionCreaterestaurantsMentionedInput>;
export const RestaurantExtractionCreaterestaurantsMentionedInputObjectZodSchema = makeSchema();
