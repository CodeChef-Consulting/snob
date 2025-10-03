import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional()
}).strict();
export const ScrapingSessionAvgAggregateInputObjectSchema: z.ZodType<Prisma.ScrapingSessionAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ScrapingSessionAvgAggregateInputType>;
export const ScrapingSessionAvgAggregateInputObjectZodSchema = makeSchema();
