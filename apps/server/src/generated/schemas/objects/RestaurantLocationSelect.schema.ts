import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantGroupArgsObjectSchema as RestaurantGroupArgsObjectSchema } from './RestaurantGroupArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  address: z.boolean().optional(),
  city: z.boolean().optional(),
  state: z.boolean().optional(),
  zipCode: z.boolean().optional(),
  latitude: z.boolean().optional(),
  longitude: z.boolean().optional(),
  source: z.boolean().optional(),
  googlePlaceId: z.boolean().optional(),
  lookupAliases: z.boolean().optional(),
  metadata: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  group: z.union([z.boolean(), z.lazy(() => RestaurantGroupArgsObjectSchema)]).optional(),
  groupId: z.boolean().optional()
}).strict();
export const RestaurantLocationSelectObjectSchema: z.ZodType<Prisma.RestaurantLocationSelect> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantLocationSelect>;
export const RestaurantLocationSelectObjectZodSchema = makeSchema();
