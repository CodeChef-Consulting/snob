import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentWhereUniqueInputObjectSchema as CommentWhereUniqueInputObjectSchema } from './CommentWhereUniqueInput.schema';
import { CommentCreateWithoutFilesInputObjectSchema as CommentCreateWithoutFilesInputObjectSchema } from './CommentCreateWithoutFilesInput.schema';
import { CommentUncheckedCreateWithoutFilesInputObjectSchema as CommentUncheckedCreateWithoutFilesInputObjectSchema } from './CommentUncheckedCreateWithoutFilesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CommentWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CommentCreateWithoutFilesInputObjectSchema), z.lazy(() => CommentUncheckedCreateWithoutFilesInputObjectSchema)])
}).strict();
export const CommentCreateOrConnectWithoutFilesInputObjectSchema: z.ZodType<Prisma.CommentCreateOrConnectWithoutFilesInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentCreateOrConnectWithoutFilesInput>;
export const CommentCreateOrConnectWithoutFilesInputObjectZodSchema = makeSchema();
