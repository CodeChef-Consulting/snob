import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantExtractionCreateWithoutPostInputObjectSchema as RestaurantExtractionCreateWithoutPostInputObjectSchema } from './RestaurantExtractionCreateWithoutPostInput.schema';
import { RestaurantExtractionUncheckedCreateWithoutPostInputObjectSchema as RestaurantExtractionUncheckedCreateWithoutPostInputObjectSchema } from './RestaurantExtractionUncheckedCreateWithoutPostInput.schema';
import { RestaurantExtractionCreateOrConnectWithoutPostInputObjectSchema as RestaurantExtractionCreateOrConnectWithoutPostInputObjectSchema } from './RestaurantExtractionCreateOrConnectWithoutPostInput.schema';
import { RestaurantExtractionUpsertWithoutPostInputObjectSchema as RestaurantExtractionUpsertWithoutPostInputObjectSchema } from './RestaurantExtractionUpsertWithoutPostInput.schema';
import { RestaurantExtractionWhereInputObjectSchema as RestaurantExtractionWhereInputObjectSchema } from './RestaurantExtractionWhereInput.schema';
import { RestaurantExtractionWhereUniqueInputObjectSchema as RestaurantExtractionWhereUniqueInputObjectSchema } from './RestaurantExtractionWhereUniqueInput.schema';
import { RestaurantExtractionUpdateToOneWithWhereWithoutPostInputObjectSchema as RestaurantExtractionUpdateToOneWithWhereWithoutPostInputObjectSchema } from './RestaurantExtractionUpdateToOneWithWhereWithoutPostInput.schema';
import { RestaurantExtractionUpdateWithoutPostInputObjectSchema as RestaurantExtractionUpdateWithoutPostInputObjectSchema } from './RestaurantExtractionUpdateWithoutPostInput.schema';
import { RestaurantExtractionUncheckedUpdateWithoutPostInputObjectSchema as RestaurantExtractionUncheckedUpdateWithoutPostInputObjectSchema } from './RestaurantExtractionUncheckedUpdateWithoutPostInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => RestaurantExtractionCreateWithoutPostInputObjectSchema), z.lazy(() => RestaurantExtractionUncheckedCreateWithoutPostInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => RestaurantExtractionCreateOrConnectWithoutPostInputObjectSchema).optional(),
  upsert: z.lazy(() => RestaurantExtractionUpsertWithoutPostInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => RestaurantExtractionWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => RestaurantExtractionWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => RestaurantExtractionWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => RestaurantExtractionUpdateToOneWithWhereWithoutPostInputObjectSchema), z.lazy(() => RestaurantExtractionUpdateWithoutPostInputObjectSchema), z.lazy(() => RestaurantExtractionUncheckedUpdateWithoutPostInputObjectSchema)]).optional()
}).strict();
export const RestaurantExtractionUpdateOneWithoutPostNestedInputObjectSchema: z.ZodType<Prisma.RestaurantExtractionUpdateOneWithoutPostNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantExtractionUpdateOneWithoutPostNestedInput>;
export const RestaurantExtractionUpdateOneWithoutPostNestedInputObjectZodSchema = makeSchema();
