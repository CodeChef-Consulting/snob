import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { FileScalarWhereInputObjectSchema as FileScalarWhereInputObjectSchema } from './FileScalarWhereInput.schema';
import { FileUpdateManyMutationInputObjectSchema as FileUpdateManyMutationInputObjectSchema } from './FileUpdateManyMutationInput.schema';
import { FileUncheckedUpdateManyWithoutCommentInputObjectSchema as FileUncheckedUpdateManyWithoutCommentInputObjectSchema } from './FileUncheckedUpdateManyWithoutCommentInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => FileScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => FileUpdateManyMutationInputObjectSchema), z.lazy(() => FileUncheckedUpdateManyWithoutCommentInputObjectSchema)])
}).strict();
export const FileUpdateManyWithWhereWithoutCommentInputObjectSchema: z.ZodType<Prisma.FileUpdateManyWithWhereWithoutCommentInput> = makeSchema() as unknown as z.ZodType<Prisma.FileUpdateManyWithWhereWithoutCommentInput>;
export const FileUpdateManyWithWhereWithoutCommentInputObjectZodSchema = makeSchema();
