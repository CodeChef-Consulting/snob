import { z } from 'zod';
import { ScrapingSessionSelectObjectSchema } from './objects/ScrapingSessionSelect.schema';
import { ScrapingSessionWhereUniqueInputObjectSchema } from './objects/ScrapingSessionWhereUniqueInput.schema';

export const ScrapingSessionDeleteOneSchema = z.object({ select: ScrapingSessionSelectObjectSchema.optional(),  where: ScrapingSessionWhereUniqueInputObjectSchema  })