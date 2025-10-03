import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { FileScalarWhereInputObjectSchema as FileScalarWhereInputObjectSchema } from './FileScalarWhereInput.schema';
import { FileUpdateManyMutationInputObjectSchema as FileUpdateManyMutationInputObjectSchema } from './FileUpdateManyMutationInput.schema';
import { FileUncheckedUpdateManyWithoutPostInputObjectSchema as FileUncheckedUpdateManyWithoutPostInputObjectSchema } from './FileUncheckedUpdateManyWithoutPostInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => FileScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => FileUpdateManyMutationInputObjectSchema), z.lazy(() => FileUncheckedUpdateManyWithoutPostInputObjectSchema)])
}).strict();
export const FileUpdateManyWithWhereWithoutPostInputObjectSchema: z.ZodType<Prisma.FileUpdateManyWithWhereWithoutPostInput> = makeSchema() as unknown as z.ZodType<Prisma.FileUpdateManyWithWhereWithoutPostInput>;
export const FileUpdateManyWithWhereWithoutPostInputObjectZodSchema = makeSchema();
