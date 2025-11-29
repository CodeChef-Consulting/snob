import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentWhereUniqueInputObjectSchema as CommentWhereUniqueInputObjectSchema } from './CommentWhereUniqueInput.schema';
import { CommentUpdateWithoutScrapingSessionInputObjectSchema as CommentUpdateWithoutScrapingSessionInputObjectSchema } from './CommentUpdateWithoutScrapingSessionInput.schema';
import { CommentUncheckedUpdateWithoutScrapingSessionInputObjectSchema as CommentUncheckedUpdateWithoutScrapingSessionInputObjectSchema } from './CommentUncheckedUpdateWithoutScrapingSessionInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CommentWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CommentUpdateWithoutScrapingSessionInputObjectSchema), z.lazy(() => CommentUncheckedUpdateWithoutScrapingSessionInputObjectSchema)])
}).strict();
export const CommentUpdateWithWhereUniqueWithoutScrapingSessionInputObjectSchema: z.ZodType<Prisma.CommentUpdateWithWhereUniqueWithoutScrapingSessionInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentUpdateWithWhereUniqueWithoutScrapingSessionInput>;
export const CommentUpdateWithWhereUniqueWithoutScrapingSessionInputObjectZodSchema = makeSchema();
