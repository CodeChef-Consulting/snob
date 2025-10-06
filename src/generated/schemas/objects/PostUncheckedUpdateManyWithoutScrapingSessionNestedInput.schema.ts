import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PostCreateWithoutScrapingSessionInputObjectSchema as PostCreateWithoutScrapingSessionInputObjectSchema } from './PostCreateWithoutScrapingSessionInput.schema';
import { PostUncheckedCreateWithoutScrapingSessionInputObjectSchema as PostUncheckedCreateWithoutScrapingSessionInputObjectSchema } from './PostUncheckedCreateWithoutScrapingSessionInput.schema';
import { PostCreateOrConnectWithoutScrapingSessionInputObjectSchema as PostCreateOrConnectWithoutScrapingSessionInputObjectSchema } from './PostCreateOrConnectWithoutScrapingSessionInput.schema';
import { PostUpsertWithWhereUniqueWithoutScrapingSessionInputObjectSchema as PostUpsertWithWhereUniqueWithoutScrapingSessionInputObjectSchema } from './PostUpsertWithWhereUniqueWithoutScrapingSessionInput.schema';
import { PostCreateManyScrapingSessionInputEnvelopeObjectSchema as PostCreateManyScrapingSessionInputEnvelopeObjectSchema } from './PostCreateManyScrapingSessionInputEnvelope.schema';
import { PostWhereUniqueInputObjectSchema as PostWhereUniqueInputObjectSchema } from './PostWhereUniqueInput.schema';
import { PostUpdateWithWhereUniqueWithoutScrapingSessionInputObjectSchema as PostUpdateWithWhereUniqueWithoutScrapingSessionInputObjectSchema } from './PostUpdateWithWhereUniqueWithoutScrapingSessionInput.schema';
import { PostUpdateManyWithWhereWithoutScrapingSessionInputObjectSchema as PostUpdateManyWithWhereWithoutScrapingSessionInputObjectSchema } from './PostUpdateManyWithWhereWithoutScrapingSessionInput.schema';
import { PostScalarWhereInputObjectSchema as PostScalarWhereInputObjectSchema } from './PostScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PostCreateWithoutScrapingSessionInputObjectSchema), z.lazy(() => PostCreateWithoutScrapingSessionInputObjectSchema).array(), z.lazy(() => PostUncheckedCreateWithoutScrapingSessionInputObjectSchema), z.lazy(() => PostUncheckedCreateWithoutScrapingSessionInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PostCreateOrConnectWithoutScrapingSessionInputObjectSchema), z.lazy(() => PostCreateOrConnectWithoutScrapingSessionInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => PostUpsertWithWhereUniqueWithoutScrapingSessionInputObjectSchema), z.lazy(() => PostUpsertWithWhereUniqueWithoutScrapingSessionInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => PostCreateManyScrapingSessionInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => PostWhereUniqueInputObjectSchema), z.lazy(() => PostWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => PostWhereUniqueInputObjectSchema), z.lazy(() => PostWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => PostWhereUniqueInputObjectSchema), z.lazy(() => PostWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => PostWhereUniqueInputObjectSchema), z.lazy(() => PostWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => PostUpdateWithWhereUniqueWithoutScrapingSessionInputObjectSchema), z.lazy(() => PostUpdateWithWhereUniqueWithoutScrapingSessionInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => PostUpdateManyWithWhereWithoutScrapingSessionInputObjectSchema), z.lazy(() => PostUpdateManyWithWhereWithoutScrapingSessionInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => PostScalarWhereInputObjectSchema), z.lazy(() => PostScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const PostUncheckedUpdateManyWithoutScrapingSessionNestedInputObjectSchema: z.ZodType<Prisma.PostUncheckedUpdateManyWithoutScrapingSessionNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.PostUncheckedUpdateManyWithoutScrapingSessionNestedInput>;
export const PostUncheckedUpdateManyWithoutScrapingSessionNestedInputObjectZodSchema = makeSchema();
