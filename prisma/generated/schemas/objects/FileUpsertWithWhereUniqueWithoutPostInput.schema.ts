import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { FileWhereUniqueInputObjectSchema } from './FileWhereUniqueInput.schema';
import { FileUpdateWithoutPostInputObjectSchema } from './FileUpdateWithoutPostInput.schema';
import { FileUncheckedUpdateWithoutPostInputObjectSchema } from './FileUncheckedUpdateWithoutPostInput.schema';
import { FileCreateWithoutPostInputObjectSchema } from './FileCreateWithoutPostInput.schema';
import { FileUncheckedCreateWithoutPostInputObjectSchema } from './FileUncheckedCreateWithoutPostInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => FileWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => FileUpdateWithoutPostInputObjectSchema), z.lazy(() => FileUncheckedUpdateWithoutPostInputObjectSchema)]),
  create: z.union([z.lazy(() => FileCreateWithoutPostInputObjectSchema), z.lazy(() => FileUncheckedCreateWithoutPostInputObjectSchema)])
}).strict();
export const FileUpsertWithWhereUniqueWithoutPostInputObjectSchema: z.ZodType<Prisma.FileUpsertWithWhereUniqueWithoutPostInput> = makeSchema() as unknown as z.ZodType<Prisma.FileUpsertWithWhereUniqueWithoutPostInput>;
export const FileUpsertWithWhereUniqueWithoutPostInputObjectZodSchema = makeSchema();
