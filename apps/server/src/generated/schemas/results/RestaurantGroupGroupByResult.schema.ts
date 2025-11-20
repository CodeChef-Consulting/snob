import * as z from 'zod';
export const RestaurantGroupGroupByResultSchema = z.array(z.object({
  id: z.number().int(),
  name: z.string(),
  rawScore: z.number(),
  normalizedScore: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    name: z.number(),
    rawScore: z.number(),
    normalizedScore: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    locations: z.number(),
    posts: z.number(),
    comments: z.number()
  }).optional(),
  _sum: z.object({
    id: z.number().nullable(),
    rawScore: z.number().nullable(),
    normalizedScore: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    id: z.number().nullable(),
    rawScore: z.number().nullable(),
    normalizedScore: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.number().int().nullable(),
    name: z.string().nullable(),
    rawScore: z.number().nullable(),
    normalizedScore: z.number().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.number().int().nullable(),
    name: z.string().nullable(),
    rawScore: z.number().nullable(),
    normalizedScore: z.number().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
}));