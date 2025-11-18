import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ScrapingSessionSelectObjectSchema as ScrapingSessionSelectObjectSchema } from './ScrapingSessionSelect.schema';
import { ScrapingSessionIncludeObjectSchema as ScrapingSessionIncludeObjectSchema } from './ScrapingSessionInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => ScrapingSessionSelectObjectSchema).optional(),
  include: z.lazy(() => ScrapingSessionIncludeObjectSchema).optional()
}).strict();
export const ScrapingSessionArgsObjectSchema = makeSchema();
export const ScrapingSessionArgsObjectZodSchema = makeSchema();
