import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FileCreateWithoutPostInputObjectSchema as FileCreateWithoutPostInputObjectSchema } from './FileCreateWithoutPostInput.schema';
import { FileUncheckedCreateWithoutPostInputObjectSchema as FileUncheckedCreateWithoutPostInputObjectSchema } from './FileUncheckedCreateWithoutPostInput.schema';
import { FileCreateOrConnectWithoutPostInputObjectSchema as FileCreateOrConnectWithoutPostInputObjectSchema } from './FileCreateOrConnectWithoutPostInput.schema';
import { FileCreateManyPostInputEnvelopeObjectSchema as FileCreateManyPostInputEnvelopeObjectSchema } from './FileCreateManyPostInputEnvelope.schema';
import { FileWhereUniqueInputObjectSchema as FileWhereUniqueInputObjectSchema } from './FileWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => FileCreateWithoutPostInputObjectSchema), z.lazy(() => FileCreateWithoutPostInputObjectSchema).array(), z.lazy(() => FileUncheckedCreateWithoutPostInputObjectSchema), z.lazy(() => FileUncheckedCreateWithoutPostInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => FileCreateOrConnectWithoutPostInputObjectSchema), z.lazy(() => FileCreateOrConnectWithoutPostInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => FileCreateManyPostInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => FileWhereUniqueInputObjectSchema), z.lazy(() => FileWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const FileUncheckedCreateNestedManyWithoutPostInputObjectSchema: z.ZodType<Prisma.FileUncheckedCreateNestedManyWithoutPostInput> = makeSchema() as unknown as z.ZodType<Prisma.FileUncheckedCreateNestedManyWithoutPostInput>;
export const FileUncheckedCreateNestedManyWithoutPostInputObjectZodSchema = makeSchema();
