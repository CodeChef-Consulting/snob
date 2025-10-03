import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ScrapingSessionUpdateManyMutationInputObjectSchema as ScrapingSessionUpdateManyMutationInputObjectSchema } from './objects/ScrapingSessionUpdateManyMutationInput.schema';
import { ScrapingSessionWhereInputObjectSchema as ScrapingSessionWhereInputObjectSchema } from './objects/ScrapingSessionWhereInput.schema';

export const ScrapingSessionUpdateManySchema: z.ZodType<Prisma.ScrapingSessionUpdateManyArgs> = z.object({ data: ScrapingSessionUpdateManyMutationInputObjectSchema, where: ScrapingSessionWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ScrapingSessionUpdateManyArgs>;

export const ScrapingSessionUpdateManyZodSchema = z.object({ data: ScrapingSessionUpdateManyMutationInputObjectSchema, where: ScrapingSessionWhereInputObjectSchema.optional() }).strict();