import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RestaurantLocationCreateManyInputObjectSchema as RestaurantLocationCreateManyInputObjectSchema } from './objects/RestaurantLocationCreateManyInput.schema';

export const RestaurantLocationCreateManySchema: z.ZodType<Prisma.RestaurantLocationCreateManyArgs> = z.object({ data: z.union([ RestaurantLocationCreateManyInputObjectSchema, z.array(RestaurantLocationCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.RestaurantLocationCreateManyArgs>;

export const RestaurantLocationCreateManyZodSchema = z.object({ data: z.union([ RestaurantLocationCreateManyInputObjectSchema, z.array(RestaurantLocationCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();