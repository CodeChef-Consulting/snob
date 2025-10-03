import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantCountOutputTypeSelectObjectSchema as RestaurantCountOutputTypeSelectObjectSchema } from './RestaurantCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => RestaurantCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const RestaurantCountOutputTypeArgsObjectSchema = makeSchema();
export const RestaurantCountOutputTypeArgsObjectZodSchema = makeSchema();
