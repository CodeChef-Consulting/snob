import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RestaurantExtractionCreateManyInputObjectSchema as RestaurantExtractionCreateManyInputObjectSchema } from './objects/RestaurantExtractionCreateManyInput.schema';

export const RestaurantExtractionCreateManySchema: z.ZodType<Prisma.RestaurantExtractionCreateManyArgs> = z.object({ data: z.union([ RestaurantExtractionCreateManyInputObjectSchema, z.array(RestaurantExtractionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.RestaurantExtractionCreateManyArgs>;

export const RestaurantExtractionCreateManyZodSchema = z.object({ data: z.union([ RestaurantExtractionCreateManyInputObjectSchema, z.array(RestaurantExtractionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();