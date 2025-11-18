import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RestaurantExtractionSelectObjectSchema as RestaurantExtractionSelectObjectSchema } from './objects/RestaurantExtractionSelect.schema';
import { RestaurantExtractionIncludeObjectSchema as RestaurantExtractionIncludeObjectSchema } from './objects/RestaurantExtractionInclude.schema';
import { RestaurantExtractionWhereUniqueInputObjectSchema as RestaurantExtractionWhereUniqueInputObjectSchema } from './objects/RestaurantExtractionWhereUniqueInput.schema';

export const RestaurantExtractionFindUniqueSchema: z.ZodType<Prisma.RestaurantExtractionFindUniqueArgs> = z.object({ select: RestaurantExtractionSelectObjectSchema.optional(), include: RestaurantExtractionIncludeObjectSchema.optional(), where: RestaurantExtractionWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.RestaurantExtractionFindUniqueArgs>;

export const RestaurantExtractionFindUniqueZodSchema = z.object({ select: RestaurantExtractionSelectObjectSchema.optional(), include: RestaurantExtractionIncludeObjectSchema.optional(), where: RestaurantExtractionWhereUniqueInputObjectSchema }).strict();