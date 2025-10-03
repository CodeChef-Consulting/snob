import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RestaurantSelectObjectSchema as RestaurantSelectObjectSchema } from './objects/RestaurantSelect.schema';
import { RestaurantIncludeObjectSchema as RestaurantIncludeObjectSchema } from './objects/RestaurantInclude.schema';
import { RestaurantCreateInputObjectSchema as RestaurantCreateInputObjectSchema } from './objects/RestaurantCreateInput.schema';
import { RestaurantUncheckedCreateInputObjectSchema as RestaurantUncheckedCreateInputObjectSchema } from './objects/RestaurantUncheckedCreateInput.schema';

export const RestaurantCreateOneSchema: z.ZodType<Prisma.RestaurantCreateArgs> = z.object({ select: RestaurantSelectObjectSchema.optional(), include: RestaurantIncludeObjectSchema.optional(), data: z.union([RestaurantCreateInputObjectSchema, RestaurantUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.RestaurantCreateArgs>;

export const RestaurantCreateOneZodSchema = z.object({ select: RestaurantSelectObjectSchema.optional(), include: RestaurantIncludeObjectSchema.optional(), data: z.union([RestaurantCreateInputObjectSchema, RestaurantUncheckedCreateInputObjectSchema]) }).strict();