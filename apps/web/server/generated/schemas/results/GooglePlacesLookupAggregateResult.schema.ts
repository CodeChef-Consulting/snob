import * as z from 'zod';
export const GooglePlacesLookupAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    year: z.number(),
    month: z.number(),
    googleSKU: z.number(),
    count: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _sum: z.object({
    id: z.number().nullable(),
    year: z.number().nullable(),
    month: z.number().nullable(),
    count: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    id: z.number().nullable(),
    year: z.number().nullable(),
    month: z.number().nullable(),
    count: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.number().int().nullable(),
    year: z.number().int().nullable(),
    month: z.number().int().nullable(),
    googleSKU: z.string().nullable(),
    count: z.number().int().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.number().int().nullable(),
    year: z.number().int().nullable(),
    month: z.number().int().nullable(),
    googleSKU: z.string().nullable(),
    count: z.number().int().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()});