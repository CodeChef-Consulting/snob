import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentScalarWhereInputObjectSchema as CommentScalarWhereInputObjectSchema } from './CommentScalarWhereInput.schema';
import { CommentUpdateManyMutationInputObjectSchema as CommentUpdateManyMutationInputObjectSchema } from './CommentUpdateManyMutationInput.schema';
import { CommentUncheckedUpdateManyWithoutScrapingSessionInputObjectSchema as CommentUncheckedUpdateManyWithoutScrapingSessionInputObjectSchema } from './CommentUncheckedUpdateManyWithoutScrapingSessionInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CommentScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => CommentUpdateManyMutationInputObjectSchema), z.lazy(() => CommentUncheckedUpdateManyWithoutScrapingSessionInputObjectSchema)])
}).strict();
export const CommentUpdateManyWithWhereWithoutScrapingSessionInputObjectSchema: z.ZodType<Prisma.CommentUpdateManyWithWhereWithoutScrapingSessionInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentUpdateManyWithWhereWithoutScrapingSessionInput>;
export const CommentUpdateManyWithWhereWithoutScrapingSessionInputObjectZodSchema = makeSchema();
