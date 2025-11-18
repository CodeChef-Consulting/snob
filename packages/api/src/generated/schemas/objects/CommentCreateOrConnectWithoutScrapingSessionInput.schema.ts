import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentWhereUniqueInputObjectSchema as CommentWhereUniqueInputObjectSchema } from './CommentWhereUniqueInput.schema';
import { CommentCreateWithoutScrapingSessionInputObjectSchema as CommentCreateWithoutScrapingSessionInputObjectSchema } from './CommentCreateWithoutScrapingSessionInput.schema';
import { CommentUncheckedCreateWithoutScrapingSessionInputObjectSchema as CommentUncheckedCreateWithoutScrapingSessionInputObjectSchema } from './CommentUncheckedCreateWithoutScrapingSessionInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CommentWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CommentCreateWithoutScrapingSessionInputObjectSchema), z.lazy(() => CommentUncheckedCreateWithoutScrapingSessionInputObjectSchema)])
}).strict();
export const CommentCreateOrConnectWithoutScrapingSessionInputObjectSchema: z.ZodType<Prisma.CommentCreateOrConnectWithoutScrapingSessionInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentCreateOrConnectWithoutScrapingSessionInput>;
export const CommentCreateOrConnectWithoutScrapingSessionInputObjectZodSchema = makeSchema();
