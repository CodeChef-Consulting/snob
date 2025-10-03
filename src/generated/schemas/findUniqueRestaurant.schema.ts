import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { RestaurantSelectObjectSchema as RestaurantSelectObjectSchema } from './objects/RestaurantSelect.schema';
import { RestaurantIncludeObjectSchema as RestaurantIncludeObjectSchema } from './objects/RestaurantInclude.schema';
import { RestaurantWhereUniqueInputObjectSchema as RestaurantWhereUniqueInputObjectSchema } from './objects/RestaurantWhereUniqueInput.schema';

export const RestaurantFindUniqueSchema: z.ZodType<Prisma.RestaurantFindUniqueArgs> = z.object({ select: RestaurantSelectObjectSchema.optional(), include: RestaurantIncludeObjectSchema.optional(), where: RestaurantWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.RestaurantFindUniqueArgs>;

export const RestaurantFindUniqueZodSchema = z.object({ select: RestaurantSelectObjectSchema.optional(), include: RestaurantIncludeObjectSchema.optional(), where: RestaurantWhereUniqueInputObjectSchema }).strict();