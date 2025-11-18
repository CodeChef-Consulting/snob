import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ScrapingSessionCountOutputTypeSelectObjectSchema as ScrapingSessionCountOutputTypeSelectObjectSchema } from './ScrapingSessionCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => ScrapingSessionCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const ScrapingSessionCountOutputTypeArgsObjectSchema = makeSchema();
export const ScrapingSessionCountOutputTypeArgsObjectZodSchema = makeSchema();
