import { PrismaClient } from '@repo/db';
import { Prisma } from '@repo/db';

/**
 * Calculate Haversine distance between two lat/lng points using PostgreSQL
 * Returns distance in meters
 */
export async function calculateDistance(
  prisma: PrismaClient | Prisma.TransactionClient,
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): Promise<number> {
  const distanceResult = await prisma.$queryRaw<Array<{ distance_meters: number }>>`
    SELECT (
      6371000 * acos(
        cos(radians(${lat1})) * cos(radians(${lat2})) *
        cos(radians(${lng2}) - radians(${lng1})) +
        sin(radians(${lat1})) * sin(radians(${lat2}))
      )
    ) as distance_meters
  `;

  return distanceResult[0]?.distance_meters ?? Infinity;
}

/**
 * Generate SQL fragment for Haversine distance calculation
 * Use this in larger queries where you need distance as part of the SELECT
 */
export function haversineDistanceSQL(
  lat1: number,
  lng1: number,
  lat2Field: string = 'latitude',
  lng2Field: string = 'longitude'
): string {
  return `(
    6371000 * acos(
      cos(radians(${lat1})) * cos(radians(${lat2Field})) *
      cos(radians(${lng2Field}) - radians(${lng1})) +
      sin(radians(${lat1})) * sin(radians(${lat2Field}))
    )
  )`;
}
