import { config } from '@dotenvx/dotenvx';
config({ path: ['../../.env'] });

import { PrismaClient } from '@repo/db';
import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse/sync';
import { startCase, toLower } from 'lodash';
import {
  ingestRestaurantGroupAndLocations,
  type PotentialRestaurant,
} from '../utils/restaurantGroupIngestion';

const prisma = new PrismaClient();

//TODO: this isn't a great source
interface RestaurantCSVRow {
  'LOCATION ACCOUNT #': string;
  'BUSINESS NAME': string;
  'DBA NAME': string;
  'STREET ADDRESS': string;
  CITY: string;
  'ZIP CODE': string;
  'LOCATION DESCRIPTION': string;
  'MAILING ADDRESS': string;
  'MAILING CITY': string;
  'MAILING ZIP CODE': string;
  NAICS: string;
  'PRIMARY NAICS DESCRIPTION': string;
  'COUNCIL DISTRICT': string;
  'LOCATION START DATE': string;
  'LOCATION END DATE': string;
  LOCATION: string;
}

async function ingestRestaurantLocationsAndGroups() {
  try {
    const csvPath = path.join(process.cwd(), 'Restaurants_in_LA_20251004.csv');
    const fileContent = fs.readFileSync(csvPath, 'utf-8');

    const records: RestaurantCSVRow[] = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });

    console.log(`Found ${records.length} restaurant locations to ingest`);

    let groupsCreated = 0;
    let locationsCreated = 0;
    let skipped = 0;

    for (const record of records) {
      try {
        // Use DBA name if available, otherwise business name
        const name = record['DBA NAME'] || record['BUSINESS NAME'];

        if (!name) {
          skipped++;
          continue;
        }

        // Parse location coordinates if available
        const locationMatch = record['LOCATION']?.match(
          /POINT \(([^ ]+) ([^ ]+)\)/
        );

        let latitude: number | null = null;
        let longitude: number | null = null;

        if (locationMatch && locationMatch[1] && locationMatch[2]) {
          longitude = parseFloat(locationMatch[1]);
          latitude = parseFloat(locationMatch[2]);
        }

        const metadata: any = {
          locationAccountNumber: record['LOCATION ACCOUNT #'],
          businessName: record['BUSINESS NAME'],
          dbaName: record['DBA NAME'],
          naics: record['NAICS'],
          naicsDescription: record['PRIMARY NAICS DESCRIPTION'],
          councilDistrict: record['COUNCIL DISTRICT'],
          locationStartDate: record['LOCATION START DATE'],
          locationEndDate: record['LOCATION END DATE'],
        };

        // Create potential restaurant object
        const potentialRestaurant: PotentialRestaurant = {
          name: startCase(toLower(name)),
          address: record['STREET ADDRESS']
            ? startCase(toLower(record['STREET ADDRESS']))
            : null,
          city: record['CITY'] ? startCase(toLower(record['CITY'])) : null,
          state: 'CA',
          zipCode: record['ZIP CODE'] || null,
          latitude,
          longitude,
          source: 'Open Data Portal',
          googlePlaceId: null,
          lookupAliases: [],
          metadata,
        };

        // Ingest using the utility function (now takes single restaurant)
        const result = await ingestRestaurantGroupAndLocations(
          potentialRestaurant,
          prisma,
          undefined // No chain mappings for CSV ingestion
        );

        // Phase 0 check is now done inside the utility
        if (!result.wasNewLocation) {
          console.log(
            `Location already exists: ${name} (${result.matchPhase})`
          );
          skipped++;
          continue;
        }

        if (result.wasNewGroup) {
          groupsCreated++;
        }
        if (result.wasNewLocation) {
          locationsCreated++;
        }

        if ((groupsCreated + locationsCreated) % 100 === 0) {
          console.log(
            `Progress: ${groupsCreated} groups, ${locationsCreated} locations`
          );
        }
      } catch (error) {
        console.error(
          `Error inserting restaurant: ${record['BUSINESS NAME']}`,
          error
        );
        skipped++;
      }
    }

    console.log('\n=== Ingestion Complete ===');
    console.log(`Total restaurants in CSV: ${records.length}`);
    console.log(`Groups created: ${groupsCreated}`);
    console.log(`Locations created: ${locationsCreated}`);
    console.log(`Skipped: ${skipped}`);
  } catch (error) {
    console.error('Error ingesting restaurants:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

ingestRestaurantLocationsAndGroups()
  .then(() => {
    console.log(
      'Restaurant location and group ingestion completed successfully'
    );
    process.exit(0);
  })
  .catch((error) => {
    console.error('Restaurant ingestion failed:', error);
    process.exit(1);
  });
