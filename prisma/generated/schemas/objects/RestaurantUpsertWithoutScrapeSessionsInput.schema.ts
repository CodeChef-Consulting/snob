import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantUpdateWithoutScrapeSessionsInputObjectSchema as RestaurantUpdateWithoutScrapeSessionsInputObjectSchema } from './RestaurantUpdateWithoutScrapeSessionsInput.schema';
import { RestaurantUncheckedUpdateWithoutScrapeSessionsInputObjectSchema as RestaurantUncheckedUpdateWithoutScrapeSessionsInputObjectSchema } from './RestaurantUncheckedUpdateWithoutScrapeSessionsInput.schema';
import { RestaurantCreateWithoutScrapeSessionsInputObjectSchema as RestaurantCreateWithoutScrapeSessionsInputObjectSchema } from './RestaurantCreateWithoutScrapeSessionsInput.schema';
import { RestaurantUncheckedCreateWithoutScrapeSessionsInputObjectSchema as RestaurantUncheckedCreateWithoutScrapeSessionsInputObjectSchema } from './RestaurantUncheckedCreateWithoutScrapeSessionsInput.schema';
import { RestaurantWhereInputObjectSchema as RestaurantWhereInputObjectSchema } from './RestaurantWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => RestaurantUpdateWithoutScrapeSessionsInputObjectSchema), z.lazy(() => RestaurantUncheckedUpdateWithoutScrapeSessionsInputObjectSchema)]),
  create: z.union([z.lazy(() => RestaurantCreateWithoutScrapeSessionsInputObjectSchema), z.lazy(() => RestaurantUncheckedCreateWithoutScrapeSessionsInputObjectSchema)]),
  where: z.lazy(() => RestaurantWhereInputObjectSchema).optional()
}).strict();
export const RestaurantUpsertWithoutScrapeSessionsInputObjectSchema: z.ZodType<Prisma.RestaurantUpsertWithoutScrapeSessionsInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantUpsertWithoutScrapeSessionsInput>;
export const RestaurantUpsertWithoutScrapeSessionsInputObjectZodSchema = makeSchema();
