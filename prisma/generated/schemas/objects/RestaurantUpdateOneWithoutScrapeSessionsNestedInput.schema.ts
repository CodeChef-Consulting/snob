import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantCreateWithoutScrapeSessionsInputObjectSchema as RestaurantCreateWithoutScrapeSessionsInputObjectSchema } from './RestaurantCreateWithoutScrapeSessionsInput.schema';
import { RestaurantUncheckedCreateWithoutScrapeSessionsInputObjectSchema as RestaurantUncheckedCreateWithoutScrapeSessionsInputObjectSchema } from './RestaurantUncheckedCreateWithoutScrapeSessionsInput.schema';
import { RestaurantCreateOrConnectWithoutScrapeSessionsInputObjectSchema as RestaurantCreateOrConnectWithoutScrapeSessionsInputObjectSchema } from './RestaurantCreateOrConnectWithoutScrapeSessionsInput.schema';
import { RestaurantUpsertWithoutScrapeSessionsInputObjectSchema as RestaurantUpsertWithoutScrapeSessionsInputObjectSchema } from './RestaurantUpsertWithoutScrapeSessionsInput.schema';
import { RestaurantWhereInputObjectSchema as RestaurantWhereInputObjectSchema } from './RestaurantWhereInput.schema';
import { RestaurantWhereUniqueInputObjectSchema as RestaurantWhereUniqueInputObjectSchema } from './RestaurantWhereUniqueInput.schema';
import { RestaurantUpdateToOneWithWhereWithoutScrapeSessionsInputObjectSchema as RestaurantUpdateToOneWithWhereWithoutScrapeSessionsInputObjectSchema } from './RestaurantUpdateToOneWithWhereWithoutScrapeSessionsInput.schema';
import { RestaurantUpdateWithoutScrapeSessionsInputObjectSchema as RestaurantUpdateWithoutScrapeSessionsInputObjectSchema } from './RestaurantUpdateWithoutScrapeSessionsInput.schema';
import { RestaurantUncheckedUpdateWithoutScrapeSessionsInputObjectSchema as RestaurantUncheckedUpdateWithoutScrapeSessionsInputObjectSchema } from './RestaurantUncheckedUpdateWithoutScrapeSessionsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => RestaurantCreateWithoutScrapeSessionsInputObjectSchema), z.lazy(() => RestaurantUncheckedCreateWithoutScrapeSessionsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => RestaurantCreateOrConnectWithoutScrapeSessionsInputObjectSchema).optional(),
  upsert: z.lazy(() => RestaurantUpsertWithoutScrapeSessionsInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => RestaurantWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => RestaurantWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => RestaurantWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => RestaurantUpdateToOneWithWhereWithoutScrapeSessionsInputObjectSchema), z.lazy(() => RestaurantUpdateWithoutScrapeSessionsInputObjectSchema), z.lazy(() => RestaurantUncheckedUpdateWithoutScrapeSessionsInputObjectSchema)]).optional()
}).strict();
export const RestaurantUpdateOneWithoutScrapeSessionsNestedInputObjectSchema: z.ZodType<Prisma.RestaurantUpdateOneWithoutScrapeSessionsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantUpdateOneWithoutScrapeSessionsNestedInput>;
export const RestaurantUpdateOneWithoutScrapeSessionsNestedInputObjectZodSchema = makeSchema();
