import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ScrapingSessionCreateWithoutCommentsInputObjectSchema as ScrapingSessionCreateWithoutCommentsInputObjectSchema } from './ScrapingSessionCreateWithoutCommentsInput.schema';
import { ScrapingSessionUncheckedCreateWithoutCommentsInputObjectSchema as ScrapingSessionUncheckedCreateWithoutCommentsInputObjectSchema } from './ScrapingSessionUncheckedCreateWithoutCommentsInput.schema';
import { ScrapingSessionCreateOrConnectWithoutCommentsInputObjectSchema as ScrapingSessionCreateOrConnectWithoutCommentsInputObjectSchema } from './ScrapingSessionCreateOrConnectWithoutCommentsInput.schema';
import { ScrapingSessionUpsertWithoutCommentsInputObjectSchema as ScrapingSessionUpsertWithoutCommentsInputObjectSchema } from './ScrapingSessionUpsertWithoutCommentsInput.schema';
import { ScrapingSessionWhereInputObjectSchema as ScrapingSessionWhereInputObjectSchema } from './ScrapingSessionWhereInput.schema';
import { ScrapingSessionWhereUniqueInputObjectSchema as ScrapingSessionWhereUniqueInputObjectSchema } from './ScrapingSessionWhereUniqueInput.schema';
import { ScrapingSessionUpdateToOneWithWhereWithoutCommentsInputObjectSchema as ScrapingSessionUpdateToOneWithWhereWithoutCommentsInputObjectSchema } from './ScrapingSessionUpdateToOneWithWhereWithoutCommentsInput.schema';
import { ScrapingSessionUpdateWithoutCommentsInputObjectSchema as ScrapingSessionUpdateWithoutCommentsInputObjectSchema } from './ScrapingSessionUpdateWithoutCommentsInput.schema';
import { ScrapingSessionUncheckedUpdateWithoutCommentsInputObjectSchema as ScrapingSessionUncheckedUpdateWithoutCommentsInputObjectSchema } from './ScrapingSessionUncheckedUpdateWithoutCommentsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ScrapingSessionCreateWithoutCommentsInputObjectSchema), z.lazy(() => ScrapingSessionUncheckedCreateWithoutCommentsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ScrapingSessionCreateOrConnectWithoutCommentsInputObjectSchema).optional(),
  upsert: z.lazy(() => ScrapingSessionUpsertWithoutCommentsInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => ScrapingSessionWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => ScrapingSessionWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => ScrapingSessionWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => ScrapingSessionUpdateToOneWithWhereWithoutCommentsInputObjectSchema), z.lazy(() => ScrapingSessionUpdateWithoutCommentsInputObjectSchema), z.lazy(() => ScrapingSessionUncheckedUpdateWithoutCommentsInputObjectSchema)]).optional()
}).strict();
export const ScrapingSessionUpdateOneWithoutCommentsNestedInputObjectSchema: z.ZodType<Prisma.ScrapingSessionUpdateOneWithoutCommentsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ScrapingSessionUpdateOneWithoutCommentsNestedInput>;
export const ScrapingSessionUpdateOneWithoutCommentsNestedInputObjectZodSchema = makeSchema();
