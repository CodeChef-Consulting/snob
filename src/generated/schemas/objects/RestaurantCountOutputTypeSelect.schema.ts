import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  posts: z.boolean().optional()
}).strict();
export const RestaurantCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.RestaurantCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantCountOutputTypeSelect>;
export const RestaurantCountOutputTypeSelectObjectZodSchema = makeSchema();
