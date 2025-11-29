import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.number().int().optional(),
  name: z.string(),
  rawScore: z.number().optional().nullable(),
  normalizedScore: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const RestaurantGroupCreateManyInputObjectSchema: z.ZodType<Prisma.RestaurantGroupCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantGroupCreateManyInput>;
export const RestaurantGroupCreateManyInputObjectZodSchema = makeSchema();
