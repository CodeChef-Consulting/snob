import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RestaurantUpdateManyMutationInputObjectSchema as RestaurantUpdateManyMutationInputObjectSchema } from './objects/RestaurantUpdateManyMutationInput.schema';
import { RestaurantWhereInputObjectSchema as RestaurantWhereInputObjectSchema } from './objects/RestaurantWhereInput.schema';

export const RestaurantUpdateManySchema: z.ZodType<Prisma.RestaurantUpdateManyArgs> = z.object({ data: RestaurantUpdateManyMutationInputObjectSchema, where: RestaurantWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.RestaurantUpdateManyArgs>;

export const RestaurantUpdateManyZodSchema = z.object({ data: RestaurantUpdateManyMutationInputObjectSchema, where: RestaurantWhereInputObjectSchema.optional() }).strict();