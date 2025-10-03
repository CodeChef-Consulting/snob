import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { RestaurantCreateManyInputObjectSchema as RestaurantCreateManyInputObjectSchema } from './objects/RestaurantCreateManyInput.schema';

export const RestaurantCreateManySchema: z.ZodType<Prisma.RestaurantCreateManyArgs> = z.object({ data: z.union([ RestaurantCreateManyInputObjectSchema, z.array(RestaurantCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.RestaurantCreateManyArgs>;

export const RestaurantCreateManyZodSchema = z.object({ data: z.union([ RestaurantCreateManyInputObjectSchema, z.array(RestaurantCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();