import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { RestaurantLocationCreateManyGroupInputObjectSchema as RestaurantLocationCreateManyGroupInputObjectSchema } from './RestaurantLocationCreateManyGroupInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => RestaurantLocationCreateManyGroupInputObjectSchema), z.lazy(() => RestaurantLocationCreateManyGroupInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const RestaurantLocationCreateManyGroupInputEnvelopeObjectSchema: z.ZodType<Prisma.RestaurantLocationCreateManyGroupInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.RestaurantLocationCreateManyGroupInputEnvelope>;
export const RestaurantLocationCreateManyGroupInputEnvelopeObjectZodSchema = makeSchema();
