import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ScrapingSessionWhereInputObjectSchema as ScrapingSessionWhereInputObjectSchema } from './ScrapingSessionWhereInput.schema';
import { ScrapingSessionUpdateWithoutCommentsInputObjectSchema as ScrapingSessionUpdateWithoutCommentsInputObjectSchema } from './ScrapingSessionUpdateWithoutCommentsInput.schema';
import { ScrapingSessionUncheckedUpdateWithoutCommentsInputObjectSchema as ScrapingSessionUncheckedUpdateWithoutCommentsInputObjectSchema } from './ScrapingSessionUncheckedUpdateWithoutCommentsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ScrapingSessionWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => ScrapingSessionUpdateWithoutCommentsInputObjectSchema), z.lazy(() => ScrapingSessionUncheckedUpdateWithoutCommentsInputObjectSchema)])
}).strict();
export const ScrapingSessionUpdateToOneWithWhereWithoutCommentsInputObjectSchema: z.ZodType<Prisma.ScrapingSessionUpdateToOneWithWhereWithoutCommentsInput> = makeSchema() as unknown as z.ZodType<Prisma.ScrapingSessionUpdateToOneWithWhereWithoutCommentsInput>;
export const ScrapingSessionUpdateToOneWithWhereWithoutCommentsInputObjectZodSchema = makeSchema();
