import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantGroupArgsObjectSchema as RestaurantGroupArgsObjectSchema } from './RestaurantGroupArgs.schema'

const makeSchema = () => z.object({
  group: z.union([z.boolean(), z.lazy(() => RestaurantGroupArgsObjectSchema)]).optional()
}).strict();
export const RestaurantLocationIncludeObjectSchema: z.ZodType<Prisma.RestaurantLocationInclude> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantLocationInclude>;
export const RestaurantLocationIncludeObjectZodSchema = makeSchema();
