import { z } from 'zod';
import { RestaurantWhereInputObjectSchema } from './objects/RestaurantWhereInput.schema';

export const RestaurantDeleteManySchema = z.object({ where: RestaurantWhereInputObjectSchema.optional()  })