import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ScrapingSessionCreateWithoutPostsInputObjectSchema as ScrapingSessionCreateWithoutPostsInputObjectSchema } from './ScrapingSessionCreateWithoutPostsInput.schema';
import { ScrapingSessionUncheckedCreateWithoutPostsInputObjectSchema as ScrapingSessionUncheckedCreateWithoutPostsInputObjectSchema } from './ScrapingSessionUncheckedCreateWithoutPostsInput.schema';
import { ScrapingSessionCreateOrConnectWithoutPostsInputObjectSchema as ScrapingSessionCreateOrConnectWithoutPostsInputObjectSchema } from './ScrapingSessionCreateOrConnectWithoutPostsInput.schema';
import { ScrapingSessionWhereUniqueInputObjectSchema as ScrapingSessionWhereUniqueInputObjectSchema } from './ScrapingSessionWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ScrapingSessionCreateWithoutPostsInputObjectSchema), z.lazy(() => ScrapingSessionUncheckedCreateWithoutPostsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ScrapingSessionCreateOrConnectWithoutPostsInputObjectSchema).optional(),
  connect: z.lazy(() => ScrapingSessionWhereUniqueInputObjectSchema).optional()
}).strict();
export const ScrapingSessionCreateNestedOneWithoutPostsInputObjectSchema: z.ZodType<Prisma.ScrapingSessionCreateNestedOneWithoutPostsInput> = makeSchema() as unknown as z.ZodType<Prisma.ScrapingSessionCreateNestedOneWithoutPostsInput>;
export const ScrapingSessionCreateNestedOneWithoutPostsInputObjectZodSchema = makeSchema();
