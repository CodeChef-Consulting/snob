import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { RestaurantSelectObjectSchema } from './objects/RestaurantSelect.schema';
import { RestaurantIncludeObjectSchema } from './objects/RestaurantInclude.schema';
import { RestaurantWhereUniqueInputObjectSchema } from './objects/RestaurantWhereUniqueInput.schema';

export const RestaurantFindUniqueOrThrowSchema: z.ZodType<Prisma.RestaurantFindUniqueOrThrowArgs> = z.object({ select: RestaurantSelectObjectSchema.optional(), include: RestaurantIncludeObjectSchema.optional(), where: RestaurantWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.RestaurantFindUniqueOrThrowArgs>;

export const RestaurantFindUniqueOrThrowZodSchema = z.object({ select: RestaurantSelectObjectSchema.optional(), include: RestaurantIncludeObjectSchema.optional(), where: RestaurantWhereUniqueInputObjectSchema }).strict();