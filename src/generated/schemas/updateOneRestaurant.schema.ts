import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { RestaurantSelectObjectSchema as RestaurantSelectObjectSchema } from './objects/RestaurantSelect.schema';
import { RestaurantIncludeObjectSchema as RestaurantIncludeObjectSchema } from './objects/RestaurantInclude.schema';
import { RestaurantUpdateInputObjectSchema as RestaurantUpdateInputObjectSchema } from './objects/RestaurantUpdateInput.schema';
import { RestaurantUncheckedUpdateInputObjectSchema as RestaurantUncheckedUpdateInputObjectSchema } from './objects/RestaurantUncheckedUpdateInput.schema';
import { RestaurantWhereUniqueInputObjectSchema as RestaurantWhereUniqueInputObjectSchema } from './objects/RestaurantWhereUniqueInput.schema';

export const RestaurantUpdateOneSchema: z.ZodType<Prisma.RestaurantUpdateArgs> = z.object({ select: RestaurantSelectObjectSchema.optional(), include: RestaurantIncludeObjectSchema.optional(), data: z.union([RestaurantUpdateInputObjectSchema, RestaurantUncheckedUpdateInputObjectSchema]), where: RestaurantWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.RestaurantUpdateArgs>;

export const RestaurantUpdateOneZodSchema = z.object({ select: RestaurantSelectObjectSchema.optional(), include: RestaurantIncludeObjectSchema.optional(), data: z.union([RestaurantUpdateInputObjectSchema, RestaurantUncheckedUpdateInputObjectSchema]), where: RestaurantWhereUniqueInputObjectSchema }).strict();