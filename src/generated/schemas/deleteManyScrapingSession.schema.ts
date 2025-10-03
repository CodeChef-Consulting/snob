import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ScrapingSessionWhereInputObjectSchema as ScrapingSessionWhereInputObjectSchema } from './objects/ScrapingSessionWhereInput.schema';

export const ScrapingSessionDeleteManySchema: z.ZodType<Prisma.ScrapingSessionDeleteManyArgs> = z.object({ where: ScrapingSessionWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ScrapingSessionDeleteManyArgs>;

export const ScrapingSessionDeleteManyZodSchema = z.object({ where: ScrapingSessionWhereInputObjectSchema.optional() }).strict();