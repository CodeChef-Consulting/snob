import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RestaurantExtractionSelectObjectSchema as RestaurantExtractionSelectObjectSchema } from './objects/RestaurantExtractionSelect.schema';
import { RestaurantExtractionIncludeObjectSchema as RestaurantExtractionIncludeObjectSchema } from './objects/RestaurantExtractionInclude.schema';
import { RestaurantExtractionWhereUniqueInputObjectSchema as RestaurantExtractionWhereUniqueInputObjectSchema } from './objects/RestaurantExtractionWhereUniqueInput.schema';
import { RestaurantExtractionCreateInputObjectSchema as RestaurantExtractionCreateInputObjectSchema } from './objects/RestaurantExtractionCreateInput.schema';
import { RestaurantExtractionUncheckedCreateInputObjectSchema as RestaurantExtractionUncheckedCreateInputObjectSchema } from './objects/RestaurantExtractionUncheckedCreateInput.schema';
import { RestaurantExtractionUpdateInputObjectSchema as RestaurantExtractionUpdateInputObjectSchema } from './objects/RestaurantExtractionUpdateInput.schema';
import { RestaurantExtractionUncheckedUpdateInputObjectSchema as RestaurantExtractionUncheckedUpdateInputObjectSchema } from './objects/RestaurantExtractionUncheckedUpdateInput.schema';

export const RestaurantExtractionUpsertOneSchema: z.ZodType<Prisma.RestaurantExtractionUpsertArgs> = z.object({ select: RestaurantExtractionSelectObjectSchema.optional(), include: RestaurantExtractionIncludeObjectSchema.optional(), where: RestaurantExtractionWhereUniqueInputObjectSchema, create: z.union([ RestaurantExtractionCreateInputObjectSchema, RestaurantExtractionUncheckedCreateInputObjectSchema ]), update: z.union([ RestaurantExtractionUpdateInputObjectSchema, RestaurantExtractionUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.RestaurantExtractionUpsertArgs>;

export const RestaurantExtractionUpsertOneZodSchema = z.object({ select: RestaurantExtractionSelectObjectSchema.optional(), include: RestaurantExtractionIncludeObjectSchema.optional(), where: RestaurantExtractionWhereUniqueInputObjectSchema, create: z.union([ RestaurantExtractionCreateInputObjectSchema, RestaurantExtractionUncheckedCreateInputObjectSchema ]), update: z.union([ RestaurantExtractionUpdateInputObjectSchema, RestaurantExtractionUncheckedUpdateInputObjectSchema ]) }).strict();
// Alias for prisma-trpc-generator compatibility
export const RestaurantExtractionUpsertSchema = RestaurantExtractionUpsertOneSchema;
