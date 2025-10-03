import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FileWhereUniqueInputObjectSchema as FileWhereUniqueInputObjectSchema } from './FileWhereUniqueInput.schema';
import { FileUpdateWithoutPostInputObjectSchema as FileUpdateWithoutPostInputObjectSchema } from './FileUpdateWithoutPostInput.schema';
import { FileUncheckedUpdateWithoutPostInputObjectSchema as FileUncheckedUpdateWithoutPostInputObjectSchema } from './FileUncheckedUpdateWithoutPostInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => FileWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => FileUpdateWithoutPostInputObjectSchema), z.lazy(() => FileUncheckedUpdateWithoutPostInputObjectSchema)])
}).strict();
export const FileUpdateWithWhereUniqueWithoutPostInputObjectSchema: z.ZodType<Prisma.FileUpdateWithWhereUniqueWithoutPostInput> = makeSchema() as unknown as z.ZodType<Prisma.FileUpdateWithWhereUniqueWithoutPostInput>;
export const FileUpdateWithWhereUniqueWithoutPostInputObjectZodSchema = makeSchema();
