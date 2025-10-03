import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ScrapingSessionCreateManyInputObjectSchema as ScrapingSessionCreateManyInputObjectSchema } from './objects/ScrapingSessionCreateManyInput.schema';

export const ScrapingSessionCreateManySchema: z.ZodType<Prisma.ScrapingSessionCreateManyArgs> = z.object({ data: z.union([ ScrapingSessionCreateManyInputObjectSchema, z.array(ScrapingSessionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.ScrapingSessionCreateManyArgs>;

export const ScrapingSessionCreateManyZodSchema = z.object({ data: z.union([ ScrapingSessionCreateManyInputObjectSchema, z.array(ScrapingSessionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();