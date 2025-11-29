import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantGroupSelectObjectSchema as RestaurantGroupSelectObjectSchema } from './RestaurantGroupSelect.schema';
import { RestaurantGroupIncludeObjectSchema as RestaurantGroupIncludeObjectSchema } from './RestaurantGroupInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => RestaurantGroupSelectObjectSchema).optional(),
  include: z.lazy(() => RestaurantGroupIncludeObjectSchema).optional()
}).strict();
export const RestaurantGroupArgsObjectSchema = makeSchema();
export const RestaurantGroupArgsObjectZodSchema = makeSchema();
