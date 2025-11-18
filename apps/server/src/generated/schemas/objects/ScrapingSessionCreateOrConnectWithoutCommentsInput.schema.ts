import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ScrapingSessionWhereUniqueInputObjectSchema as ScrapingSessionWhereUniqueInputObjectSchema } from './ScrapingSessionWhereUniqueInput.schema';
import { ScrapingSessionCreateWithoutCommentsInputObjectSchema as ScrapingSessionCreateWithoutCommentsInputObjectSchema } from './ScrapingSessionCreateWithoutCommentsInput.schema';
import { ScrapingSessionUncheckedCreateWithoutCommentsInputObjectSchema as ScrapingSessionUncheckedCreateWithoutCommentsInputObjectSchema } from './ScrapingSessionUncheckedCreateWithoutCommentsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ScrapingSessionWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ScrapingSessionCreateWithoutCommentsInputObjectSchema), z.lazy(() => ScrapingSessionUncheckedCreateWithoutCommentsInputObjectSchema)])
}).strict();
export const ScrapingSessionCreateOrConnectWithoutCommentsInputObjectSchema: z.ZodType<Prisma.ScrapingSessionCreateOrConnectWithoutCommentsInput> = makeSchema() as unknown as z.ZodType<Prisma.ScrapingSessionCreateOrConnectWithoutCommentsInput>;
export const ScrapingSessionCreateOrConnectWithoutCommentsInputObjectZodSchema = makeSchema();
