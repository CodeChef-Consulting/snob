import { z } from 'zod';
import { ScrapingSessionSelectObjectSchema } from './objects/ScrapingSessionSelect.schema';
import { ScrapingSessionUpdateInputObjectSchema } from './objects/ScrapingSessionUpdateInput.schema';
import { ScrapingSessionUncheckedUpdateInputObjectSchema } from './objects/ScrapingSessionUncheckedUpdateInput.schema';
import { ScrapingSessionWhereUniqueInputObjectSchema } from './objects/ScrapingSessionWhereUniqueInput.schema';

export const ScrapingSessionUpdateOneSchema = z.object({ select: ScrapingSessionSelectObjectSchema.optional(),  data: z.union([ScrapingSessionUpdateInputObjectSchema, ScrapingSessionUncheckedUpdateInputObjectSchema]), where: ScrapingSessionWhereUniqueInputObjectSchema  })