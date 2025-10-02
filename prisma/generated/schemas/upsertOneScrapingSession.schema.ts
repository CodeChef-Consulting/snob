import { z } from 'zod';
import { ScrapingSessionSelectObjectSchema } from './objects/ScrapingSessionSelect.schema';
import { ScrapingSessionWhereUniqueInputObjectSchema } from './objects/ScrapingSessionWhereUniqueInput.schema';
import { ScrapingSessionCreateInputObjectSchema } from './objects/ScrapingSessionCreateInput.schema';
import { ScrapingSessionUncheckedCreateInputObjectSchema } from './objects/ScrapingSessionUncheckedCreateInput.schema';
import { ScrapingSessionUpdateInputObjectSchema } from './objects/ScrapingSessionUpdateInput.schema';
import { ScrapingSessionUncheckedUpdateInputObjectSchema } from './objects/ScrapingSessionUncheckedUpdateInput.schema';

export const ScrapingSessionUpsertSchema = z.object({ select: ScrapingSessionSelectObjectSchema.optional(),  where: ScrapingSessionWhereUniqueInputObjectSchema, create: z.union([ ScrapingSessionCreateInputObjectSchema, ScrapingSessionUncheckedCreateInputObjectSchema ]), update: z.union([ ScrapingSessionUpdateInputObjectSchema, ScrapingSessionUncheckedUpdateInputObjectSchema ])  })