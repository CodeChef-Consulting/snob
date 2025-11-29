import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RestaurantLocationSelectObjectSchema as RestaurantLocationSelectObjectSchema } from './objects/RestaurantLocationSelect.schema';
import { RestaurantLocationIncludeObjectSchema as RestaurantLocationIncludeObjectSchema } from './objects/RestaurantLocationInclude.schema';
import { RestaurantLocationWhereUniqueInputObjectSchema as RestaurantLocationWhereUniqueInputObjectSchema } from './objects/RestaurantLocationWhereUniqueInput.schema';

export const RestaurantLocationFindUniqueOrThrowSchema: z.ZodType<Prisma.RestaurantLocationFindUniqueOrThrowArgs> = z.object({ select: RestaurantLocationSelectObjectSchema.optional(), include: RestaurantLocationIncludeObjectSchema.optional(), where: RestaurantLocationWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.RestaurantLocationFindUniqueOrThrowArgs>;

export const RestaurantLocationFindUniqueOrThrowZodSchema = z.object({ select: RestaurantLocationSelectObjectSchema.optional(), include: RestaurantLocationIncludeObjectSchema.optional(), where: RestaurantLocationWhereUniqueInputObjectSchema }).strict();