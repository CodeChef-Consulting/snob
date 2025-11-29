import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RestaurantSelectObjectSchema as RestaurantSelectObjectSchema } from './objects/RestaurantSelect.schema';
import { RestaurantUpdateManyMutationInputObjectSchema as RestaurantUpdateManyMutationInputObjectSchema } from './objects/RestaurantUpdateManyMutationInput.schema';
import { RestaurantWhereInputObjectSchema as RestaurantWhereInputObjectSchema } from './objects/RestaurantWhereInput.schema';

export const RestaurantUpdateManyAndReturnSchema: z.ZodType<Prisma.RestaurantUpdateManyAndReturnArgs> = z.object({ select: RestaurantSelectObjectSchema.optional(), data: RestaurantUpdateManyMutationInputObjectSchema, where: RestaurantWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.RestaurantUpdateManyAndReturnArgs>;

export const RestaurantUpdateManyAndReturnZodSchema = z.object({ select: RestaurantSelectObjectSchema.optional(), data: RestaurantUpdateManyMutationInputObjectSchema, where: RestaurantWhereInputObjectSchema.optional() }).strict();