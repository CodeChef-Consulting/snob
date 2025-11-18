import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantExtractionCreateWithoutPostInputObjectSchema as RestaurantExtractionCreateWithoutPostInputObjectSchema } from './RestaurantExtractionCreateWithoutPostInput.schema';
import { RestaurantExtractionUncheckedCreateWithoutPostInputObjectSchema as RestaurantExtractionUncheckedCreateWithoutPostInputObjectSchema } from './RestaurantExtractionUncheckedCreateWithoutPostInput.schema';
import { RestaurantExtractionCreateOrConnectWithoutPostInputObjectSchema as RestaurantExtractionCreateOrConnectWithoutPostInputObjectSchema } from './RestaurantExtractionCreateOrConnectWithoutPostInput.schema';
import { RestaurantExtractionWhereUniqueInputObjectSchema as RestaurantExtractionWhereUniqueInputObjectSchema } from './RestaurantExtractionWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => RestaurantExtractionCreateWithoutPostInputObjectSchema), z.lazy(() => RestaurantExtractionUncheckedCreateWithoutPostInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => RestaurantExtractionCreateOrConnectWithoutPostInputObjectSchema).optional(),
  connect: z.lazy(() => RestaurantExtractionWhereUniqueInputObjectSchema).optional()
}).strict();
export const RestaurantExtractionUncheckedCreateNestedOneWithoutPostInputObjectSchema: z.ZodType<Prisma.RestaurantExtractionUncheckedCreateNestedOneWithoutPostInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantExtractionUncheckedCreateNestedOneWithoutPostInput>;
export const RestaurantExtractionUncheckedCreateNestedOneWithoutPostInputObjectZodSchema = makeSchema();
