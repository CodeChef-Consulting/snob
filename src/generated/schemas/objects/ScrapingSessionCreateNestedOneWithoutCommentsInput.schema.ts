import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ScrapingSessionCreateWithoutCommentsInputObjectSchema as ScrapingSessionCreateWithoutCommentsInputObjectSchema } from './ScrapingSessionCreateWithoutCommentsInput.schema';
import { ScrapingSessionUncheckedCreateWithoutCommentsInputObjectSchema as ScrapingSessionUncheckedCreateWithoutCommentsInputObjectSchema } from './ScrapingSessionUncheckedCreateWithoutCommentsInput.schema';
import { ScrapingSessionCreateOrConnectWithoutCommentsInputObjectSchema as ScrapingSessionCreateOrConnectWithoutCommentsInputObjectSchema } from './ScrapingSessionCreateOrConnectWithoutCommentsInput.schema';
import { ScrapingSessionWhereUniqueInputObjectSchema as ScrapingSessionWhereUniqueInputObjectSchema } from './ScrapingSessionWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ScrapingSessionCreateWithoutCommentsInputObjectSchema), z.lazy(() => ScrapingSessionUncheckedCreateWithoutCommentsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ScrapingSessionCreateOrConnectWithoutCommentsInputObjectSchema).optional(),
  connect: z.lazy(() => ScrapingSessionWhereUniqueInputObjectSchema).optional()
}).strict();
export const ScrapingSessionCreateNestedOneWithoutCommentsInputObjectSchema: z.ZodType<Prisma.ScrapingSessionCreateNestedOneWithoutCommentsInput> = makeSchema() as unknown as z.ZodType<Prisma.ScrapingSessionCreateNestedOneWithoutCommentsInput>;
export const ScrapingSessionCreateNestedOneWithoutCommentsInputObjectZodSchema = makeSchema();
