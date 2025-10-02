import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantSelectObjectSchema } from './RestaurantSelect.schema';
import { RestaurantIncludeObjectSchema } from './RestaurantInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => RestaurantSelectObjectSchema).optional(),
  include: z.lazy(() => RestaurantIncludeObjectSchema).optional()
}).strict();
export const RestaurantArgsObjectSchema = makeSchema();
export const RestaurantArgsObjectZodSchema = makeSchema();
