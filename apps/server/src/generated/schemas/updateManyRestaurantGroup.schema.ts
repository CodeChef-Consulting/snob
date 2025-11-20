import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RestaurantGroupUpdateManyMutationInputObjectSchema as RestaurantGroupUpdateManyMutationInputObjectSchema } from './objects/RestaurantGroupUpdateManyMutationInput.schema';
import { RestaurantGroupWhereInputObjectSchema as RestaurantGroupWhereInputObjectSchema } from './objects/RestaurantGroupWhereInput.schema';

export const RestaurantGroupUpdateManySchema: z.ZodType<Prisma.RestaurantGroupUpdateManyArgs> = z.object({ data: RestaurantGroupUpdateManyMutationInputObjectSchema, where: RestaurantGroupWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.RestaurantGroupUpdateManyArgs>;

export const RestaurantGroupUpdateManyZodSchema = z.object({ data: RestaurantGroupUpdateManyMutationInputObjectSchema, where: RestaurantGroupWhereInputObjectSchema.optional() }).strict();