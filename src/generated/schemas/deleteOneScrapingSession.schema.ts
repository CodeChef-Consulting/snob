import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ScrapingSessionSelectObjectSchema as ScrapingSessionSelectObjectSchema } from './objects/ScrapingSessionSelect.schema';
import { ScrapingSessionWhereUniqueInputObjectSchema as ScrapingSessionWhereUniqueInputObjectSchema } from './objects/ScrapingSessionWhereUniqueInput.schema';

export const ScrapingSessionDeleteOneSchema: z.ZodType<Prisma.ScrapingSessionDeleteArgs> = z.object({ select: ScrapingSessionSelectObjectSchema.optional(),  where: ScrapingSessionWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ScrapingSessionDeleteArgs>;

export const ScrapingSessionDeleteOneZodSchema = z.object({ select: ScrapingSessionSelectObjectSchema.optional(),  where: ScrapingSessionWhereUniqueInputObjectSchema }).strict();