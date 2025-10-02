import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ScrapingSessionSelectObjectSchema } from './objects/ScrapingSessionSelect.schema';
import { ScrapingSessionWhereUniqueInputObjectSchema } from './objects/ScrapingSessionWhereUniqueInput.schema';

export const ScrapingSessionFindUniqueOrThrowSchema: z.ZodType<Prisma.ScrapingSessionFindUniqueOrThrowArgs> = z.object({ select: ScrapingSessionSelectObjectSchema.optional(),  where: ScrapingSessionWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ScrapingSessionFindUniqueOrThrowArgs>;

export const ScrapingSessionFindUniqueOrThrowZodSchema = z.object({ select: ScrapingSessionSelectObjectSchema.optional(),  where: ScrapingSessionWhereUniqueInputObjectSchema }).strict();