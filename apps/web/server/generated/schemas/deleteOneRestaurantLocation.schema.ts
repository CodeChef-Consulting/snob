import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RestaurantLocationSelectObjectSchema as RestaurantLocationSelectObjectSchema } from './objects/RestaurantLocationSelect.schema';
import { RestaurantLocationIncludeObjectSchema as RestaurantLocationIncludeObjectSchema } from './objects/RestaurantLocationInclude.schema';
import { RestaurantLocationWhereUniqueInputObjectSchema as RestaurantLocationWhereUniqueInputObjectSchema } from './objects/RestaurantLocationWhereUniqueInput.schema';

export const RestaurantLocationDeleteOneSchema: z.ZodType<Prisma.RestaurantLocationDeleteArgs> = z.object({ select: RestaurantLocationSelectObjectSchema.optional(), include: RestaurantLocationIncludeObjectSchema.optional(), where: RestaurantLocationWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.RestaurantLocationDeleteArgs>;

export const RestaurantLocationDeleteOneZodSchema = z.object({ select: RestaurantLocationSelectObjectSchema.optional(), include: RestaurantLocationIncludeObjectSchema.optional(), where: RestaurantLocationWhereUniqueInputObjectSchema }).strict();