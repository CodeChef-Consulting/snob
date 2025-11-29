import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { RestaurantGroupOrderByWithRelationInputObjectSchema as RestaurantGroupOrderByWithRelationInputObjectSchema } from './objects/RestaurantGroupOrderByWithRelationInput.schema';
import { RestaurantGroupWhereInputObjectSchema as RestaurantGroupWhereInputObjectSchema } from './objects/RestaurantGroupWhereInput.schema';
import { RestaurantGroupWhereUniqueInputObjectSchema as RestaurantGroupWhereUniqueInputObjectSchema } from './objects/RestaurantGroupWhereUniqueInput.schema';
import { RestaurantGroupCountAggregateInputObjectSchema as RestaurantGroupCountAggregateInputObjectSchema } from './objects/RestaurantGroupCountAggregateInput.schema';

export const RestaurantGroupCountSchema: z.ZodType<Prisma.RestaurantGroupCountArgs> = z.object({ orderBy: z.union([RestaurantGroupOrderByWithRelationInputObjectSchema, RestaurantGroupOrderByWithRelationInputObjectSchema.array()]).optional(), where: RestaurantGroupWhereInputObjectSchema.optional(), cursor: RestaurantGroupWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), RestaurantGroupCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.RestaurantGroupCountArgs>;

export const RestaurantGroupCountZodSchema = z.object({ orderBy: z.union([RestaurantGroupOrderByWithRelationInputObjectSchema, RestaurantGroupOrderByWithRelationInputObjectSchema.array()]).optional(), where: RestaurantGroupWhereInputObjectSchema.optional(), cursor: RestaurantGroupWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), RestaurantGroupCountAggregateInputObjectSchema ]).optional() }).strict();