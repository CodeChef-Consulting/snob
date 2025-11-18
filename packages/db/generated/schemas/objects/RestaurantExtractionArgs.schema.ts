import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantExtractionSelectObjectSchema as RestaurantExtractionSelectObjectSchema } from './RestaurantExtractionSelect.schema';
import { RestaurantExtractionIncludeObjectSchema as RestaurantExtractionIncludeObjectSchema } from './RestaurantExtractionInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => RestaurantExtractionSelectObjectSchema).optional(),
  include: z.lazy(() => RestaurantExtractionIncludeObjectSchema).optional()
}).strict();
export const RestaurantExtractionArgsObjectSchema = makeSchema();
export const RestaurantExtractionArgsObjectZodSchema = makeSchema();
