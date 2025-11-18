import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RestaurantExtractionUpdateManyMutationInputObjectSchema as RestaurantExtractionUpdateManyMutationInputObjectSchema } from './objects/RestaurantExtractionUpdateManyMutationInput.schema';
import { RestaurantExtractionWhereInputObjectSchema as RestaurantExtractionWhereInputObjectSchema } from './objects/RestaurantExtractionWhereInput.schema';

export const RestaurantExtractionUpdateManySchema: z.ZodType<Prisma.RestaurantExtractionUpdateManyArgs> = z.object({ data: RestaurantExtractionUpdateManyMutationInputObjectSchema, where: RestaurantExtractionWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.RestaurantExtractionUpdateManyArgs>;

export const RestaurantExtractionUpdateManyZodSchema = z.object({ data: RestaurantExtractionUpdateManyMutationInputObjectSchema, where: RestaurantExtractionWhereInputObjectSchema.optional() }).strict();