import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ScrapingSessionWhereUniqueInputObjectSchema as ScrapingSessionWhereUniqueInputObjectSchema } from './ScrapingSessionWhereUniqueInput.schema';
import { ScrapingSessionCreateWithoutRestaurantInputObjectSchema as ScrapingSessionCreateWithoutRestaurantInputObjectSchema } from './ScrapingSessionCreateWithoutRestaurantInput.schema';
import { ScrapingSessionUncheckedCreateWithoutRestaurantInputObjectSchema as ScrapingSessionUncheckedCreateWithoutRestaurantInputObjectSchema } from './ScrapingSessionUncheckedCreateWithoutRestaurantInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ScrapingSessionWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ScrapingSessionCreateWithoutRestaurantInputObjectSchema), z.lazy(() => ScrapingSessionUncheckedCreateWithoutRestaurantInputObjectSchema)])
}).strict();
export const ScrapingSessionCreateOrConnectWithoutRestaurantInputObjectSchema: z.ZodType<Prisma.ScrapingSessionCreateOrConnectWithoutRestaurantInput> = makeSchema() as unknown as z.ZodType<Prisma.ScrapingSessionCreateOrConnectWithoutRestaurantInput>;
export const ScrapingSessionCreateOrConnectWithoutRestaurantInputObjectZodSchema = makeSchema();
