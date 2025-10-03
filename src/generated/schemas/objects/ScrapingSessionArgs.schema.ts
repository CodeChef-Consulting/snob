import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ScrapingSessionSelectObjectSchema as ScrapingSessionSelectObjectSchema } from './ScrapingSessionSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => ScrapingSessionSelectObjectSchema).optional()
}).strict();
export const ScrapingSessionArgsObjectSchema = makeSchema();
export const ScrapingSessionArgsObjectZodSchema = makeSchema();
