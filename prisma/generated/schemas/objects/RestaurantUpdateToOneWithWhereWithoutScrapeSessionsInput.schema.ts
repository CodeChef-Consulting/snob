import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantWhereInputObjectSchema as RestaurantWhereInputObjectSchema } from './RestaurantWhereInput.schema';
import { RestaurantUpdateWithoutScrapeSessionsInputObjectSchema as RestaurantUpdateWithoutScrapeSessionsInputObjectSchema } from './RestaurantUpdateWithoutScrapeSessionsInput.schema';
import { RestaurantUncheckedUpdateWithoutScrapeSessionsInputObjectSchema as RestaurantUncheckedUpdateWithoutScrapeSessionsInputObjectSchema } from './RestaurantUncheckedUpdateWithoutScrapeSessionsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RestaurantWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => RestaurantUpdateWithoutScrapeSessionsInputObjectSchema), z.lazy(() => RestaurantUncheckedUpdateWithoutScrapeSessionsInputObjectSchema)])
}).strict();
export const RestaurantUpdateToOneWithWhereWithoutScrapeSessionsInputObjectSchema: z.ZodType<Prisma.RestaurantUpdateToOneWithWhereWithoutScrapeSessionsInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantUpdateToOneWithWhereWithoutScrapeSessionsInput>;
export const RestaurantUpdateToOneWithWhereWithoutScrapeSessionsInputObjectZodSchema = makeSchema();
