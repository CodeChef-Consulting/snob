import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ScrapingSessionSelectObjectSchema as ScrapingSessionSelectObjectSchema } from './objects/ScrapingSessionSelect.schema';
import { ScrapingSessionWhereUniqueInputObjectSchema as ScrapingSessionWhereUniqueInputObjectSchema } from './objects/ScrapingSessionWhereUniqueInput.schema';
import { ScrapingSessionCreateInputObjectSchema as ScrapingSessionCreateInputObjectSchema } from './objects/ScrapingSessionCreateInput.schema';
import { ScrapingSessionUncheckedCreateInputObjectSchema as ScrapingSessionUncheckedCreateInputObjectSchema } from './objects/ScrapingSessionUncheckedCreateInput.schema';
import { ScrapingSessionUpdateInputObjectSchema as ScrapingSessionUpdateInputObjectSchema } from './objects/ScrapingSessionUpdateInput.schema';
import { ScrapingSessionUncheckedUpdateInputObjectSchema as ScrapingSessionUncheckedUpdateInputObjectSchema } from './objects/ScrapingSessionUncheckedUpdateInput.schema';

export const ScrapingSessionUpsertOneSchema: z.ZodType<Prisma.ScrapingSessionUpsertArgs> = z.object({ select: ScrapingSessionSelectObjectSchema.optional(),  where: ScrapingSessionWhereUniqueInputObjectSchema, create: z.union([ ScrapingSessionCreateInputObjectSchema, ScrapingSessionUncheckedCreateInputObjectSchema ]), update: z.union([ ScrapingSessionUpdateInputObjectSchema, ScrapingSessionUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.ScrapingSessionUpsertArgs>;

export const ScrapingSessionUpsertOneZodSchema = z.object({ select: ScrapingSessionSelectObjectSchema.optional(),  where: ScrapingSessionWhereUniqueInputObjectSchema, create: z.union([ ScrapingSessionCreateInputObjectSchema, ScrapingSessionUncheckedCreateInputObjectSchema ]), update: z.union([ ScrapingSessionUpdateInputObjectSchema, ScrapingSessionUncheckedUpdateInputObjectSchema ]) }).strict();
// Alias for prisma-trpc-generator compatibility
export const ScrapingSessionUpsertSchema = ScrapingSessionUpsertOneSchema;
