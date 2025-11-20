import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantLocationSelectObjectSchema as RestaurantLocationSelectObjectSchema } from './RestaurantLocationSelect.schema';
import { RestaurantLocationIncludeObjectSchema as RestaurantLocationIncludeObjectSchema } from './RestaurantLocationInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => RestaurantLocationSelectObjectSchema).optional(),
  include: z.lazy(() => RestaurantLocationIncludeObjectSchema).optional()
}).strict();
export const RestaurantLocationArgsObjectSchema = makeSchema();
export const RestaurantLocationArgsObjectZodSchema = makeSchema();
