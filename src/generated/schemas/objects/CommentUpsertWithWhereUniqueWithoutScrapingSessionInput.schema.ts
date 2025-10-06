import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentWhereUniqueInputObjectSchema as CommentWhereUniqueInputObjectSchema } from './CommentWhereUniqueInput.schema';
import { CommentUpdateWithoutScrapingSessionInputObjectSchema as CommentUpdateWithoutScrapingSessionInputObjectSchema } from './CommentUpdateWithoutScrapingSessionInput.schema';
import { CommentUncheckedUpdateWithoutScrapingSessionInputObjectSchema as CommentUncheckedUpdateWithoutScrapingSessionInputObjectSchema } from './CommentUncheckedUpdateWithoutScrapingSessionInput.schema';
import { CommentCreateWithoutScrapingSessionInputObjectSchema as CommentCreateWithoutScrapingSessionInputObjectSchema } from './CommentCreateWithoutScrapingSessionInput.schema';
import { CommentUncheckedCreateWithoutScrapingSessionInputObjectSchema as CommentUncheckedCreateWithoutScrapingSessionInputObjectSchema } from './CommentUncheckedCreateWithoutScrapingSessionInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CommentWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CommentUpdateWithoutScrapingSessionInputObjectSchema), z.lazy(() => CommentUncheckedUpdateWithoutScrapingSessionInputObjectSchema)]),
  create: z.union([z.lazy(() => CommentCreateWithoutScrapingSessionInputObjectSchema), z.lazy(() => CommentUncheckedCreateWithoutScrapingSessionInputObjectSchema)])
}).strict();
export const CommentUpsertWithWhereUniqueWithoutScrapingSessionInputObjectSchema: z.ZodType<Prisma.CommentUpsertWithWhereUniqueWithoutScrapingSessionInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentUpsertWithWhereUniqueWithoutScrapingSessionInput>;
export const CommentUpsertWithWhereUniqueWithoutScrapingSessionInputObjectZodSchema = makeSchema();
