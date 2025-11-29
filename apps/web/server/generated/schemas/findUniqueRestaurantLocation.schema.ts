import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RestaurantLocationSelectObjectSchema as RestaurantLocationSelectObjectSchema } from './objects/RestaurantLocationSelect.schema';
import { RestaurantLocationIncludeObjectSchema as RestaurantLocationIncludeObjectSchema } from './objects/RestaurantLocationInclude.schema';
import { RestaurantLocationWhereUniqueInputObjectSchema as RestaurantLocationWhereUniqueInputObjectSchema } from './objects/RestaurantLocationWhereUniqueInput.schema';

export const RestaurantLocationFindUniqueSchema: z.ZodType<Prisma.RestaurantLocationFindUniqueArgs> = z.object({ select: RestaurantLocationSelectObjectSchema.optional(), include: RestaurantLocationIncludeObjectSchema.optional(), where: RestaurantLocationWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.RestaurantLocationFindUniqueArgs>;

export const RestaurantLocationFindUniqueZodSchema = z.object({ select: RestaurantLocationSelectObjectSchema.optional(), include: RestaurantLocationIncludeObjectSchema.optional(), where: RestaurantLocationWhereUniqueInputObjectSchema }).strict();