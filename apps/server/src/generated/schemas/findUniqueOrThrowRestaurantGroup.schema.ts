import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RestaurantGroupSelectObjectSchema as RestaurantGroupSelectObjectSchema } from './objects/RestaurantGroupSelect.schema';
import { RestaurantGroupIncludeObjectSchema as RestaurantGroupIncludeObjectSchema } from './objects/RestaurantGroupInclude.schema';
import { RestaurantGroupWhereUniqueInputObjectSchema as RestaurantGroupWhereUniqueInputObjectSchema } from './objects/RestaurantGroupWhereUniqueInput.schema';

export const RestaurantGroupFindUniqueOrThrowSchema: z.ZodType<Prisma.RestaurantGroupFindUniqueOrThrowArgs> = z.object({ select: RestaurantGroupSelectObjectSchema.optional(), include: RestaurantGroupIncludeObjectSchema.optional(), where: RestaurantGroupWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.RestaurantGroupFindUniqueOrThrowArgs>;

export const RestaurantGroupFindUniqueOrThrowZodSchema = z.object({ select: RestaurantGroupSelectObjectSchema.optional(), include: RestaurantGroupIncludeObjectSchema.optional(), where: RestaurantGroupWhereUniqueInputObjectSchema }).strict();