import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ScrapingSessionWhereUniqueInputObjectSchema as ScrapingSessionWhereUniqueInputObjectSchema } from './ScrapingSessionWhereUniqueInput.schema';
import { ScrapingSessionCreateWithoutPostsInputObjectSchema as ScrapingSessionCreateWithoutPostsInputObjectSchema } from './ScrapingSessionCreateWithoutPostsInput.schema';
import { ScrapingSessionUncheckedCreateWithoutPostsInputObjectSchema as ScrapingSessionUncheckedCreateWithoutPostsInputObjectSchema } from './ScrapingSessionUncheckedCreateWithoutPostsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ScrapingSessionWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ScrapingSessionCreateWithoutPostsInputObjectSchema), z.lazy(() => ScrapingSessionUncheckedCreateWithoutPostsInputObjectSchema)])
}).strict();
export const ScrapingSessionCreateOrConnectWithoutPostsInputObjectSchema: z.ZodType<Prisma.ScrapingSessionCreateOrConnectWithoutPostsInput> = makeSchema() as unknown as z.ZodType<Prisma.ScrapingSessionCreateOrConnectWithoutPostsInput>;
export const ScrapingSessionCreateOrConnectWithoutPostsInputObjectZodSchema = makeSchema();
