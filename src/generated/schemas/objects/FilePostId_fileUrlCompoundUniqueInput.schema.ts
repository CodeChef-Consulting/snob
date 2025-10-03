import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  postId: z.number().int(),
  fileUrl: z.string()
}).strict();
export const FilePostId_fileUrlCompoundUniqueInputObjectSchema: z.ZodType<Prisma.FilePostId_fileUrlCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.FilePostId_fileUrlCompoundUniqueInput>;
export const FilePostId_fileUrlCompoundUniqueInputObjectZodSchema = makeSchema();
