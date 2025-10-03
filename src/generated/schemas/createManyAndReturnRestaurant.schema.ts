import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { RestaurantSelectObjectSchema as RestaurantSelectObjectSchema } from './objects/RestaurantSelect.schema';
import { RestaurantCreateManyInputObjectSchema as RestaurantCreateManyInputObjectSchema } from './objects/RestaurantCreateManyInput.schema';

export const RestaurantCreateManyAndReturnSchema: z.ZodType<Prisma.RestaurantCreateManyAndReturnArgs> = z.object({ select: RestaurantSelectObjectSchema.optional(), data: z.union([ RestaurantCreateManyInputObjectSchema, z.array(RestaurantCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.RestaurantCreateManyAndReturnArgs>;

export const RestaurantCreateManyAndReturnZodSchema = z.object({ select: RestaurantSelectObjectSchema.optional(), data: z.union([ RestaurantCreateManyInputObjectSchema, z.array(RestaurantCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();