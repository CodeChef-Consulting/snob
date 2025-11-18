import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantExtractionWhereUniqueInputObjectSchema as RestaurantExtractionWhereUniqueInputObjectSchema } from './RestaurantExtractionWhereUniqueInput.schema';
import { RestaurantExtractionCreateWithoutPostInputObjectSchema as RestaurantExtractionCreateWithoutPostInputObjectSchema } from './RestaurantExtractionCreateWithoutPostInput.schema';
import { RestaurantExtractionUncheckedCreateWithoutPostInputObjectSchema as RestaurantExtractionUncheckedCreateWithoutPostInputObjectSchema } from './RestaurantExtractionUncheckedCreateWithoutPostInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => RestaurantExtractionWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => RestaurantExtractionCreateWithoutPostInputObjectSchema), z.lazy(() => RestaurantExtractionUncheckedCreateWithoutPostInputObjectSchema)])
}).strict();
export const RestaurantExtractionCreateOrConnectWithoutPostInputObjectSchema: z.ZodType<Prisma.RestaurantExtractionCreateOrConnectWithoutPostInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantExtractionCreateOrConnectWithoutPostInput>;
export const RestaurantExtractionCreateOrConnectWithoutPostInputObjectZodSchema = makeSchema();
