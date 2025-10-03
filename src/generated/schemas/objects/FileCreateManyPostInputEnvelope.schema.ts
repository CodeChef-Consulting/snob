import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PostFileCreateManyPostInputObjectSchema as FileCreateManyPostInputObjectSchema } from './FileCreateManyPostInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => FileCreateManyPostInputObjectSchema), z.lazy(() => FileCreateManyPostInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const FileCreateManyPostInputEnvelopeObjectSchema: z.ZodType<Prisma.FileCreateManyPostInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.FileCreateManyPostInputEnvelope>;
export const FileCreateManyPostInputEnvelopeObjectZodSchema = makeSchema();
