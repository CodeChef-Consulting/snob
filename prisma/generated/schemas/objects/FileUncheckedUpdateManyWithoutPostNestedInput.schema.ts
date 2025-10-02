import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { FileCreateWithoutPostInputObjectSchema } from './FileCreateWithoutPostInput.schema';
import { FileUncheckedCreateWithoutPostInputObjectSchema } from './FileUncheckedCreateWithoutPostInput.schema';
import { FileCreateOrConnectWithoutPostInputObjectSchema } from './FileCreateOrConnectWithoutPostInput.schema';
import { FileUpsertWithWhereUniqueWithoutPostInputObjectSchema } from './FileUpsertWithWhereUniqueWithoutPostInput.schema';
import { FileCreateManyPostInputEnvelopeObjectSchema } from './FileCreateManyPostInputEnvelope.schema';
import { FileWhereUniqueInputObjectSchema } from './FileWhereUniqueInput.schema';
import { FileUpdateWithWhereUniqueWithoutPostInputObjectSchema } from './FileUpdateWithWhereUniqueWithoutPostInput.schema';
import { FileUpdateManyWithWhereWithoutPostInputObjectSchema } from './FileUpdateManyWithWhereWithoutPostInput.schema';
import { FileScalarWhereInputObjectSchema } from './FileScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => FileCreateWithoutPostInputObjectSchema), z.lazy(() => FileCreateWithoutPostInputObjectSchema).array(), z.lazy(() => FileUncheckedCreateWithoutPostInputObjectSchema), z.lazy(() => FileUncheckedCreateWithoutPostInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => FileCreateOrConnectWithoutPostInputObjectSchema), z.lazy(() => FileCreateOrConnectWithoutPostInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => FileUpsertWithWhereUniqueWithoutPostInputObjectSchema), z.lazy(() => FileUpsertWithWhereUniqueWithoutPostInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => FileCreateManyPostInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => FileWhereUniqueInputObjectSchema), z.lazy(() => FileWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => FileWhereUniqueInputObjectSchema), z.lazy(() => FileWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => FileWhereUniqueInputObjectSchema), z.lazy(() => FileWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => FileWhereUniqueInputObjectSchema), z.lazy(() => FileWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => FileUpdateWithWhereUniqueWithoutPostInputObjectSchema), z.lazy(() => FileUpdateWithWhereUniqueWithoutPostInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => FileUpdateManyWithWhereWithoutPostInputObjectSchema), z.lazy(() => FileUpdateManyWithWhereWithoutPostInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => FileScalarWhereInputObjectSchema), z.lazy(() => FileScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const FileUncheckedUpdateManyWithoutPostNestedInputObjectSchema: z.ZodType<Prisma.FileUncheckedUpdateManyWithoutPostNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.FileUncheckedUpdateManyWithoutPostNestedInput>;
export const FileUncheckedUpdateManyWithoutPostNestedInputObjectZodSchema = makeSchema();
