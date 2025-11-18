import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RestaurantExtractionSelectObjectSchema as RestaurantExtractionSelectObjectSchema } from './objects/RestaurantExtractionSelect.schema';
import { RestaurantExtractionUpdateManyMutationInputObjectSchema as RestaurantExtractionUpdateManyMutationInputObjectSchema } from './objects/RestaurantExtractionUpdateManyMutationInput.schema';
import { RestaurantExtractionWhereInputObjectSchema as RestaurantExtractionWhereInputObjectSchema } from './objects/RestaurantExtractionWhereInput.schema';

export const RestaurantExtractionUpdateManyAndReturnSchema: z.ZodType<Prisma.RestaurantExtractionUpdateManyAndReturnArgs> = z.object({ select: RestaurantExtractionSelectObjectSchema.optional(), data: RestaurantExtractionUpdateManyMutationInputObjectSchema, where: RestaurantExtractionWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.RestaurantExtractionUpdateManyAndReturnArgs>;

export const RestaurantExtractionUpdateManyAndReturnZodSchema = z.object({ select: RestaurantExtractionSelectObjectSchema.optional(), data: RestaurantExtractionUpdateManyMutationInputObjectSchema, where: RestaurantExtractionWhereInputObjectSchema.optional() }).strict();