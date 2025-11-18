import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RestaurantExtractionSelectObjectSchema as RestaurantExtractionSelectObjectSchema } from './objects/RestaurantExtractionSelect.schema';
import { RestaurantExtractionCreateManyInputObjectSchema as RestaurantExtractionCreateManyInputObjectSchema } from './objects/RestaurantExtractionCreateManyInput.schema';

export const RestaurantExtractionCreateManyAndReturnSchema: z.ZodType<Prisma.RestaurantExtractionCreateManyAndReturnArgs> = z.object({ select: RestaurantExtractionSelectObjectSchema.optional(), data: z.union([ RestaurantExtractionCreateManyInputObjectSchema, z.array(RestaurantExtractionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.RestaurantExtractionCreateManyAndReturnArgs>;

export const RestaurantExtractionCreateManyAndReturnZodSchema = z.object({ select: RestaurantExtractionSelectObjectSchema.optional(), data: z.union([ RestaurantExtractionCreateManyInputObjectSchema, z.array(RestaurantExtractionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();