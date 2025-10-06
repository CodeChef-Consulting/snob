import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PostScalarWhereInputObjectSchema as PostScalarWhereInputObjectSchema } from './PostScalarWhereInput.schema';
import { PostUpdateManyMutationInputObjectSchema as PostUpdateManyMutationInputObjectSchema } from './PostUpdateManyMutationInput.schema';
import { PostUncheckedUpdateManyWithoutScrapingSessionInputObjectSchema as PostUncheckedUpdateManyWithoutScrapingSessionInputObjectSchema } from './PostUncheckedUpdateManyWithoutScrapingSessionInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PostScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => PostUpdateManyMutationInputObjectSchema), z.lazy(() => PostUncheckedUpdateManyWithoutScrapingSessionInputObjectSchema)])
}).strict();
export const PostUpdateManyWithWhereWithoutScrapingSessionInputObjectSchema: z.ZodType<Prisma.PostUpdateManyWithWhereWithoutScrapingSessionInput> = makeSchema() as unknown as z.ZodType<Prisma.PostUpdateManyWithWhereWithoutScrapingSessionInput>;
export const PostUpdateManyWithWhereWithoutScrapingSessionInputObjectZodSchema = makeSchema();
