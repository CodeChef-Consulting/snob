import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RestaurantGroupCreateManyInputObjectSchema as RestaurantGroupCreateManyInputObjectSchema } from './objects/RestaurantGroupCreateManyInput.schema';

export const RestaurantGroupCreateManySchema: z.ZodType<Prisma.RestaurantGroupCreateManyArgs> = z.object({ data: z.union([ RestaurantGroupCreateManyInputObjectSchema, z.array(RestaurantGroupCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.RestaurantGroupCreateManyArgs>;

export const RestaurantGroupCreateManyZodSchema = z.object({ data: z.union([ RestaurantGroupCreateManyInputObjectSchema, z.array(RestaurantGroupCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();