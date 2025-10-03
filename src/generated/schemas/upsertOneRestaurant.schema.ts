import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { RestaurantSelectObjectSchema as RestaurantSelectObjectSchema } from './objects/RestaurantSelect.schema';
import { RestaurantIncludeObjectSchema as RestaurantIncludeObjectSchema } from './objects/RestaurantInclude.schema';
import { RestaurantWhereUniqueInputObjectSchema as RestaurantWhereUniqueInputObjectSchema } from './objects/RestaurantWhereUniqueInput.schema';
import { RestaurantCreateInputObjectSchema as RestaurantCreateInputObjectSchema } from './objects/RestaurantCreateInput.schema';
import { RestaurantUncheckedCreateInputObjectSchema as RestaurantUncheckedCreateInputObjectSchema } from './objects/RestaurantUncheckedCreateInput.schema';
import { RestaurantUpdateInputObjectSchema as RestaurantUpdateInputObjectSchema } from './objects/RestaurantUpdateInput.schema';
import { RestaurantUncheckedUpdateInputObjectSchema as RestaurantUncheckedUpdateInputObjectSchema } from './objects/RestaurantUncheckedUpdateInput.schema';

export const RestaurantUpsertOneSchema: z.ZodType<Prisma.RestaurantUpsertArgs> = z.object({ select: RestaurantSelectObjectSchema.optional(), include: RestaurantIncludeObjectSchema.optional(), where: RestaurantWhereUniqueInputObjectSchema, create: z.union([ RestaurantCreateInputObjectSchema, RestaurantUncheckedCreateInputObjectSchema ]), update: z.union([ RestaurantUpdateInputObjectSchema, RestaurantUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.RestaurantUpsertArgs>;

export const RestaurantUpsertOneZodSchema = z.object({ select: RestaurantSelectObjectSchema.optional(), include: RestaurantIncludeObjectSchema.optional(), where: RestaurantWhereUniqueInputObjectSchema, create: z.union([ RestaurantCreateInputObjectSchema, RestaurantUncheckedCreateInputObjectSchema ]), update: z.union([ RestaurantUpdateInputObjectSchema, RestaurantUncheckedUpdateInputObjectSchema ]) }).strict();