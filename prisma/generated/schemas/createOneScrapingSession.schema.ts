import { z } from 'zod';
import { ScrapingSessionSelectObjectSchema } from './objects/ScrapingSessionSelect.schema';
import { ScrapingSessionCreateInputObjectSchema } from './objects/ScrapingSessionCreateInput.schema';
import { ScrapingSessionUncheckedCreateInputObjectSchema } from './objects/ScrapingSessionUncheckedCreateInput.schema';

export const ScrapingSessionCreateOneSchema = z.object({ select: ScrapingSessionSelectObjectSchema.optional(),  data: z.union([ScrapingSessionCreateInputObjectSchema, ScrapingSessionUncheckedCreateInputObjectSchema])  })