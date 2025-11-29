import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RestaurantGroupSelectObjectSchema as RestaurantGroupSelectObjectSchema } from './objects/RestaurantGroupSelect.schema';
import { RestaurantGroupUpdateManyMutationInputObjectSchema as RestaurantGroupUpdateManyMutationInputObjectSchema } from './objects/RestaurantGroupUpdateManyMutationInput.schema';
import { RestaurantGroupWhereInputObjectSchema as RestaurantGroupWhereInputObjectSchema } from './objects/RestaurantGroupWhereInput.schema';

export const RestaurantGroupUpdateManyAndReturnSchema: z.ZodType<Prisma.RestaurantGroupUpdateManyAndReturnArgs> = z.object({ select: RestaurantGroupSelectObjectSchema.optional(), data: RestaurantGroupUpdateManyMutationInputObjectSchema, where: RestaurantGroupWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.RestaurantGroupUpdateManyAndReturnArgs>;

export const RestaurantGroupUpdateManyAndReturnZodSchema = z.object({ select: RestaurantGroupSelectObjectSchema.optional(), data: RestaurantGroupUpdateManyMutationInputObjectSchema, where: RestaurantGroupWhereInputObjectSchema.optional() }).strict();