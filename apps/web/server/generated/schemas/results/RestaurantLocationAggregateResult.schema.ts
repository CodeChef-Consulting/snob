import * as z from 'zod';
export const RestaurantLocationAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    name: z.number(),
    address: z.number(),
    city: z.number(),
    state: z.number(),
    zipCode: z.number(),
    latitude: z.number(),
    longitude: z.number(),
    source: z.number(),
    googlePlaceId: z.number(),
    lookupAliases: z.number(),
    metadata: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    group: z.number(),
    groupId: z.number()
  }).optional(),
  _sum: z.object({
    id: z.number().nullable(),
    latitude: z.number().nullable(),
    longitude: z.number().nullable(),
    groupId: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    id: z.number().nullable(),
    latitude: z.number().nullable(),
    longitude: z.number().nullable(),
    groupId: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.number().int().nullable(),
    name: z.string().nullable(),
    address: z.string().nullable(),
    city: z.string().nullable(),
    state: z.string().nullable(),
    zipCode: z.string().nullable(),
    latitude: z.number().nullable(),
    longitude: z.number().nullable(),
    source: z.string().nullable(),
    googlePlaceId: z.string().nullable(),
    lookupAliases: z.array(z.string()).nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable(),
    groupId: z.number().int().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.number().int().nullable(),
    name: z.string().nullable(),
    address: z.string().nullable(),
    city: z.string().nullable(),
    state: z.string().nullable(),
    zipCode: z.string().nullable(),
    latitude: z.number().nullable(),
    longitude: z.number().nullable(),
    source: z.string().nullable(),
    googlePlaceId: z.string().nullable(),
    lookupAliases: z.array(z.string()).nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable(),
    groupId: z.number().int().nullable()
  }).nullable().optional()});