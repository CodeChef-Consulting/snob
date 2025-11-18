import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ScrapingSessionCreateWithoutPostsInputObjectSchema as ScrapingSessionCreateWithoutPostsInputObjectSchema } from './ScrapingSessionCreateWithoutPostsInput.schema';
import { ScrapingSessionUncheckedCreateWithoutPostsInputObjectSchema as ScrapingSessionUncheckedCreateWithoutPostsInputObjectSchema } from './ScrapingSessionUncheckedCreateWithoutPostsInput.schema';
import { ScrapingSessionCreateOrConnectWithoutPostsInputObjectSchema as ScrapingSessionCreateOrConnectWithoutPostsInputObjectSchema } from './ScrapingSessionCreateOrConnectWithoutPostsInput.schema';
import { ScrapingSessionUpsertWithoutPostsInputObjectSchema as ScrapingSessionUpsertWithoutPostsInputObjectSchema } from './ScrapingSessionUpsertWithoutPostsInput.schema';
import { ScrapingSessionWhereInputObjectSchema as ScrapingSessionWhereInputObjectSchema } from './ScrapingSessionWhereInput.schema';
import { ScrapingSessionWhereUniqueInputObjectSchema as ScrapingSessionWhereUniqueInputObjectSchema } from './ScrapingSessionWhereUniqueInput.schema';
import { ScrapingSessionUpdateToOneWithWhereWithoutPostsInputObjectSchema as ScrapingSessionUpdateToOneWithWhereWithoutPostsInputObjectSchema } from './ScrapingSessionUpdateToOneWithWhereWithoutPostsInput.schema';
import { ScrapingSessionUpdateWithoutPostsInputObjectSchema as ScrapingSessionUpdateWithoutPostsInputObjectSchema } from './ScrapingSessionUpdateWithoutPostsInput.schema';
import { ScrapingSessionUncheckedUpdateWithoutPostsInputObjectSchema as ScrapingSessionUncheckedUpdateWithoutPostsInputObjectSchema } from './ScrapingSessionUncheckedUpdateWithoutPostsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ScrapingSessionCreateWithoutPostsInputObjectSchema), z.lazy(() => ScrapingSessionUncheckedCreateWithoutPostsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ScrapingSessionCreateOrConnectWithoutPostsInputObjectSchema).optional(),
  upsert: z.lazy(() => ScrapingSessionUpsertWithoutPostsInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => ScrapingSessionWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => ScrapingSessionWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => ScrapingSessionWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => ScrapingSessionUpdateToOneWithWhereWithoutPostsInputObjectSchema), z.lazy(() => ScrapingSessionUpdateWithoutPostsInputObjectSchema), z.lazy(() => ScrapingSessionUncheckedUpdateWithoutPostsInputObjectSchema)]).optional()
}).strict();
export const ScrapingSessionUpdateOneWithoutPostsNestedInputObjectSchema: z.ZodType<Prisma.ScrapingSessionUpdateOneWithoutPostsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ScrapingSessionUpdateOneWithoutPostsNestedInput>;
export const ScrapingSessionUpdateOneWithoutPostsNestedInputObjectZodSchema = makeSchema();
