import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ScrapingSessionSelectObjectSchema as ScrapingSessionSelectObjectSchema } from './objects/ScrapingSessionSelect.schema';
import { ScrapingSessionUpdateManyMutationInputObjectSchema as ScrapingSessionUpdateManyMutationInputObjectSchema } from './objects/ScrapingSessionUpdateManyMutationInput.schema';
import { ScrapingSessionWhereInputObjectSchema as ScrapingSessionWhereInputObjectSchema } from './objects/ScrapingSessionWhereInput.schema';

export const ScrapingSessionUpdateManyAndReturnSchema: z.ZodType<Prisma.ScrapingSessionUpdateManyAndReturnArgs> = z.object({ select: ScrapingSessionSelectObjectSchema.optional(), data: ScrapingSessionUpdateManyMutationInputObjectSchema, where: ScrapingSessionWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ScrapingSessionUpdateManyAndReturnArgs>;

export const ScrapingSessionUpdateManyAndReturnZodSchema = z.object({ select: ScrapingSessionSelectObjectSchema.optional(), data: ScrapingSessionUpdateManyMutationInputObjectSchema, where: ScrapingSessionWhereInputObjectSchema.optional() }).strict();