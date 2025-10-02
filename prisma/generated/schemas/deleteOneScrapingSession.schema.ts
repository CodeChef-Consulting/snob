import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ScrapingSessionSelectObjectSchema as ScrapingSessionSelectObjectSchema } from './objects/ScrapingSessionSelect.schema';
import { ScrapingSessionIncludeObjectSchema as ScrapingSessionIncludeObjectSchema } from './objects/ScrapingSessionInclude.schema';
import { ScrapingSessionWhereUniqueInputObjectSchema as ScrapingSessionWhereUniqueInputObjectSchema } from './objects/ScrapingSessionWhereUniqueInput.schema';

export const ScrapingSessionDeleteOneSchema: z.ZodType<Prisma.ScrapingSessionDeleteArgs> = z.object({ select: ScrapingSessionSelectObjectSchema.optional(), include: ScrapingSessionIncludeObjectSchema.optional(), where: ScrapingSessionWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ScrapingSessionDeleteArgs>;

export const ScrapingSessionDeleteOneZodSchema = z.object({ select: ScrapingSessionSelectObjectSchema.optional(), include: ScrapingSessionIncludeObjectSchema.optional(), where: ScrapingSessionWhereUniqueInputObjectSchema }).strict();