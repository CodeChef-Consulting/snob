import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RestaurantExtractionSelectObjectSchema as RestaurantExtractionSelectObjectSchema } from './objects/RestaurantExtractionSelect.schema';
import { RestaurantExtractionIncludeObjectSchema as RestaurantExtractionIncludeObjectSchema } from './objects/RestaurantExtractionInclude.schema';
import { RestaurantExtractionWhereUniqueInputObjectSchema as RestaurantExtractionWhereUniqueInputObjectSchema } from './objects/RestaurantExtractionWhereUniqueInput.schema';

export const RestaurantExtractionDeleteOneSchema: z.ZodType<Prisma.RestaurantExtractionDeleteArgs> = z.object({ select: RestaurantExtractionSelectObjectSchema.optional(), include: RestaurantExtractionIncludeObjectSchema.optional(), where: RestaurantExtractionWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.RestaurantExtractionDeleteArgs>;

export const RestaurantExtractionDeleteOneZodSchema = z.object({ select: RestaurantExtractionSelectObjectSchema.optional(), include: RestaurantExtractionIncludeObjectSchema.optional(), where: RestaurantExtractionWhereUniqueInputObjectSchema }).strict();