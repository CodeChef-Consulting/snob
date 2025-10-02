import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CommentCreateWithoutFilesInputObjectSchema } from './CommentCreateWithoutFilesInput.schema';
import { CommentUncheckedCreateWithoutFilesInputObjectSchema } from './CommentUncheckedCreateWithoutFilesInput.schema';
import { CommentCreateOrConnectWithoutFilesInputObjectSchema } from './CommentCreateOrConnectWithoutFilesInput.schema';
import { CommentUpsertWithoutFilesInputObjectSchema } from './CommentUpsertWithoutFilesInput.schema';
import { CommentWhereInputObjectSchema } from './CommentWhereInput.schema';
import { CommentWhereUniqueInputObjectSchema } from './CommentWhereUniqueInput.schema';
import { CommentUpdateToOneWithWhereWithoutFilesInputObjectSchema } from './CommentUpdateToOneWithWhereWithoutFilesInput.schema';
import { CommentUpdateWithoutFilesInputObjectSchema } from './CommentUpdateWithoutFilesInput.schema';
import { CommentUncheckedUpdateWithoutFilesInputObjectSchema } from './CommentUncheckedUpdateWithoutFilesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CommentCreateWithoutFilesInputObjectSchema), z.lazy(() => CommentUncheckedCreateWithoutFilesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CommentCreateOrConnectWithoutFilesInputObjectSchema).optional(),
  upsert: z.lazy(() => CommentUpsertWithoutFilesInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => CommentWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => CommentWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => CommentWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => CommentUpdateToOneWithWhereWithoutFilesInputObjectSchema), z.lazy(() => CommentUpdateWithoutFilesInputObjectSchema), z.lazy(() => CommentUncheckedUpdateWithoutFilesInputObjectSchema)]).optional()
}).strict();
export const CommentUpdateOneWithoutFilesNestedInputObjectSchema: z.ZodType<Prisma.CommentUpdateOneWithoutFilesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentUpdateOneWithoutFilesNestedInput>;
export const CommentUpdateOneWithoutFilesNestedInputObjectZodSchema = makeSchema();
