import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ScrapingSessionScalarWhereInputObjectSchema as ScrapingSessionScalarWhereInputObjectSchema } from './ScrapingSessionScalarWhereInput.schema';
import { ScrapingSessionUpdateManyMutationInputObjectSchema as ScrapingSessionUpdateManyMutationInputObjectSchema } from './ScrapingSessionUpdateManyMutationInput.schema';
import { ScrapingSessionUncheckedUpdateManyWithoutRestaurantInputObjectSchema as ScrapingSessionUncheckedUpdateManyWithoutRestaurantInputObjectSchema } from './ScrapingSessionUncheckedUpdateManyWithoutRestaurantInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ScrapingSessionScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => ScrapingSessionUpdateManyMutationInputObjectSchema), z.lazy(() => ScrapingSessionUncheckedUpdateManyWithoutRestaurantInputObjectSchema)])
}).strict();
export const ScrapingSessionUpdateManyWithWhereWithoutRestaurantInputObjectSchema: z.ZodType<Prisma.ScrapingSessionUpdateManyWithWhereWithoutRestaurantInput> = makeSchema() as unknown as z.ZodType<Prisma.ScrapingSessionUpdateManyWithWhereWithoutRestaurantInput>;
export const ScrapingSessionUpdateManyWithWhereWithoutRestaurantInputObjectZodSchema = makeSchema();
