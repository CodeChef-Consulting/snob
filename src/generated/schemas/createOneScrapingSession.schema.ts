import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ScrapingSessionSelectObjectSchema as ScrapingSessionSelectObjectSchema } from './objects/ScrapingSessionSelect.schema';
import { ScrapingSessionCreateInputObjectSchema as ScrapingSessionCreateInputObjectSchema } from './objects/ScrapingSessionCreateInput.schema';
import { ScrapingSessionUncheckedCreateInputObjectSchema as ScrapingSessionUncheckedCreateInputObjectSchema } from './objects/ScrapingSessionUncheckedCreateInput.schema';

export const ScrapingSessionCreateOneSchema: z.ZodType<Prisma.ScrapingSessionCreateArgs> = z.object({ select: ScrapingSessionSelectObjectSchema.optional(),  data: z.union([ScrapingSessionCreateInputObjectSchema, ScrapingSessionUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.ScrapingSessionCreateArgs>;

export const ScrapingSessionCreateOneZodSchema = z.object({ select: ScrapingSessionSelectObjectSchema.optional(),  data: z.union([ScrapingSessionCreateInputObjectSchema, ScrapingSessionUncheckedCreateInputObjectSchema]) }).strict();