import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ScrapingSessionCreateWithoutRestaurantInputObjectSchema as ScrapingSessionCreateWithoutRestaurantInputObjectSchema } from './ScrapingSessionCreateWithoutRestaurantInput.schema';
import { ScrapingSessionUncheckedCreateWithoutRestaurantInputObjectSchema as ScrapingSessionUncheckedCreateWithoutRestaurantInputObjectSchema } from './ScrapingSessionUncheckedCreateWithoutRestaurantInput.schema';
import { ScrapingSessionCreateOrConnectWithoutRestaurantInputObjectSchema as ScrapingSessionCreateOrConnectWithoutRestaurantInputObjectSchema } from './ScrapingSessionCreateOrConnectWithoutRestaurantInput.schema';
import { ScrapingSessionCreateManyRestaurantInputEnvelopeObjectSchema as ScrapingSessionCreateManyRestaurantInputEnvelopeObjectSchema } from './ScrapingSessionCreateManyRestaurantInputEnvelope.schema';
import { ScrapingSessionWhereUniqueInputObjectSchema as ScrapingSessionWhereUniqueInputObjectSchema } from './ScrapingSessionWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ScrapingSessionCreateWithoutRestaurantInputObjectSchema), z.lazy(() => ScrapingSessionCreateWithoutRestaurantInputObjectSchema).array(), z.lazy(() => ScrapingSessionUncheckedCreateWithoutRestaurantInputObjectSchema), z.lazy(() => ScrapingSessionUncheckedCreateWithoutRestaurantInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ScrapingSessionCreateOrConnectWithoutRestaurantInputObjectSchema), z.lazy(() => ScrapingSessionCreateOrConnectWithoutRestaurantInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ScrapingSessionCreateManyRestaurantInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => ScrapingSessionWhereUniqueInputObjectSchema), z.lazy(() => ScrapingSessionWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const ScrapingSessionCreateNestedManyWithoutRestaurantInputObjectSchema: z.ZodType<Prisma.ScrapingSessionCreateNestedManyWithoutRestaurantInput> = makeSchema() as unknown as z.ZodType<Prisma.ScrapingSessionCreateNestedManyWithoutRestaurantInput>;
export const ScrapingSessionCreateNestedManyWithoutRestaurantInputObjectZodSchema = makeSchema();
