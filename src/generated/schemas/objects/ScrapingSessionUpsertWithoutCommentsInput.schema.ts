import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ScrapingSessionUpdateWithoutCommentsInputObjectSchema as ScrapingSessionUpdateWithoutCommentsInputObjectSchema } from './ScrapingSessionUpdateWithoutCommentsInput.schema';
import { ScrapingSessionUncheckedUpdateWithoutCommentsInputObjectSchema as ScrapingSessionUncheckedUpdateWithoutCommentsInputObjectSchema } from './ScrapingSessionUncheckedUpdateWithoutCommentsInput.schema';
import { ScrapingSessionCreateWithoutCommentsInputObjectSchema as ScrapingSessionCreateWithoutCommentsInputObjectSchema } from './ScrapingSessionCreateWithoutCommentsInput.schema';
import { ScrapingSessionUncheckedCreateWithoutCommentsInputObjectSchema as ScrapingSessionUncheckedCreateWithoutCommentsInputObjectSchema } from './ScrapingSessionUncheckedCreateWithoutCommentsInput.schema';
import { ScrapingSessionWhereInputObjectSchema as ScrapingSessionWhereInputObjectSchema } from './ScrapingSessionWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => ScrapingSessionUpdateWithoutCommentsInputObjectSchema), z.lazy(() => ScrapingSessionUncheckedUpdateWithoutCommentsInputObjectSchema)]),
  create: z.union([z.lazy(() => ScrapingSessionCreateWithoutCommentsInputObjectSchema), z.lazy(() => ScrapingSessionUncheckedCreateWithoutCommentsInputObjectSchema)]),
  where: z.lazy(() => ScrapingSessionWhereInputObjectSchema).optional()
}).strict();
export const ScrapingSessionUpsertWithoutCommentsInputObjectSchema: z.ZodType<Prisma.ScrapingSessionUpsertWithoutCommentsInput> = makeSchema() as unknown as z.ZodType<Prisma.ScrapingSessionUpsertWithoutCommentsInput>;
export const ScrapingSessionUpsertWithoutCommentsInputObjectZodSchema = makeSchema();
