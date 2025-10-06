import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentCreateWithoutScrapingSessionInputObjectSchema as CommentCreateWithoutScrapingSessionInputObjectSchema } from './CommentCreateWithoutScrapingSessionInput.schema';
import { CommentUncheckedCreateWithoutScrapingSessionInputObjectSchema as CommentUncheckedCreateWithoutScrapingSessionInputObjectSchema } from './CommentUncheckedCreateWithoutScrapingSessionInput.schema';
import { CommentCreateOrConnectWithoutScrapingSessionInputObjectSchema as CommentCreateOrConnectWithoutScrapingSessionInputObjectSchema } from './CommentCreateOrConnectWithoutScrapingSessionInput.schema';
import { CommentUpsertWithWhereUniqueWithoutScrapingSessionInputObjectSchema as CommentUpsertWithWhereUniqueWithoutScrapingSessionInputObjectSchema } from './CommentUpsertWithWhereUniqueWithoutScrapingSessionInput.schema';
import { CommentCreateManyScrapingSessionInputEnvelopeObjectSchema as CommentCreateManyScrapingSessionInputEnvelopeObjectSchema } from './CommentCreateManyScrapingSessionInputEnvelope.schema';
import { CommentWhereUniqueInputObjectSchema as CommentWhereUniqueInputObjectSchema } from './CommentWhereUniqueInput.schema';
import { CommentUpdateWithWhereUniqueWithoutScrapingSessionInputObjectSchema as CommentUpdateWithWhereUniqueWithoutScrapingSessionInputObjectSchema } from './CommentUpdateWithWhereUniqueWithoutScrapingSessionInput.schema';
import { CommentUpdateManyWithWhereWithoutScrapingSessionInputObjectSchema as CommentUpdateManyWithWhereWithoutScrapingSessionInputObjectSchema } from './CommentUpdateManyWithWhereWithoutScrapingSessionInput.schema';
import { CommentScalarWhereInputObjectSchema as CommentScalarWhereInputObjectSchema } from './CommentScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CommentCreateWithoutScrapingSessionInputObjectSchema), z.lazy(() => CommentCreateWithoutScrapingSessionInputObjectSchema).array(), z.lazy(() => CommentUncheckedCreateWithoutScrapingSessionInputObjectSchema), z.lazy(() => CommentUncheckedCreateWithoutScrapingSessionInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CommentCreateOrConnectWithoutScrapingSessionInputObjectSchema), z.lazy(() => CommentCreateOrConnectWithoutScrapingSessionInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CommentUpsertWithWhereUniqueWithoutScrapingSessionInputObjectSchema), z.lazy(() => CommentUpsertWithWhereUniqueWithoutScrapingSessionInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CommentCreateManyScrapingSessionInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => CommentWhereUniqueInputObjectSchema), z.lazy(() => CommentWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CommentWhereUniqueInputObjectSchema), z.lazy(() => CommentWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CommentWhereUniqueInputObjectSchema), z.lazy(() => CommentWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CommentWhereUniqueInputObjectSchema), z.lazy(() => CommentWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => CommentUpdateWithWhereUniqueWithoutScrapingSessionInputObjectSchema), z.lazy(() => CommentUpdateWithWhereUniqueWithoutScrapingSessionInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CommentUpdateManyWithWhereWithoutScrapingSessionInputObjectSchema), z.lazy(() => CommentUpdateManyWithWhereWithoutScrapingSessionInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CommentScalarWhereInputObjectSchema), z.lazy(() => CommentScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const CommentUncheckedUpdateManyWithoutScrapingSessionNestedInputObjectSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutScrapingSessionNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutScrapingSessionNestedInput>;
export const CommentUncheckedUpdateManyWithoutScrapingSessionNestedInputObjectZodSchema = makeSchema();
