import { z } from 'zod';
import { RestaurantCreateManyInputObjectSchema } from './objects/RestaurantCreateManyInput.schema';

export const RestaurantCreateManySchema = z.object({ data: z.union([ RestaurantCreateManyInputObjectSchema, z.array(RestaurantCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() })