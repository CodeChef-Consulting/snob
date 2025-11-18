import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { BatchJobSelectObjectSchema as BatchJobSelectObjectSchema } from './BatchJobSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => BatchJobSelectObjectSchema).optional()
}).strict();
export const BatchJobArgsObjectSchema = makeSchema();
export const BatchJobArgsObjectZodSchema = makeSchema();
