import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ScrapingSessionCreateManyRestaurantInputObjectSchema as ScrapingSessionCreateManyRestaurantInputObjectSchema } from './ScrapingSessionCreateManyRestaurantInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => ScrapingSessionCreateManyRestaurantInputObjectSchema), z.lazy(() => ScrapingSessionCreateManyRestaurantInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const ScrapingSessionCreateManyRestaurantInputEnvelopeObjectSchema: z.ZodType<Prisma.ScrapingSessionCreateManyRestaurantInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.ScrapingSessionCreateManyRestaurantInputEnvelope>;
export const ScrapingSessionCreateManyRestaurantInputEnvelopeObjectZodSchema = makeSchema();
