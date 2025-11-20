import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const RestaurantLocationOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.RestaurantLocationOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantLocationOrderByRelationAggregateInput>;
export const RestaurantLocationOrderByRelationAggregateInputObjectZodSchema = makeSchema();
