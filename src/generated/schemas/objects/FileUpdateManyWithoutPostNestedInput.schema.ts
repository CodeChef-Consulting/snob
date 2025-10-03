import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FileCreateWithoutPostInputObjectSchema as FileCreateWithoutPostInputObjectSchema } from './FileCreateWithoutPostInput.schema';
import { FileUncheckedCreateWithoutPostInputObjectSchema as FileUncheckedCreateWithoutPostInputObjectSchema } from './FileUncheckedCreateWithoutPostInput.schema';
import { FileCreateOrConnectWithoutPostInputObjectSchema as FileCreateOrConnectWithoutPostInputObjectSchema } from './FileCreateOrConnectWithoutPostInput.schema';
import { FileUpsertWithWhereUniqueWithoutPostInputObjectSchema as FileUpsertWithWhereUniqueWithoutPostInputObjectSchema } from './FileUpsertWithWhereUniqueWithoutPostInput.schema';
import { FileCreateManyPostInputEnvelopeObjectSchema as FileCreateManyPostInputEnvelopeObjectSchema } from './FileCreateManyPostInputEnvelope.schema';
import { FileWhereUniqueInputObjectSchema as FileWhereUniqueInputObjectSchema } from './FileWhereUniqueInput.schema';
import { FileUpdateWithWhereUniqueWithoutPostInputObjectSchema as FileUpdateWithWhereUniqueWithoutPostInputObjectSchema } from './FileUpdateWithWhereUniqueWithoutPostInput.schema';
import { FileUpdateManyWithWhereWithoutPostInputObjectSchema as FileUpdateManyWithWhereWithoutPostInputObjectSchema } from './FileUpdateManyWithWhereWithoutPostInput.schema';
import { FileScalarWhereInputObjectSchema as FileScalarWhereInputObjectSchema } from './FileScalarWhereInput.schema'

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
export const FileUpdateManyWithoutPostNestedInputObjectSchema: z.ZodType<Prisma.FileUpdateManyWithoutPostNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.FileUpdateManyWithoutPostNestedInput>;
export const FileUpdateManyWithoutPostNestedInputObjectZodSchema = makeSchema();
