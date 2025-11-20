import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RestaurantLocationSelectObjectSchema as RestaurantLocationSelectObjectSchema } from './objects/RestaurantLocationSelect.schema';
import { RestaurantLocationIncludeObjectSchema as RestaurantLocationIncludeObjectSchema } from './objects/RestaurantLocationInclude.schema';
import { RestaurantLocationUpdateInputObjectSchema as RestaurantLocationUpdateInputObjectSchema } from './objects/RestaurantLocationUpdateInput.schema';
import { RestaurantLocationUncheckedUpdateInputObjectSchema as RestaurantLocationUncheckedUpdateInputObjectSchema } from './objects/RestaurantLocationUncheckedUpdateInput.schema';
import { RestaurantLocationWhereUniqueInputObjectSchema as RestaurantLocationWhereUniqueInputObjectSchema } from './objects/RestaurantLocationWhereUniqueInput.schema';

export const RestaurantLocationUpdateOneSchema: z.ZodType<Prisma.RestaurantLocationUpdateArgs> = z.object({ select: RestaurantLocationSelectObjectSchema.optional(), include: RestaurantLocationIncludeObjectSchema.optional(), data: z.union([RestaurantLocationUpdateInputObjectSchema, RestaurantLocationUncheckedUpdateInputObjectSchema]), where: RestaurantLocationWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.RestaurantLocationUpdateArgs>;

export const RestaurantLocationUpdateOneZodSchema = z.object({ select: RestaurantLocationSelectObjectSchema.optional(), include: RestaurantLocationIncludeObjectSchema.optional(), data: z.union([RestaurantLocationUpdateInputObjectSchema, RestaurantLocationUncheckedUpdateInputObjectSchema]), where: RestaurantLocationWhereUniqueInputObjectSchema }).strict();