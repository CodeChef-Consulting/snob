import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FileCreateManyCommentInputObjectSchema as FileCreateManyCommentInputObjectSchema } from './FileCreateManyCommentInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => FileCreateManyCommentInputObjectSchema), z.lazy(() => FileCreateManyCommentInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const FileCreateManyCommentInputEnvelopeObjectSchema: z.ZodType<Prisma.FileCreateManyCommentInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.FileCreateManyCommentInputEnvelope>;
export const FileCreateManyCommentInputEnvelopeObjectZodSchema = makeSchema();
