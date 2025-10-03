import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  commentId: z.number().int(),
  fileUrl: z.string()
}).strict();
export const FileCommentId_fileUrlCompoundUniqueInputObjectSchema: z.ZodType<Prisma.FileCommentId_fileUrlCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.FileCommentId_fileUrlCompoundUniqueInput>;
export const FileCommentId_fileUrlCompoundUniqueInputObjectZodSchema = makeSchema();
