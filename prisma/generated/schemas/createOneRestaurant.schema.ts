import { z } from 'zod';
import { RestaurantSelectObjectSchema } from './objects/RestaurantSelect.schema';
import { RestaurantIncludeObjectSchema } from './objects/RestaurantInclude.schema';
import { RestaurantCreateInputObjectSchema } from './objects/RestaurantCreateInput.schema';
import { RestaurantUncheckedCreateInputObjectSchema } from './objects/RestaurantUncheckedCreateInput.schema';

export const RestaurantCreateOneSchema = z.object({ select: RestaurantSelectObjectSchema.optional(), include: RestaurantIncludeObjectSchema.optional(), data: z.union([RestaurantCreateInputObjectSchema, RestaurantUncheckedCreateInputObjectSchema])  })