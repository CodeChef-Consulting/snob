import { z } from 'zod';
import { RestaurantSelectObjectSchema } from './objects/RestaurantSelect.schema';
import { RestaurantUpdateManyMutationInputObjectSchema } from './objects/RestaurantUpdateManyMutationInput.schema';
import { RestaurantWhereInputObjectSchema } from './objects/RestaurantWhereInput.schema';

export const RestaurantUpdateManyAndReturnSchema = z.object({ select: RestaurantSelectObjectSchema.optional(), data: RestaurantUpdateManyMutationInputObjectSchema, where: RestaurantWhereInputObjectSchema.optional()  }).strict()