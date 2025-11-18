import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RestaurantExtractionSelectObjectSchema as RestaurantExtractionSelectObjectSchema } from './objects/RestaurantExtractionSelect.schema';
import { RestaurantExtractionIncludeObjectSchema as RestaurantExtractionIncludeObjectSchema } from './objects/RestaurantExtractionInclude.schema';
import { RestaurantExtractionUpdateInputObjectSchema as RestaurantExtractionUpdateInputObjectSchema } from './objects/RestaurantExtractionUpdateInput.schema';
import { RestaurantExtractionUncheckedUpdateInputObjectSchema as RestaurantExtractionUncheckedUpdateInputObjectSchema } from './objects/RestaurantExtractionUncheckedUpdateInput.schema';
import { RestaurantExtractionWhereUniqueInputObjectSchema as RestaurantExtractionWhereUniqueInputObjectSchema } from './objects/RestaurantExtractionWhereUniqueInput.schema';

export const RestaurantExtractionUpdateOneSchema: z.ZodType<Prisma.RestaurantExtractionUpdateArgs> = z.object({ select: RestaurantExtractionSelectObjectSchema.optional(), include: RestaurantExtractionIncludeObjectSchema.optional(), data: z.union([RestaurantExtractionUpdateInputObjectSchema, RestaurantExtractionUncheckedUpdateInputObjectSchema]), where: RestaurantExtractionWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.RestaurantExtractionUpdateArgs>;

export const RestaurantExtractionUpdateOneZodSchema = z.object({ select: RestaurantExtractionSelectObjectSchema.optional(), include: RestaurantExtractionIncludeObjectSchema.optional(), data: z.union([RestaurantExtractionUpdateInputObjectSchema, RestaurantExtractionUncheckedUpdateInputObjectSchema]), where: RestaurantExtractionWhereUniqueInputObjectSchema }).strict();