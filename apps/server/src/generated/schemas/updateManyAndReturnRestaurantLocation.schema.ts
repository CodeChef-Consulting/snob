import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RestaurantLocationSelectObjectSchema as RestaurantLocationSelectObjectSchema } from './objects/RestaurantLocationSelect.schema';
import { RestaurantLocationUpdateManyMutationInputObjectSchema as RestaurantLocationUpdateManyMutationInputObjectSchema } from './objects/RestaurantLocationUpdateManyMutationInput.schema';
import { RestaurantLocationWhereInputObjectSchema as RestaurantLocationWhereInputObjectSchema } from './objects/RestaurantLocationWhereInput.schema';

export const RestaurantLocationUpdateManyAndReturnSchema: z.ZodType<Prisma.RestaurantLocationUpdateManyAndReturnArgs> = z.object({ select: RestaurantLocationSelectObjectSchema.optional(), data: RestaurantLocationUpdateManyMutationInputObjectSchema, where: RestaurantLocationWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.RestaurantLocationUpdateManyAndReturnArgs>;

export const RestaurantLocationUpdateManyAndReturnZodSchema = z.object({ select: RestaurantLocationSelectObjectSchema.optional(), data: RestaurantLocationUpdateManyMutationInputObjectSchema, where: RestaurantLocationWhereInputObjectSchema.optional() }).strict();