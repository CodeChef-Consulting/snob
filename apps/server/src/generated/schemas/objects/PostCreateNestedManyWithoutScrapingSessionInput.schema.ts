import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PostCreateWithoutScrapingSessionInputObjectSchema as PostCreateWithoutScrapingSessionInputObjectSchema } from './PostCreateWithoutScrapingSessionInput.schema';
import { PostUncheckedCreateWithoutScrapingSessionInputObjectSchema as PostUncheckedCreateWithoutScrapingSessionInputObjectSchema } from './PostUncheckedCreateWithoutScrapingSessionInput.schema';
import { PostCreateOrConnectWithoutScrapingSessionInputObjectSchema as PostCreateOrConnectWithoutScrapingSessionInputObjectSchema } from './PostCreateOrConnectWithoutScrapingSessionInput.schema';
import { PostCreateManyScrapingSessionInputEnvelopeObjectSchema as PostCreateManyScrapingSessionInputEnvelopeObjectSchema } from './PostCreateManyScrapingSessionInputEnvelope.schema';
import { PostWhereUniqueInputObjectSchema as PostWhereUniqueInputObjectSchema } from './PostWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PostCreateWithoutScrapingSessionInputObjectSchema), z.lazy(() => PostCreateWithoutScrapingSessionInputObjectSchema).array(), z.lazy(() => PostUncheckedCreateWithoutScrapingSessionInputObjectSchema), z.lazy(() => PostUncheckedCreateWithoutScrapingSessionInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PostCreateOrConnectWithoutScrapingSessionInputObjectSchema), z.lazy(() => PostCreateOrConnectWithoutScrapingSessionInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => PostCreateManyScrapingSessionInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => PostWhereUniqueInputObjectSchema), z.lazy(() => PostWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const PostCreateNestedManyWithoutScrapingSessionInputObjectSchema: z.ZodType<Prisma.PostCreateNestedManyWithoutScrapingSessionInput> = makeSchema() as unknown as z.ZodType<Prisma.PostCreateNestedManyWithoutScrapingSessionInput>;
export const PostCreateNestedManyWithoutScrapingSessionInputObjectZodSchema = makeSchema();
