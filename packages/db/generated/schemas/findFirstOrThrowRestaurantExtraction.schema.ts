import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RestaurantExtractionIncludeObjectSchema as RestaurantExtractionIncludeObjectSchema } from './objects/RestaurantExtractionInclude.schema';
import { RestaurantExtractionOrderByWithRelationInputObjectSchema as RestaurantExtractionOrderByWithRelationInputObjectSchema } from './objects/RestaurantExtractionOrderByWithRelationInput.schema';
import { RestaurantExtractionWhereInputObjectSchema as RestaurantExtractionWhereInputObjectSchema } from './objects/RestaurantExtractionWhereInput.schema';
import { RestaurantExtractionWhereUniqueInputObjectSchema as RestaurantExtractionWhereUniqueInputObjectSchema } from './objects/RestaurantExtractionWhereUniqueInput.schema';
import { RestaurantExtractionScalarFieldEnumSchema } from './enums/RestaurantExtractionScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const RestaurantExtractionFindFirstOrThrowSelectSchema: z.ZodType<Prisma.RestaurantExtractionSelect> = z.object({
    id: z.boolean().optional(),
    post: z.boolean().optional(),
    postId: z.boolean().optional(),
    comment: z.boolean().optional(),
    commentId: z.boolean().optional(),
    restaurantsMentioned: z.boolean().optional(),
    primaryRestaurant: z.boolean().optional(),
    dishesMentioned: z.boolean().optional(),
    isSubjective: z.boolean().optional(),
    attemptedLinkToRestaurantsMentioned: z.boolean().optional(),
    extractedAt: z.boolean().optional(),
    model: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.RestaurantExtractionSelect>;

export const RestaurantExtractionFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    post: z.boolean().optional(),
    postId: z.boolean().optional(),
    comment: z.boolean().optional(),
    commentId: z.boolean().optional(),
    restaurantsMentioned: z.boolean().optional(),
    primaryRestaurant: z.boolean().optional(),
    dishesMentioned: z.boolean().optional(),
    isSubjective: z.boolean().optional(),
    attemptedLinkToRestaurantsMentioned: z.boolean().optional(),
    extractedAt: z.boolean().optional(),
    model: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const RestaurantExtractionFindFirstOrThrowSchema: z.ZodType<Prisma.RestaurantExtractionFindFirstOrThrowArgs> = z.object({ select: RestaurantExtractionFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => RestaurantExtractionIncludeObjectSchema.optional()), orderBy: z.union([RestaurantExtractionOrderByWithRelationInputObjectSchema, RestaurantExtractionOrderByWithRelationInputObjectSchema.array()]).optional(), where: RestaurantExtractionWhereInputObjectSchema.optional(), cursor: RestaurantExtractionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([RestaurantExtractionScalarFieldEnumSchema, RestaurantExtractionScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.RestaurantExtractionFindFirstOrThrowArgs>;

export const RestaurantExtractionFindFirstOrThrowZodSchema = z.object({ select: RestaurantExtractionFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => RestaurantExtractionIncludeObjectSchema.optional()), orderBy: z.union([RestaurantExtractionOrderByWithRelationInputObjectSchema, RestaurantExtractionOrderByWithRelationInputObjectSchema.array()]).optional(), where: RestaurantExtractionWhereInputObjectSchema.optional(), cursor: RestaurantExtractionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([RestaurantExtractionScalarFieldEnumSchema, RestaurantExtractionScalarFieldEnumSchema.array()]).optional() }).strict();