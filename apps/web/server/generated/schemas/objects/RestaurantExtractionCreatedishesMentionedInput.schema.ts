import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  set: z.string().array()
}).strict();
export const RestaurantExtractionCreatedishesMentionedInputObjectSchema: z.ZodType<Prisma.RestaurantExtractionCreatedishesMentionedInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantExtractionCreatedishesMentionedInput>;
export const RestaurantExtractionCreatedishesMentionedInputObjectZodSchema = makeSchema();
