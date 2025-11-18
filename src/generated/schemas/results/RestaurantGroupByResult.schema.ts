import * as z from 'zod';
export const RestaurantGroupByResultSchema = z.array(z.object({
  id: z.number().int(),
  name: z.string(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
  source: z.string(),
  googlePlaceId: z.string(),
  lookupAliases: z.string(),
  metadata: z.unknown(),
  rawScore: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    name: z.number(),
    address: z.number(),
    city: z.number(),
    state: z.number(),
    zipCode: z.number(),
    source: z.number(),
    googlePlaceId: z.number(),
    lookupAliases: z.number(),
    metadata: z.number(),
    rawScore: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    posts: z.number(),
    comments: z.number()
  }).optional(),
  _sum: z.object({
    id: z.number().nullable(),
    rawScore: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    id: z.number().nullable(),
    rawScore: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.number().int().nullable(),
    name: z.string().nullable(),
    address: z.string().nullable(),
    city: z.string().nullable(),
    state: z.string().nullable(),
    zipCode: z.string().nullable(),
    source: z.string().nullable(),
    googlePlaceId: z.string().nullable(),
    lookupAliases: z.string().nullable(),
    rawScore: z.number().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.number().int().nullable(),
    name: z.string().nullable(),
    address: z.string().nullable(),
    city: z.string().nullable(),
    state: z.string().nullable(),
    zipCode: z.string().nullable(),
    source: z.string().nullable(),
    googlePlaceId: z.string().nullable(),
    lookupAliases: z.string().nullable(),
    rawScore: z.number().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
}));