import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { RestaurantOrderByWithRelationInputObjectSchema } from './objects/RestaurantOrderByWithRelationInput.schema';
import { RestaurantWhereInputObjectSchema } from './objects/RestaurantWhereInput.schema';
import { RestaurantWhereUniqueInputObjectSchema } from './objects/RestaurantWhereUniqueInput.schema';
import { RestaurantCountAggregateInputObjectSchema } from './objects/RestaurantCountAggregateInput.schema';

export const RestaurantCountSchema: z.ZodType<Prisma.RestaurantCountArgs> = z.object({ orderBy: z.union([RestaurantOrderByWithRelationInputObjectSchema, RestaurantOrderByWithRelationInputObjectSchema.array()]).optional(), where: RestaurantWhereInputObjectSchema.optional(), cursor: RestaurantWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), RestaurantCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.RestaurantCountArgs>;

export const RestaurantCountZodSchema = z.object({ orderBy: z.union([RestaurantOrderByWithRelationInputObjectSchema, RestaurantOrderByWithRelationInputObjectSchema.array()]).optional(), where: RestaurantWhereInputObjectSchema.optional(), cursor: RestaurantWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), RestaurantCountAggregateInputObjectSchema ]).optional() }).strict();