import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantWhereUniqueInputObjectSchema as RestaurantWhereUniqueInputObjectSchema } from './RestaurantWhereUniqueInput.schema';
import { RestaurantCreateWithoutScrapeSessionsInputObjectSchema as RestaurantCreateWithoutScrapeSessionsInputObjectSchema } from './RestaurantCreateWithoutScrapeSessionsInput.schema';
import { RestaurantUncheckedCreateWithoutScrapeSessionsInputObjectSchema as RestaurantUncheckedCreateWithoutScrapeSessionsInputObjectSchema } from './RestaurantUncheckedCreateWithoutScrapeSessionsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RestaurantWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => RestaurantCreateWithoutScrapeSessionsInputObjectSchema), z.lazy(() => RestaurantUncheckedCreateWithoutScrapeSessionsInputObjectSchema)])
}).strict();
export const RestaurantCreateOrConnectWithoutScrapeSessionsInputObjectSchema: z.ZodType<Prisma.RestaurantCreateOrConnectWithoutScrapeSessionsInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantCreateOrConnectWithoutScrapeSessionsInput>;
export const RestaurantCreateOrConnectWithoutScrapeSessionsInputObjectZodSchema = makeSchema();
