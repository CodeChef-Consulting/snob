import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentCreateWithoutScrapingSessionInputObjectSchema as CommentCreateWithoutScrapingSessionInputObjectSchema } from './CommentCreateWithoutScrapingSessionInput.schema';
import { CommentUncheckedCreateWithoutScrapingSessionInputObjectSchema as CommentUncheckedCreateWithoutScrapingSessionInputObjectSchema } from './CommentUncheckedCreateWithoutScrapingSessionInput.schema';
import { CommentCreateOrConnectWithoutScrapingSessionInputObjectSchema as CommentCreateOrConnectWithoutScrapingSessionInputObjectSchema } from './CommentCreateOrConnectWithoutScrapingSessionInput.schema';
import { CommentCreateManyScrapingSessionInputEnvelopeObjectSchema as CommentCreateManyScrapingSessionInputEnvelopeObjectSchema } from './CommentCreateManyScrapingSessionInputEnvelope.schema';
import { CommentWhereUniqueInputObjectSchema as CommentWhereUniqueInputObjectSchema } from './CommentWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CommentCreateWithoutScrapingSessionInputObjectSchema), z.lazy(() => CommentCreateWithoutScrapingSessionInputObjectSchema).array(), z.lazy(() => CommentUncheckedCreateWithoutScrapingSessionInputObjectSchema), z.lazy(() => CommentUncheckedCreateWithoutScrapingSessionInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CommentCreateOrConnectWithoutScrapingSessionInputObjectSchema), z.lazy(() => CommentCreateOrConnectWithoutScrapingSessionInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CommentCreateManyScrapingSessionInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => CommentWhereUniqueInputObjectSchema), z.lazy(() => CommentWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CommentUncheckedCreateNestedManyWithoutScrapingSessionInputObjectSchema: z.ZodType<Prisma.CommentUncheckedCreateNestedManyWithoutScrapingSessionInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentUncheckedCreateNestedManyWithoutScrapingSessionInput>;
export const CommentUncheckedCreateNestedManyWithoutScrapingSessionInputObjectZodSchema = makeSchema();
