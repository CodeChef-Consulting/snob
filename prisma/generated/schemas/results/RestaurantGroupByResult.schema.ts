import * as z from 'zod';
export const RestaurantGroupByResultSchema = z.array(z.object({
  id: z.number().int(),
  name: z.string(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
  phone: z.string(),
  website: z.string(),
  cuisine: z.string(),
  priceRange: z.string(),
  metadata: z.unknown(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    name: z.number(),
    address: z.number(),
    city: z.number(),
    state: z.number(),
    zipCode: z.number(),
    phone: z.number(),
    website: z.number(),
    cuisine: z.number(),
    priceRange: z.number(),
    metadata: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    posts: z.number(),
    scrapeSessions: z.number()
  }).optional(),
  _sum: z.object({
    id: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    id: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.number().int().nullable(),
    name: z.string().nullable(),
    address: z.string().nullable(),
    city: z.string().nullable(),
    state: z.string().nullable(),
    zipCode: z.string().nullable(),
    phone: z.string().nullable(),
    website: z.string().nullable(),
    cuisine: z.string().nullable(),
    priceRange: z.string().nullable(),
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
    phone: z.string().nullable(),
    website: z.string().nullable(),
    cuisine: z.string().nullable(),
    priceRange: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
}));