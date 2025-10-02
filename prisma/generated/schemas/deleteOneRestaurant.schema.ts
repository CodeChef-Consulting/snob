import { z } from 'zod';
import { RestaurantSelectObjectSchema } from './objects/RestaurantSelect.schema';
import { RestaurantIncludeObjectSchema } from './objects/RestaurantInclude.schema';
import { RestaurantWhereUniqueInputObjectSchema } from './objects/RestaurantWhereUniqueInput.schema';

export const RestaurantDeleteOneSchema = z.object({ select: RestaurantSelectObjectSchema.optional(), include: RestaurantIncludeObjectSchema.optional(), where: RestaurantWhereUniqueInputObjectSchema  })