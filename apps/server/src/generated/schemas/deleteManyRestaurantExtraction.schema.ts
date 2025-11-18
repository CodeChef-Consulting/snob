import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RestaurantExtractionWhereInputObjectSchema as RestaurantExtractionWhereInputObjectSchema } from './objects/RestaurantExtractionWhereInput.schema';

export const RestaurantExtractionDeleteManySchema: z.ZodType<Prisma.RestaurantExtractionDeleteManyArgs> = z.object({ where: RestaurantExtractionWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.RestaurantExtractionDeleteManyArgs>;

export const RestaurantExtractionDeleteManyZodSchema = z.object({ where: RestaurantExtractionWhereInputObjectSchema.optional() }).strict();