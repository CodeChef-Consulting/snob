import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ScrapingSessionSelectObjectSchema as ScrapingSessionSelectObjectSchema } from './objects/ScrapingSessionSelect.schema';
import { ScrapingSessionIncludeObjectSchema as ScrapingSessionIncludeObjectSchema } from './objects/ScrapingSessionInclude.schema';
import { ScrapingSessionUpdateInputObjectSchema as ScrapingSessionUpdateInputObjectSchema } from './objects/ScrapingSessionUpdateInput.schema';
import { ScrapingSessionUncheckedUpdateInputObjectSchema as ScrapingSessionUncheckedUpdateInputObjectSchema } from './objects/ScrapingSessionUncheckedUpdateInput.schema';
import { ScrapingSessionWhereUniqueInputObjectSchema as ScrapingSessionWhereUniqueInputObjectSchema } from './objects/ScrapingSessionWhereUniqueInput.schema';

export const ScrapingSessionUpdateOneSchema: z.ZodType<Prisma.ScrapingSessionUpdateArgs> = z.object({ select: ScrapingSessionSelectObjectSchema.optional(), include: ScrapingSessionIncludeObjectSchema.optional(), data: z.union([ScrapingSessionUpdateInputObjectSchema, ScrapingSessionUncheckedUpdateInputObjectSchema]), where: ScrapingSessionWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ScrapingSessionUpdateArgs>;

export const ScrapingSessionUpdateOneZodSchema = z.object({ select: ScrapingSessionSelectObjectSchema.optional(), include: ScrapingSessionIncludeObjectSchema.optional(), data: z.union([ScrapingSessionUpdateInputObjectSchema, ScrapingSessionUncheckedUpdateInputObjectSchema]), where: ScrapingSessionWhereUniqueInputObjectSchema }).strict();