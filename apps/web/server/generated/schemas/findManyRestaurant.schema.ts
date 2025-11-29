import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RestaurantIncludeObjectSchema as RestaurantIncludeObjectSchema } from './objects/RestaurantInclude.schema';
import { RestaurantOrderByWithRelationInputObjectSchema as RestaurantOrderByWithRelationInputObjectSchema } from './objects/RestaurantOrderByWithRelationInput.schema';
import { RestaurantWhereInputObjectSchema as RestaurantWhereInputObjectSchema } from './objects/RestaurantWhereInput.schema';
import { RestaurantWhereUniqueInputObjectSchema as RestaurantWhereUniqueInputObjectSchema } from './objects/RestaurantWhereUniqueInput.schema';
import { RestaurantScalarFieldEnumSchema } from './enums/RestaurantScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const RestaurantFindManySelectSchema: z.ZodType<Prisma.RestaurantSelect> = z.object({
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
    rawScore: z.boolean().optional(),
    normalizedScore: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    posts: z.boolean().optional(),
    comments: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.RestaurantSelect>;

export const RestaurantFindManySelectZodSchema = z.object({
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
    rawScore: z.boolean().optional(),
    normalizedScore: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    posts: z.boolean().optional(),
    comments: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const RestaurantFindManySchema: z.ZodType<Prisma.RestaurantFindManyArgs> = z.object({ select: RestaurantFindManySelectSchema.optional(), include: z.lazy(() => RestaurantIncludeObjectSchema.optional()), orderBy: z.union([RestaurantOrderByWithRelationInputObjectSchema, RestaurantOrderByWithRelationInputObjectSchema.array()]).optional(), where: RestaurantWhereInputObjectSchema.optional(), cursor: RestaurantWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([RestaurantScalarFieldEnumSchema, RestaurantScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.RestaurantFindManyArgs>;

export const RestaurantFindManyZodSchema = z.object({ select: RestaurantFindManySelectSchema.optional(), include: z.lazy(() => RestaurantIncludeObjectSchema.optional()), orderBy: z.union([RestaurantOrderByWithRelationInputObjectSchema, RestaurantOrderByWithRelationInputObjectSchema.array()]).optional(), where: RestaurantWhereInputObjectSchema.optional(), cursor: RestaurantWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([RestaurantScalarFieldEnumSchema, RestaurantScalarFieldEnumSchema.array()]).optional() }).strict();