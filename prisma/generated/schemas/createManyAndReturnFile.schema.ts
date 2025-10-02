import { z } from 'zod';
import { FileSelectObjectSchema } from './objects/FileSelect.schema';
import { FileCreateManyInputObjectSchema } from './objects/FileCreateManyInput.schema';

export const FileCreateManyAndReturnSchema = z.object({ select: FileSelectObjectSchema.optional(), data: z.union([ FileCreateManyInputObjectSchema, z.array(FileCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict()