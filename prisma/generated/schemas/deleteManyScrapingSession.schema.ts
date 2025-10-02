import { z } from 'zod';
import { ScrapingSessionWhereInputObjectSchema } from './objects/ScrapingSessionWhereInput.schema';

export const ScrapingSessionDeleteManySchema = z.object({ where: ScrapingSessionWhereInputObjectSchema.optional()  })