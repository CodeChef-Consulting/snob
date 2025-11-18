import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ScrapingSessionSelectObjectSchema as ScrapingSessionSelectObjectSchema } from './objects/ScrapingSessionSelect.schema';
import { ScrapingSessionIncludeObjectSchema as ScrapingSessionIncludeObjectSchema } from './objects/ScrapingSessionInclude.schema';
import { ScrapingSessionWhereUniqueInputObjectSchema as ScrapingSessionWhereUniqueInputObjectSchema } from './objects/ScrapingSessionWhereUniqueInput.schema';

export const ScrapingSessionFindUniqueOrThrowSchema: z.ZodType<Prisma.ScrapingSessionFindUniqueOrThrowArgs> = z.object({ select: ScrapingSessionSelectObjectSchema.optional(), include: ScrapingSessionIncludeObjectSchema.optional(), where: ScrapingSessionWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ScrapingSessionFindUniqueOrThrowArgs>;

export const ScrapingSessionFindUniqueOrThrowZodSchema = z.object({ select: ScrapingSessionSelectObjectSchema.optional(), include: ScrapingSessionIncludeObjectSchema.optional(), where: ScrapingSessionWhereUniqueInputObjectSchema }).strict();