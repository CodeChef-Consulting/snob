import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ScrapingSessionCreateWithoutRestaurantInputObjectSchema as ScrapingSessionCreateWithoutRestaurantInputObjectSchema } from './ScrapingSessionCreateWithoutRestaurantInput.schema';
import { ScrapingSessionUncheckedCreateWithoutRestaurantInputObjectSchema as ScrapingSessionUncheckedCreateWithoutRestaurantInputObjectSchema } from './ScrapingSessionUncheckedCreateWithoutRestaurantInput.schema';
import { ScrapingSessionCreateOrConnectWithoutRestaurantInputObjectSchema as ScrapingSessionCreateOrConnectWithoutRestaurantInputObjectSchema } from './ScrapingSessionCreateOrConnectWithoutRestaurantInput.schema';
import { ScrapingSessionUpsertWithWhereUniqueWithoutRestaurantInputObjectSchema as ScrapingSessionUpsertWithWhereUniqueWithoutRestaurantInputObjectSchema } from './ScrapingSessionUpsertWithWhereUniqueWithoutRestaurantInput.schema';
import { ScrapingSessionCreateManyRestaurantInputEnvelopeObjectSchema as ScrapingSessionCreateManyRestaurantInputEnvelopeObjectSchema } from './ScrapingSessionCreateManyRestaurantInputEnvelope.schema';
import { ScrapingSessionWhereUniqueInputObjectSchema as ScrapingSessionWhereUniqueInputObjectSchema } from './ScrapingSessionWhereUniqueInput.schema';
import { ScrapingSessionUpdateWithWhereUniqueWithoutRestaurantInputObjectSchema as ScrapingSessionUpdateWithWhereUniqueWithoutRestaurantInputObjectSchema } from './ScrapingSessionUpdateWithWhereUniqueWithoutRestaurantInput.schema';
import { ScrapingSessionUpdateManyWithWhereWithoutRestaurantInputObjectSchema as ScrapingSessionUpdateManyWithWhereWithoutRestaurantInputObjectSchema } from './ScrapingSessionUpdateManyWithWhereWithoutRestaurantInput.schema';
import { ScrapingSessionScalarWhereInputObjectSchema as ScrapingSessionScalarWhereInputObjectSchema } from './ScrapingSessionScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ScrapingSessionCreateWithoutRestaurantInputObjectSchema), z.lazy(() => ScrapingSessionCreateWithoutRestaurantInputObjectSchema).array(), z.lazy(() => ScrapingSessionUncheckedCreateWithoutRestaurantInputObjectSchema), z.lazy(() => ScrapingSessionUncheckedCreateWithoutRestaurantInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ScrapingSessionCreateOrConnectWithoutRestaurantInputObjectSchema), z.lazy(() => ScrapingSessionCreateOrConnectWithoutRestaurantInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => ScrapingSessionUpsertWithWhereUniqueWithoutRestaurantInputObjectSchema), z.lazy(() => ScrapingSessionUpsertWithWhereUniqueWithoutRestaurantInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ScrapingSessionCreateManyRestaurantInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => ScrapingSessionWhereUniqueInputObjectSchema), z.lazy(() => ScrapingSessionWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => ScrapingSessionWhereUniqueInputObjectSchema), z.lazy(() => ScrapingSessionWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => ScrapingSessionWhereUniqueInputObjectSchema), z.lazy(() => ScrapingSessionWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => ScrapingSessionWhereUniqueInputObjectSchema), z.lazy(() => ScrapingSessionWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => ScrapingSessionUpdateWithWhereUniqueWithoutRestaurantInputObjectSchema), z.lazy(() => ScrapingSessionUpdateWithWhereUniqueWithoutRestaurantInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => ScrapingSessionUpdateManyWithWhereWithoutRestaurantInputObjectSchema), z.lazy(() => ScrapingSessionUpdateManyWithWhereWithoutRestaurantInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => ScrapingSessionScalarWhereInputObjectSchema), z.lazy(() => ScrapingSessionScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const ScrapingSessionUncheckedUpdateManyWithoutRestaurantNestedInputObjectSchema: z.ZodType<Prisma.ScrapingSessionUncheckedUpdateManyWithoutRestaurantNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ScrapingSessionUncheckedUpdateManyWithoutRestaurantNestedInput>;
export const ScrapingSessionUncheckedUpdateManyWithoutRestaurantNestedInputObjectZodSchema = makeSchema();
