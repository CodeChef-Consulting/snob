import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RestaurantLocationUpdateManyMutationInputObjectSchema as RestaurantLocationUpdateManyMutationInputObjectSchema } from './objects/RestaurantLocationUpdateManyMutationInput.schema';
import { RestaurantLocationWhereInputObjectSchema as RestaurantLocationWhereInputObjectSchema } from './objects/RestaurantLocationWhereInput.schema';

export const RestaurantLocationUpdateManySchema: z.ZodType<Prisma.RestaurantLocationUpdateManyArgs> = z.object({ data: RestaurantLocationUpdateManyMutationInputObjectSchema, where: RestaurantLocationWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.RestaurantLocationUpdateManyArgs>;

export const RestaurantLocationUpdateManyZodSchema = z.object({ data: RestaurantLocationUpdateManyMutationInputObjectSchema, where: RestaurantLocationWhereInputObjectSchema.optional() }).strict();