import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RestaurantLocationWhereInputObjectSchema as RestaurantLocationWhereInputObjectSchema } from './objects/RestaurantLocationWhereInput.schema';

export const RestaurantLocationDeleteManySchema: z.ZodType<Prisma.RestaurantLocationDeleteManyArgs> = z.object({ where: RestaurantLocationWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.RestaurantLocationDeleteManyArgs>;

export const RestaurantLocationDeleteManyZodSchema = z.object({ where: RestaurantLocationWhereInputObjectSchema.optional() }).strict();