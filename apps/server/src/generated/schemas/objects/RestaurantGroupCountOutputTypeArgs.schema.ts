import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantGroupCountOutputTypeSelectObjectSchema as RestaurantGroupCountOutputTypeSelectObjectSchema } from './RestaurantGroupCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => RestaurantGroupCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const RestaurantGroupCountOutputTypeArgsObjectSchema = makeSchema();
export const RestaurantGroupCountOutputTypeArgsObjectZodSchema = makeSchema();
