import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  itemCount: z.literal(true).optional(),
  successCount: z.literal(true).optional(),
  errorCount: z.literal(true).optional()
}).strict();
export const BatchJobSumAggregateInputObjectSchema: z.ZodType<Prisma.BatchJobSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.BatchJobSumAggregateInputType>;
export const BatchJobSumAggregateInputObjectZodSchema = makeSchema();
