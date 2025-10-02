import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantCreateWithoutScrapeSessionsInputObjectSchema as RestaurantCreateWithoutScrapeSessionsInputObjectSchema } from './RestaurantCreateWithoutScrapeSessionsInput.schema';
import { RestaurantUncheckedCreateWithoutScrapeSessionsInputObjectSchema as RestaurantUncheckedCreateWithoutScrapeSessionsInputObjectSchema } from './RestaurantUncheckedCreateWithoutScrapeSessionsInput.schema';
import { RestaurantCreateOrConnectWithoutScrapeSessionsInputObjectSchema as RestaurantCreateOrConnectWithoutScrapeSessionsInputObjectSchema } from './RestaurantCreateOrConnectWithoutScrapeSessionsInput.schema';
import { RestaurantWhereUniqueInputObjectSchema as RestaurantWhereUniqueInputObjectSchema } from './RestaurantWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => RestaurantCreateWithoutScrapeSessionsInputObjectSchema), z.lazy(() => RestaurantUncheckedCreateWithoutScrapeSessionsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => RestaurantCreateOrConnectWithoutScrapeSessionsInputObjectSchema).optional(),
  connect: z.lazy(() => RestaurantWhereUniqueInputObjectSchema).optional()
}).strict();
export const RestaurantCreateNestedOneWithoutScrapeSessionsInputObjectSchema: z.ZodType<Prisma.RestaurantCreateNestedOneWithoutScrapeSessionsInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantCreateNestedOneWithoutScrapeSessionsInput>;
export const RestaurantCreateNestedOneWithoutScrapeSessionsInputObjectZodSchema = makeSchema();
