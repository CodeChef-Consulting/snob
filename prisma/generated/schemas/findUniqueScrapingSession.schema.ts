import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ScrapingSessionSelectObjectSchema } from './objects/ScrapingSessionSelect.schema';
import { ScrapingSessionWhereUniqueInputObjectSchema } from './objects/ScrapingSessionWhereUniqueInput.schema';

export const ScrapingSessionFindUniqueSchema: z.ZodType<Prisma.ScrapingSessionFindUniqueArgs> = z.object({ select: ScrapingSessionSelectObjectSchema.optional(),  where: ScrapingSessionWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ScrapingSessionFindUniqueArgs>;

export const ScrapingSessionFindUniqueZodSchema = z.object({ select: ScrapingSessionSelectObjectSchema.optional(),  where: ScrapingSessionWhereUniqueInputObjectSchema }).strict();