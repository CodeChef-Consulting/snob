import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RestaurantLocationSelectObjectSchema as RestaurantLocationSelectObjectSchema } from './objects/RestaurantLocationSelect.schema';
import { RestaurantLocationCreateManyInputObjectSchema as RestaurantLocationCreateManyInputObjectSchema } from './objects/RestaurantLocationCreateManyInput.schema';

export const RestaurantLocationCreateManyAndReturnSchema: z.ZodType<Prisma.RestaurantLocationCreateManyAndReturnArgs> = z.object({ select: RestaurantLocationSelectObjectSchema.optional(), data: z.union([ RestaurantLocationCreateManyInputObjectSchema, z.array(RestaurantLocationCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.RestaurantLocationCreateManyAndReturnArgs>;

export const RestaurantLocationCreateManyAndReturnZodSchema = z.object({ select: RestaurantLocationSelectObjectSchema.optional(), data: z.union([ RestaurantLocationCreateManyInputObjectSchema, z.array(RestaurantLocationCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();