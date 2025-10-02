import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantArgsObjectSchema as RestaurantArgsObjectSchema } from './RestaurantArgs.schema'

const makeSchema = () => z.object({
  restaurant: z.union([z.boolean(), z.lazy(() => RestaurantArgsObjectSchema)]).optional()
}).strict();
export const ScrapingSessionIncludeObjectSchema: z.ZodType<Prisma.ScrapingSessionInclude> = makeSchema() as unknown as z.ZodType<Prisma.ScrapingSessionInclude>;
export const ScrapingSessionIncludeObjectZodSchema = makeSchema();
