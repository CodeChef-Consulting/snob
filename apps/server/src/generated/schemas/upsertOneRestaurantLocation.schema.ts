import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RestaurantLocationSelectObjectSchema as RestaurantLocationSelectObjectSchema } from './objects/RestaurantLocationSelect.schema';
import { RestaurantLocationIncludeObjectSchema as RestaurantLocationIncludeObjectSchema } from './objects/RestaurantLocationInclude.schema';
import { RestaurantLocationWhereUniqueInputObjectSchema as RestaurantLocationWhereUniqueInputObjectSchema } from './objects/RestaurantLocationWhereUniqueInput.schema';
import { RestaurantLocationCreateInputObjectSchema as RestaurantLocationCreateInputObjectSchema } from './objects/RestaurantLocationCreateInput.schema';
import { RestaurantLocationUncheckedCreateInputObjectSchema as RestaurantLocationUncheckedCreateInputObjectSchema } from './objects/RestaurantLocationUncheckedCreateInput.schema';
import { RestaurantLocationUpdateInputObjectSchema as RestaurantLocationUpdateInputObjectSchema } from './objects/RestaurantLocationUpdateInput.schema';
import { RestaurantLocationUncheckedUpdateInputObjectSchema as RestaurantLocationUncheckedUpdateInputObjectSchema } from './objects/RestaurantLocationUncheckedUpdateInput.schema';

export const RestaurantLocationUpsertOneSchema: z.ZodType<Prisma.RestaurantLocationUpsertArgs> = z.object({ select: RestaurantLocationSelectObjectSchema.optional(), include: RestaurantLocationIncludeObjectSchema.optional(), where: RestaurantLocationWhereUniqueInputObjectSchema, create: z.union([ RestaurantLocationCreateInputObjectSchema, RestaurantLocationUncheckedCreateInputObjectSchema ]), update: z.union([ RestaurantLocationUpdateInputObjectSchema, RestaurantLocationUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.RestaurantLocationUpsertArgs>;

export const RestaurantLocationUpsertOneZodSchema = z.object({ select: RestaurantLocationSelectObjectSchema.optional(), include: RestaurantLocationIncludeObjectSchema.optional(), where: RestaurantLocationWhereUniqueInputObjectSchema, create: z.union([ RestaurantLocationCreateInputObjectSchema, RestaurantLocationUncheckedCreateInputObjectSchema ]), update: z.union([ RestaurantLocationUpdateInputObjectSchema, RestaurantLocationUncheckedUpdateInputObjectSchema ]) }).strict();
// Alias for prisma-trpc-generator compatibility
export const RestaurantLocationUpsertSchema = RestaurantLocationUpsertOneSchema;
