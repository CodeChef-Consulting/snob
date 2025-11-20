import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RestaurantGroupSelectObjectSchema as RestaurantGroupSelectObjectSchema } from './objects/RestaurantGroupSelect.schema';
import { RestaurantGroupIncludeObjectSchema as RestaurantGroupIncludeObjectSchema } from './objects/RestaurantGroupInclude.schema';
import { RestaurantGroupCreateInputObjectSchema as RestaurantGroupCreateInputObjectSchema } from './objects/RestaurantGroupCreateInput.schema';
import { RestaurantGroupUncheckedCreateInputObjectSchema as RestaurantGroupUncheckedCreateInputObjectSchema } from './objects/RestaurantGroupUncheckedCreateInput.schema';

export const RestaurantGroupCreateOneSchema: z.ZodType<Prisma.RestaurantGroupCreateArgs> = z.object({ select: RestaurantGroupSelectObjectSchema.optional(), include: RestaurantGroupIncludeObjectSchema.optional(), data: z.union([RestaurantGroupCreateInputObjectSchema, RestaurantGroupUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.RestaurantGroupCreateArgs>;

export const RestaurantGroupCreateOneZodSchema = z.object({ select: RestaurantGroupSelectObjectSchema.optional(), include: RestaurantGroupIncludeObjectSchema.optional(), data: z.union([RestaurantGroupCreateInputObjectSchema, RestaurantGroupUncheckedCreateInputObjectSchema]) }).strict();