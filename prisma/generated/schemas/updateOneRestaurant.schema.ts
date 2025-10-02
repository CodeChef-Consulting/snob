import { z } from 'zod';
import { RestaurantSelectObjectSchema } from './objects/RestaurantSelect.schema';
import { RestaurantIncludeObjectSchema } from './objects/RestaurantInclude.schema';
import { RestaurantUpdateInputObjectSchema } from './objects/RestaurantUpdateInput.schema';
import { RestaurantUncheckedUpdateInputObjectSchema } from './objects/RestaurantUncheckedUpdateInput.schema';
import { RestaurantWhereUniqueInputObjectSchema } from './objects/RestaurantWhereUniqueInput.schema';

export const RestaurantUpdateOneSchema = z.object({ select: RestaurantSelectObjectSchema.optional(), include: RestaurantIncludeObjectSchema.optional(), data: z.union([RestaurantUpdateInputObjectSchema, RestaurantUncheckedUpdateInputObjectSchema]), where: RestaurantWhereUniqueInputObjectSchema  })