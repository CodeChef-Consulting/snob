import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { RestaurantWhereInputObjectSchema } from './objects/RestaurantWhereInput.schema';
import { RestaurantOrderByWithAggregationInputObjectSchema } from './objects/RestaurantOrderByWithAggregationInput.schema';
import { RestaurantScalarWhereWithAggregatesInputObjectSchema } from './objects/RestaurantScalarWhereWithAggregatesInput.schema';
import { RestaurantScalarFieldEnumSchema } from './enums/RestaurantScalarFieldEnum.schema';
import { RestaurantCountAggregateInputObjectSchema } from './objects/RestaurantCountAggregateInput.schema';
import { RestaurantMinAggregateInputObjectSchema } from './objects/RestaurantMinAggregateInput.schema';
import { RestaurantMaxAggregateInputObjectSchema } from './objects/RestaurantMaxAggregateInput.schema';
import { RestaurantAvgAggregateInputObjectSchema } from './objects/RestaurantAvgAggregateInput.schema';
import { RestaurantSumAggregateInputObjectSchema } from './objects/RestaurantSumAggregateInput.schema';

export const RestaurantGroupBySchema: z.ZodType<Prisma.RestaurantGroupByArgs> = z.object({ where: RestaurantWhereInputObjectSchema.optional(), orderBy: z.union([RestaurantOrderByWithAggregationInputObjectSchema, RestaurantOrderByWithAggregationInputObjectSchema.array()]).optional(), having: RestaurantScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(RestaurantScalarFieldEnumSchema), _count: z.union([ z.literal(true), RestaurantCountAggregateInputObjectSchema ]).optional(), _min: RestaurantMinAggregateInputObjectSchema.optional(), _max: RestaurantMaxAggregateInputObjectSchema.optional(), _avg: RestaurantAvgAggregateInputObjectSchema.optional(), _sum: RestaurantSumAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.RestaurantGroupByArgs>;

export const RestaurantGroupByZodSchema = z.object({ where: RestaurantWhereInputObjectSchema.optional(), orderBy: z.union([RestaurantOrderByWithAggregationInputObjectSchema, RestaurantOrderByWithAggregationInputObjectSchema.array()]).optional(), having: RestaurantScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(RestaurantScalarFieldEnumSchema), _count: z.union([ z.literal(true), RestaurantCountAggregateInputObjectSchema ]).optional(), _min: RestaurantMinAggregateInputObjectSchema.optional(), _max: RestaurantMaxAggregateInputObjectSchema.optional(), _avg: RestaurantAvgAggregateInputObjectSchema.optional(), _sum: RestaurantSumAggregateInputObjectSchema.optional() }).strict();