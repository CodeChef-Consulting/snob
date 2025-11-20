import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  comments: z.boolean().optional(),
  files: z.boolean().optional(),
  restaurantsMentioned: z.boolean().optional(),
  restaurantGroupsMentioned: z.boolean().optional()
}).strict();
export const PostCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.PostCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.PostCountOutputTypeSelect>;
export const PostCountOutputTypeSelectObjectZodSchema = makeSchema();
