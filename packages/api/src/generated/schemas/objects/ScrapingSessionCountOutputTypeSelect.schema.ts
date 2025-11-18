import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  posts: z.boolean().optional(),
  comments: z.boolean().optional()
}).strict();
export const ScrapingSessionCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.ScrapingSessionCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.ScrapingSessionCountOutputTypeSelect>;
export const ScrapingSessionCountOutputTypeSelectObjectZodSchema = makeSchema();
