import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RestaurantExtractionSelectObjectSchema as RestaurantExtractionSelectObjectSchema } from './objects/RestaurantExtractionSelect.schema';
import { RestaurantExtractionIncludeObjectSchema as RestaurantExtractionIncludeObjectSchema } from './objects/RestaurantExtractionInclude.schema';
import { RestaurantExtractionWhereUniqueInputObjectSchema as RestaurantExtractionWhereUniqueInputObjectSchema } from './objects/RestaurantExtractionWhereUniqueInput.schema';

export const RestaurantExtractionFindUniqueOrThrowSchema: z.ZodType<Prisma.RestaurantExtractionFindUniqueOrThrowArgs> = z.object({ select: RestaurantExtractionSelectObjectSchema.optional(), include: RestaurantExtractionIncludeObjectSchema.optional(), where: RestaurantExtractionWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.RestaurantExtractionFindUniqueOrThrowArgs>;

export const RestaurantExtractionFindUniqueOrThrowZodSchema = z.object({ select: RestaurantExtractionSelectObjectSchema.optional(), include: RestaurantExtractionIncludeObjectSchema.optional(), where: RestaurantExtractionWhereUniqueInputObjectSchema }).strict();