import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ScrapingSessionWhereUniqueInputObjectSchema as ScrapingSessionWhereUniqueInputObjectSchema } from './ScrapingSessionWhereUniqueInput.schema';
import { ScrapingSessionUpdateWithoutRestaurantInputObjectSchema as ScrapingSessionUpdateWithoutRestaurantInputObjectSchema } from './ScrapingSessionUpdateWithoutRestaurantInput.schema';
import { ScrapingSessionUncheckedUpdateWithoutRestaurantInputObjectSchema as ScrapingSessionUncheckedUpdateWithoutRestaurantInputObjectSchema } from './ScrapingSessionUncheckedUpdateWithoutRestaurantInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ScrapingSessionWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => ScrapingSessionUpdateWithoutRestaurantInputObjectSchema), z.lazy(() => ScrapingSessionUncheckedUpdateWithoutRestaurantInputObjectSchema)])
}).strict();
export const ScrapingSessionUpdateWithWhereUniqueWithoutRestaurantInputObjectSchema: z.ZodType<Prisma.ScrapingSessionUpdateWithWhereUniqueWithoutRestaurantInput> = makeSchema() as unknown as z.ZodType<Prisma.ScrapingSessionUpdateWithWhereUniqueWithoutRestaurantInput>;
export const ScrapingSessionUpdateWithWhereUniqueWithoutRestaurantInputObjectZodSchema = makeSchema();
