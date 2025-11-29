import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RestaurantGroupSelectObjectSchema as RestaurantGroupSelectObjectSchema } from './objects/RestaurantGroupSelect.schema';
import { RestaurantGroupIncludeObjectSchema as RestaurantGroupIncludeObjectSchema } from './objects/RestaurantGroupInclude.schema';
import { RestaurantGroupWhereUniqueInputObjectSchema as RestaurantGroupWhereUniqueInputObjectSchema } from './objects/RestaurantGroupWhereUniqueInput.schema';
import { RestaurantGroupCreateInputObjectSchema as RestaurantGroupCreateInputObjectSchema } from './objects/RestaurantGroupCreateInput.schema';
import { RestaurantGroupUncheckedCreateInputObjectSchema as RestaurantGroupUncheckedCreateInputObjectSchema } from './objects/RestaurantGroupUncheckedCreateInput.schema';
import { RestaurantGroupUpdateInputObjectSchema as RestaurantGroupUpdateInputObjectSchema } from './objects/RestaurantGroupUpdateInput.schema';
import { RestaurantGroupUncheckedUpdateInputObjectSchema as RestaurantGroupUncheckedUpdateInputObjectSchema } from './objects/RestaurantGroupUncheckedUpdateInput.schema';

export const RestaurantGroupUpsertOneSchema: z.ZodType<Prisma.RestaurantGroupUpsertArgs> = z.object({ select: RestaurantGroupSelectObjectSchema.optional(), include: RestaurantGroupIncludeObjectSchema.optional(), where: RestaurantGroupWhereUniqueInputObjectSchema, create: z.union([ RestaurantGroupCreateInputObjectSchema, RestaurantGroupUncheckedCreateInputObjectSchema ]), update: z.union([ RestaurantGroupUpdateInputObjectSchema, RestaurantGroupUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.RestaurantGroupUpsertArgs>;

export const RestaurantGroupUpsertOneZodSchema = z.object({ select: RestaurantGroupSelectObjectSchema.optional(), include: RestaurantGroupIncludeObjectSchema.optional(), where: RestaurantGroupWhereUniqueInputObjectSchema, create: z.union([ RestaurantGroupCreateInputObjectSchema, RestaurantGroupUncheckedCreateInputObjectSchema ]), update: z.union([ RestaurantGroupUpdateInputObjectSchema, RestaurantGroupUncheckedUpdateInputObjectSchema ]) }).strict();