import { z } from 'zod';
import { FileSelectObjectSchema } from './objects/FileSelect.schema';
import { FileUpdateManyMutationInputObjectSchema } from './objects/FileUpdateManyMutationInput.schema';
import { FileWhereInputObjectSchema } from './objects/FileWhereInput.schema';

export const FileUpdateManyAndReturnSchema = z.object({ select: FileSelectObjectSchema.optional(), data: FileUpdateManyMutationInputObjectSchema, where: FileWhereInputObjectSchema.optional()  }).strict()