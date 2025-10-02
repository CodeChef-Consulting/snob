import { z } from 'zod';
import { RestaurantSelectObjectSchema } from './objects/RestaurantSelect.schema';
import { RestaurantCreateManyInputObjectSchema } from './objects/RestaurantCreateManyInput.schema';

export const RestaurantCreateManyAndReturnSchema = z.object({ select: RestaurantSelectObjectSchema.optional(), data: z.union([ RestaurantCreateManyInputObjectSchema, z.array(RestaurantCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict()