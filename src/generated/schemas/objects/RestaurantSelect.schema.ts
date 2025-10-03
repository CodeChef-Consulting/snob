import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PostFindManySchema as PostFindManySchema } from '../findManyPost.schema';
import { RestaurantCountOutputTypeArgsObjectSchema as RestaurantCountOutputTypeArgsObjectSchema } from './RestaurantCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  address: z.boolean().optional(),
  city: z.boolean().optional(),
  state: z.boolean().optional(),
  zipCode: z.boolean().optional(),
  phone: z.boolean().optional(),
  website: z.boolean().optional(),
  cuisine: z.boolean().optional(),
  priceRange: z.boolean().optional(),
  metadata: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  posts: z.union([z.boolean(), z.lazy(() => PostFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => RestaurantCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const RestaurantSelectObjectSchema: z.ZodType<Prisma.RestaurantSelect> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantSelect>;
export const RestaurantSelectObjectZodSchema = makeSchema();
