import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ScrapingSessionWhereInputObjectSchema as ScrapingSessionWhereInputObjectSchema } from './ScrapingSessionWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => ScrapingSessionWhereInputObjectSchema).optional(),
  some: z.lazy(() => ScrapingSessionWhereInputObjectSchema).optional(),
  none: z.lazy(() => ScrapingSessionWhereInputObjectSchema).optional()
}).strict();
export const ScrapingSessionListRelationFilterObjectSchema: z.ZodType<Prisma.ScrapingSessionListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.ScrapingSessionListRelationFilter>;
export const ScrapingSessionListRelationFilterObjectZodSchema = makeSchema();
