import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RestaurantLocationSelectObjectSchema as RestaurantLocationSelectObjectSchema } from './objects/RestaurantLocationSelect.schema';
import { RestaurantLocationIncludeObjectSchema as RestaurantLocationIncludeObjectSchema } from './objects/RestaurantLocationInclude.schema';
import { RestaurantLocationCreateInputObjectSchema as RestaurantLocationCreateInputObjectSchema } from './objects/RestaurantLocationCreateInput.schema';
import { RestaurantLocationUncheckedCreateInputObjectSchema as RestaurantLocationUncheckedCreateInputObjectSchema } from './objects/RestaurantLocationUncheckedCreateInput.schema';

export const RestaurantLocationCreateOneSchema: z.ZodType<Prisma.RestaurantLocationCreateArgs> = z.object({ select: RestaurantLocationSelectObjectSchema.optional(), include: RestaurantLocationIncludeObjectSchema.optional(), data: z.union([RestaurantLocationCreateInputObjectSchema, RestaurantLocationUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.RestaurantLocationCreateArgs>;

export const RestaurantLocationCreateOneZodSchema = z.object({ select: RestaurantLocationSelectObjectSchema.optional(), include: RestaurantLocationIncludeObjectSchema.optional(), data: z.union([RestaurantLocationCreateInputObjectSchema, RestaurantLocationUncheckedCreateInputObjectSchema]) }).strict();