import { z } from 'zod';
export const FileDeleteManyResultSchema = z.object({
  count: z.number()
});