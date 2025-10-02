import { z } from 'zod';
import { RestaurantUpdateManyMutationInputObjectSchema } from './objects/RestaurantUpdateManyMutationInput.schema';
import { RestaurantWhereInputObjectSchema } from './objects/RestaurantWhereInput.schema';

export const RestaurantUpdateManySchema = z.object({ data: RestaurantUpdateManyMutationInputObjectSchema, where: RestaurantWhereInputObjectSchema.optional()  })