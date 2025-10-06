import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ScrapingSessionWhereInputObjectSchema as ScrapingSessionWhereInputObjectSchema } from './ScrapingSessionWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => ScrapingSessionWhereInputObjectSchema).optional().nullable(),
  isNot: z.lazy(() => ScrapingSessionWhereInputObjectSchema).optional().nullable()
}).strict();
export const ScrapingSessionNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.ScrapingSessionNullableScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.ScrapingSessionNullableScalarRelationFilter>;
export const ScrapingSessionNullableScalarRelationFilterObjectZodSchema = makeSchema();
