import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RestaurantGroupSelectObjectSchema as RestaurantGroupSelectObjectSchema } from './objects/RestaurantGroupSelect.schema';
import { RestaurantGroupIncludeObjectSchema as RestaurantGroupIncludeObjectSchema } from './objects/RestaurantGroupInclude.schema';
import { RestaurantGroupUpdateInputObjectSchema as RestaurantGroupUpdateInputObjectSchema } from './objects/RestaurantGroupUpdateInput.schema';
import { RestaurantGroupUncheckedUpdateInputObjectSchema as RestaurantGroupUncheckedUpdateInputObjectSchema } from './objects/RestaurantGroupUncheckedUpdateInput.schema';
import { RestaurantGroupWhereUniqueInputObjectSchema as RestaurantGroupWhereUniqueInputObjectSchema } from './objects/RestaurantGroupWhereUniqueInput.schema';

export const RestaurantGroupUpdateOneSchema: z.ZodType<Prisma.RestaurantGroupUpdateArgs> = z.object({ select: RestaurantGroupSelectObjectSchema.optional(), include: RestaurantGroupIncludeObjectSchema.optional(), data: z.union([RestaurantGroupUpdateInputObjectSchema, RestaurantGroupUncheckedUpdateInputObjectSchema]), where: RestaurantGroupWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.RestaurantGroupUpdateArgs>;

export const RestaurantGroupUpdateOneZodSchema = z.object({ select: RestaurantGroupSelectObjectSchema.optional(), include: RestaurantGroupIncludeObjectSchema.optional(), data: z.union([RestaurantGroupUpdateInputObjectSchema, RestaurantGroupUncheckedUpdateInputObjectSchema]), where: RestaurantGroupWhereUniqueInputObjectSchema }).strict();