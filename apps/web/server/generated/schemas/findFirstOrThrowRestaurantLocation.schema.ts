import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RestaurantLocationIncludeObjectSchema as RestaurantLocationIncludeObjectSchema } from './objects/RestaurantLocationInclude.schema';
import { RestaurantLocationOrderByWithRelationInputObjectSchema as RestaurantLocationOrderByWithRelationInputObjectSchema } from './objects/RestaurantLocationOrderByWithRelationInput.schema';
import { RestaurantLocationWhereInputObjectSchema as RestaurantLocationWhereInputObjectSchema } from './objects/RestaurantLocationWhereInput.schema';
import { RestaurantLocationWhereUniqueInputObjectSchema as RestaurantLocationWhereUniqueInputObjectSchema } from './objects/RestaurantLocationWhereUniqueInput.schema';
import { RestaurantLocationScalarFieldEnumSchema } from './enums/RestaurantLocationScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const RestaurantLocationFindFirstOrThrowSelectSchema: z.ZodType<Prisma.RestaurantLocationSelect> = z.object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    address: z.boolean().optional(),
    city: z.boolean().optional(),
    state: z.boolean().optional(),
    zipCode: z.boolean().optional(),
    latitude: z.boolean().optional(),
    longitude: z.boolean().optional(),
    source: z.boolean().optional(),
    googlePlaceId: z.boolean().optional(),
    lookupAliases: z.boolean().optional(),
    metadata: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    group: z.boolean().optional(),
    groupId: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.RestaurantLocationSelect>;

export const RestaurantLocationFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    address: z.boolean().optional(),
    city: z.boolean().optional(),
    state: z.boolean().optional(),
    zipCode: z.boolean().optional(),
    latitude: z.boolean().optional(),
    longitude: z.boolean().optional(),
    source: z.boolean().optional(),
    googlePlaceId: z.boolean().optional(),
    lookupAliases: z.boolean().optional(),
    metadata: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    group: z.boolean().optional(),
    groupId: z.boolean().optional()
  }).strict();

export const RestaurantLocationFindFirstOrThrowSchema: z.ZodType<Prisma.RestaurantLocationFindFirstOrThrowArgs> = z.object({ select: RestaurantLocationFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => RestaurantLocationIncludeObjectSchema.optional()), orderBy: z.union([RestaurantLocationOrderByWithRelationInputObjectSchema, RestaurantLocationOrderByWithRelationInputObjectSchema.array()]).optional(), where: RestaurantLocationWhereInputObjectSchema.optional(), cursor: RestaurantLocationWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([RestaurantLocationScalarFieldEnumSchema, RestaurantLocationScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.RestaurantLocationFindFirstOrThrowArgs>;

export const RestaurantLocationFindFirstOrThrowZodSchema = z.object({ select: RestaurantLocationFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => RestaurantLocationIncludeObjectSchema.optional()), orderBy: z.union([RestaurantLocationOrderByWithRelationInputObjectSchema, RestaurantLocationOrderByWithRelationInputObjectSchema.array()]).optional(), where: RestaurantLocationWhereInputObjectSchema.optional(), cursor: RestaurantLocationWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([RestaurantLocationScalarFieldEnumSchema, RestaurantLocationScalarFieldEnumSchema.array()]).optional() }).strict();