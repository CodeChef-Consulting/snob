import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RestaurantGroupWhereInputObjectSchema as RestaurantGroupWhereInputObjectSchema } from './objects/RestaurantGroupWhereInput.schema';

export const RestaurantGroupDeleteManySchema: z.ZodType<Prisma.RestaurantGroupDeleteManyArgs> = z.object({ where: RestaurantGroupWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.RestaurantGroupDeleteManyArgs>;

export const RestaurantGroupDeleteManyZodSchema = z.object({ where: RestaurantGroupWhereInputObjectSchema.optional() }).strict();