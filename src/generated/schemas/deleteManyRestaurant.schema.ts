import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { RestaurantWhereInputObjectSchema as RestaurantWhereInputObjectSchema } from './objects/RestaurantWhereInput.schema';

export const RestaurantDeleteManySchema: z.ZodType<Prisma.RestaurantDeleteManyArgs> = z.object({ where: RestaurantWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.RestaurantDeleteManyArgs>;

export const RestaurantDeleteManyZodSchema = z.object({ where: RestaurantWhereInputObjectSchema.optional() }).strict();