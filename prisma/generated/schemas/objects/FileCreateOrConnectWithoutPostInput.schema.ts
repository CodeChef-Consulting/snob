import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FileWhereUniqueInputObjectSchema as FileWhereUniqueInputObjectSchema } from './FileWhereUniqueInput.schema';
import { FileCreateWithoutPostInputObjectSchema as FileCreateWithoutPostInputObjectSchema } from './FileCreateWithoutPostInput.schema';
import { FileUncheckedCreateWithoutPostInputObjectSchema as FileUncheckedCreateWithoutPostInputObjectSchema } from './FileUncheckedCreateWithoutPostInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => FileWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => FileCreateWithoutPostInputObjectSchema), z.lazy(() => FileUncheckedCreateWithoutPostInputObjectSchema)])
}).strict();
export const FileCreateOrConnectWithoutPostInputObjectSchema: z.ZodType<Prisma.FileCreateOrConnectWithoutPostInput> = makeSchema() as unknown as z.ZodType<Prisma.FileCreateOrConnectWithoutPostInput>;
export const FileCreateOrConnectWithoutPostInputObjectZodSchema = makeSchema();
