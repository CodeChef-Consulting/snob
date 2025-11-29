import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RestaurantGroupSelectObjectSchema as RestaurantGroupSelectObjectSchema } from './objects/RestaurantGroupSelect.schema';
import { RestaurantGroupCreateManyInputObjectSchema as RestaurantGroupCreateManyInputObjectSchema } from './objects/RestaurantGroupCreateManyInput.schema';

export const RestaurantGroupCreateManyAndReturnSchema: z.ZodType<Prisma.RestaurantGroupCreateManyAndReturnArgs> = z.object({ select: RestaurantGroupSelectObjectSchema.optional(), data: z.union([ RestaurantGroupCreateManyInputObjectSchema, z.array(RestaurantGroupCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.RestaurantGroupCreateManyAndReturnArgs>;

export const RestaurantGroupCreateManyAndReturnZodSchema = z.object({ select: RestaurantGroupSelectObjectSchema.optional(), data: z.union([ RestaurantGroupCreateManyInputObjectSchema, z.array(RestaurantGroupCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();