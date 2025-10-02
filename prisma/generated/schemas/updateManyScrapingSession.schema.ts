import { z } from 'zod';
import { ScrapingSessionUpdateManyMutationInputObjectSchema } from './objects/ScrapingSessionUpdateManyMutationInput.schema';
import { ScrapingSessionWhereInputObjectSchema } from './objects/ScrapingSessionWhereInput.schema';

export const ScrapingSessionUpdateManySchema = z.object({ data: ScrapingSessionUpdateManyMutationInputObjectSchema, where: ScrapingSessionWhereInputObjectSchema.optional()  })