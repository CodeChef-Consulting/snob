import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ScrapingSessionSelectObjectSchema as ScrapingSessionSelectObjectSchema } from './objects/ScrapingSessionSelect.schema';
import { ScrapingSessionCreateManyInputObjectSchema as ScrapingSessionCreateManyInputObjectSchema } from './objects/ScrapingSessionCreateManyInput.schema';

export const ScrapingSessionCreateManyAndReturnSchema: z.ZodType<Prisma.ScrapingSessionCreateManyAndReturnArgs> = z.object({ select: ScrapingSessionSelectObjectSchema.optional(), data: z.union([ ScrapingSessionCreateManyInputObjectSchema, z.array(ScrapingSessionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.ScrapingSessionCreateManyAndReturnArgs>;

export const ScrapingSessionCreateManyAndReturnZodSchema = z.object({ select: ScrapingSessionSelectObjectSchema.optional(), data: z.union([ ScrapingSessionCreateManyInputObjectSchema, z.array(ScrapingSessionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();