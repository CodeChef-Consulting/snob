import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RestaurantGroupIncludeObjectSchema as RestaurantGroupIncludeObjectSchema } from './objects/RestaurantGroupInclude.schema';
import { RestaurantGroupOrderByWithRelationInputObjectSchema as RestaurantGroupOrderByWithRelationInputObjectSchema } from './objects/RestaurantGroupOrderByWithRelationInput.schema';
import { RestaurantGroupWhereInputObjectSchema as RestaurantGroupWhereInputObjectSchema } from './objects/RestaurantGroupWhereInput.schema';
import { RestaurantGroupWhereUniqueInputObjectSchema as RestaurantGroupWhereUniqueInputObjectSchema } from './objects/RestaurantGroupWhereUniqueInput.schema';
import { RestaurantGroupScalarFieldEnumSchema } from './enums/RestaurantGroupScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const RestaurantGroupFindFirstSelectSchema: z.ZodType<Prisma.RestaurantGroupSelect> = z.object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    rawScore: z.boolean().optional(),
    normalizedScore: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    locations: z.boolean().optional(),
    posts: z.boolean().optional(),
    comments: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.RestaurantGroupSelect>;

export const RestaurantGroupFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    rawScore: z.boolean().optional(),
    normalizedScore: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    locations: z.boolean().optional(),
    posts: z.boolean().optional(),
    comments: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const RestaurantGroupFindFirstSchema: z.ZodType<Prisma.RestaurantGroupFindFirstArgs> = z.object({ select: RestaurantGroupFindFirstSelectSchema.optional(), include: z.lazy(() => RestaurantGroupIncludeObjectSchema.optional()), orderBy: z.union([RestaurantGroupOrderByWithRelationInputObjectSchema, RestaurantGroupOrderByWithRelationInputObjectSchema.array()]).optional(), where: RestaurantGroupWhereInputObjectSchema.optional(), cursor: RestaurantGroupWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([RestaurantGroupScalarFieldEnumSchema, RestaurantGroupScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.RestaurantGroupFindFirstArgs>;

export const RestaurantGroupFindFirstZodSchema = z.object({ select: RestaurantGroupFindFirstSelectSchema.optional(), include: z.lazy(() => RestaurantGroupIncludeObjectSchema.optional()), orderBy: z.union([RestaurantGroupOrderByWithRelationInputObjectSchema, RestaurantGroupOrderByWithRelationInputObjectSchema.array()]).optional(), where: RestaurantGroupWhereInputObjectSchema.optional(), cursor: RestaurantGroupWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([RestaurantGroupScalarFieldEnumSchema, RestaurantGroupScalarFieldEnumSchema.array()]).optional() }).strict();