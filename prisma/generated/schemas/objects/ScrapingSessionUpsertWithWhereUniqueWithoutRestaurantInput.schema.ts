import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ScrapingSessionWhereUniqueInputObjectSchema as ScrapingSessionWhereUniqueInputObjectSchema } from './ScrapingSessionWhereUniqueInput.schema';
import { ScrapingSessionUpdateWithoutRestaurantInputObjectSchema as ScrapingSessionUpdateWithoutRestaurantInputObjectSchema } from './ScrapingSessionUpdateWithoutRestaurantInput.schema';
import { ScrapingSessionUncheckedUpdateWithoutRestaurantInputObjectSchema as ScrapingSessionUncheckedUpdateWithoutRestaurantInputObjectSchema } from './ScrapingSessionUncheckedUpdateWithoutRestaurantInput.schema';
import { ScrapingSessionCreateWithoutRestaurantInputObjectSchema as ScrapingSessionCreateWithoutRestaurantInputObjectSchema } from './ScrapingSessionCreateWithoutRestaurantInput.schema';
import { ScrapingSessionUncheckedCreateWithoutRestaurantInputObjectSchema as ScrapingSessionUncheckedCreateWithoutRestaurantInputObjectSchema } from './ScrapingSessionUncheckedCreateWithoutRestaurantInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ScrapingSessionWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => ScrapingSessionUpdateWithoutRestaurantInputObjectSchema), z.lazy(() => ScrapingSessionUncheckedUpdateWithoutRestaurantInputObjectSchema)]),
  create: z.union([z.lazy(() => ScrapingSessionCreateWithoutRestaurantInputObjectSchema), z.lazy(() => ScrapingSessionUncheckedCreateWithoutRestaurantInputObjectSchema)])
}).strict();
export const ScrapingSessionUpsertWithWhereUniqueWithoutRestaurantInputObjectSchema: z.ZodType<Prisma.ScrapingSessionUpsertWithWhereUniqueWithoutRestaurantInput> = makeSchema() as unknown as z.ZodType<Prisma.ScrapingSessionUpsertWithWhereUniqueWithoutRestaurantInput>;
export const ScrapingSessionUpsertWithWhereUniqueWithoutRestaurantInputObjectZodSchema = makeSchema();
