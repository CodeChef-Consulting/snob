import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RestaurantExtractionSelectObjectSchema as RestaurantExtractionSelectObjectSchema } from './objects/RestaurantExtractionSelect.schema';
import { RestaurantExtractionIncludeObjectSchema as RestaurantExtractionIncludeObjectSchema } from './objects/RestaurantExtractionInclude.schema';
import { RestaurantExtractionCreateInputObjectSchema as RestaurantExtractionCreateInputObjectSchema } from './objects/RestaurantExtractionCreateInput.schema';
import { RestaurantExtractionUncheckedCreateInputObjectSchema as RestaurantExtractionUncheckedCreateInputObjectSchema } from './objects/RestaurantExtractionUncheckedCreateInput.schema';

export const RestaurantExtractionCreateOneSchema: z.ZodType<Prisma.RestaurantExtractionCreateArgs> = z.object({ select: RestaurantExtractionSelectObjectSchema.optional(), include: RestaurantExtractionIncludeObjectSchema.optional(), data: z.union([RestaurantExtractionCreateInputObjectSchema, RestaurantExtractionUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.RestaurantExtractionCreateArgs>;

export const RestaurantExtractionCreateOneZodSchema = z.object({ select: RestaurantExtractionSelectObjectSchema.optional(), include: RestaurantExtractionIncludeObjectSchema.optional(), data: z.union([RestaurantExtractionCreateInputObjectSchema, RestaurantExtractionUncheckedCreateInputObjectSchema]) }).strict();