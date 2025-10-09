import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  itemCount: z.literal(true).optional(),
  successCount: z.literal(true).optional(),
  errorCount: z.literal(true).optional()
}).strict();
export const BatchJobAvgAggregateInputObjectSchema: z.ZodType<Prisma.BatchJobAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.BatchJobAvgAggregateInputType>;
export const BatchJobAvgAggregateInputObjectZodSchema = makeSchema();
