import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  locations: z.boolean().optional(),
  posts: z.boolean().optional(),
  comments: z.boolean().optional()
}).strict();
export const RestaurantGroupCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.RestaurantGroupCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantGroupCountOutputTypeSelect>;
export const RestaurantGroupCountOutputTypeSelectObjectZodSchema = makeSchema();
