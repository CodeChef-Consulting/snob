import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ScrapingSessionUpdateWithoutPostsInputObjectSchema as ScrapingSessionUpdateWithoutPostsInputObjectSchema } from './ScrapingSessionUpdateWithoutPostsInput.schema';
import { ScrapingSessionUncheckedUpdateWithoutPostsInputObjectSchema as ScrapingSessionUncheckedUpdateWithoutPostsInputObjectSchema } from './ScrapingSessionUncheckedUpdateWithoutPostsInput.schema';
import { ScrapingSessionCreateWithoutPostsInputObjectSchema as ScrapingSessionCreateWithoutPostsInputObjectSchema } from './ScrapingSessionCreateWithoutPostsInput.schema';
import { ScrapingSessionUncheckedCreateWithoutPostsInputObjectSchema as ScrapingSessionUncheckedCreateWithoutPostsInputObjectSchema } from './ScrapingSessionUncheckedCreateWithoutPostsInput.schema';
import { ScrapingSessionWhereInputObjectSchema as ScrapingSessionWhereInputObjectSchema } from './ScrapingSessionWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => ScrapingSessionUpdateWithoutPostsInputObjectSchema), z.lazy(() => ScrapingSessionUncheckedUpdateWithoutPostsInputObjectSchema)]),
  create: z.union([z.lazy(() => ScrapingSessionCreateWithoutPostsInputObjectSchema), z.lazy(() => ScrapingSessionUncheckedCreateWithoutPostsInputObjectSchema)]),
  where: z.lazy(() => ScrapingSessionWhereInputObjectSchema).optional()
}).strict();
export const ScrapingSessionUpsertWithoutPostsInputObjectSchema: z.ZodType<Prisma.ScrapingSessionUpsertWithoutPostsInput> = makeSchema() as unknown as z.ZodType<Prisma.ScrapingSessionUpsertWithoutPostsInput>;
export const ScrapingSessionUpsertWithoutPostsInputObjectZodSchema = makeSchema();
