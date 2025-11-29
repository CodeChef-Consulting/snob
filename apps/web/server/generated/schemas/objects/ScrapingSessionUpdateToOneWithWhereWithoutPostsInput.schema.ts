import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ScrapingSessionWhereInputObjectSchema as ScrapingSessionWhereInputObjectSchema } from './ScrapingSessionWhereInput.schema';
import { ScrapingSessionUpdateWithoutPostsInputObjectSchema as ScrapingSessionUpdateWithoutPostsInputObjectSchema } from './ScrapingSessionUpdateWithoutPostsInput.schema';
import { ScrapingSessionUncheckedUpdateWithoutPostsInputObjectSchema as ScrapingSessionUncheckedUpdateWithoutPostsInputObjectSchema } from './ScrapingSessionUncheckedUpdateWithoutPostsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ScrapingSessionWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => ScrapingSessionUpdateWithoutPostsInputObjectSchema), z.lazy(() => ScrapingSessionUncheckedUpdateWithoutPostsInputObjectSchema)])
}).strict();
export const ScrapingSessionUpdateToOneWithWhereWithoutPostsInputObjectSchema: z.ZodType<Prisma.ScrapingSessionUpdateToOneWithWhereWithoutPostsInput> = makeSchema() as unknown as z.ZodType<Prisma.ScrapingSessionUpdateToOneWithWhereWithoutPostsInput>;
export const ScrapingSessionUpdateToOneWithWhereWithoutPostsInputObjectZodSchema = makeSchema();
