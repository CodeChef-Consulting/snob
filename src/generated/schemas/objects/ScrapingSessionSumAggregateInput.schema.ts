import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional()
}).strict();
export const ScrapingSessionSumAggregateInputObjectSchema: z.ZodType<Prisma.ScrapingSessionSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ScrapingSessionSumAggregateInputType>;
export const ScrapingSessionSumAggregateInputObjectZodSchema = makeSchema();
