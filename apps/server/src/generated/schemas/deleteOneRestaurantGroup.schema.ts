import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RestaurantGroupSelectObjectSchema as RestaurantGroupSelectObjectSchema } from './objects/RestaurantGroupSelect.schema';
import { RestaurantGroupIncludeObjectSchema as RestaurantGroupIncludeObjectSchema } from './objects/RestaurantGroupInclude.schema';
import { RestaurantGroupWhereUniqueInputObjectSchema as RestaurantGroupWhereUniqueInputObjectSchema } from './objects/RestaurantGroupWhereUniqueInput.schema';

export const RestaurantGroupDeleteOneSchema: z.ZodType<Prisma.RestaurantGroupDeleteArgs> = z.object({ select: RestaurantGroupSelectObjectSchema.optional(), include: RestaurantGroupIncludeObjectSchema.optional(), where: RestaurantGroupWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.RestaurantGroupDeleteArgs>;

export const RestaurantGroupDeleteOneZodSchema = z.object({ select: RestaurantGroupSelectObjectSchema.optional(), include: RestaurantGroupIncludeObjectSchema.optional(), where: RestaurantGroupWhereUniqueInputObjectSchema }).strict();