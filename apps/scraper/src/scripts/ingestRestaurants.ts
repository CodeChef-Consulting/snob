import { PrismaClient } from '@repo/db';
import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse/sync';
import { startCase, toLower } from 'lodash';

const prisma = new PrismaClient();

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

async function ingestRestaurants() {
  try {
    const csvPath = path.join(process.cwd(), 'Restaurants_in_LA_20251004.csv');
    const fileContent = fs.readFileSync(csvPath, 'utf-8');

    const records: RestaurantCSVRow[] = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });

    console.log(`Found ${records.length} restaurants to ingest`);

    let inserted = 0;
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

        if (locationMatch) {
          metadata.coordinates = {
            longitude: parseFloat(locationMatch[1]),
            latitude: parseFloat(locationMatch[2]),
          };
        }
        const existingRestaurant = await prisma.restaurant.findFirst({
          where: { name: startCase(toLower(name!)) },
        });

        if (existingRestaurant) {
          console.log(`Restaurant already exists: ${name}`);
          skipped++;
          continue;
        }

        await prisma.restaurant.create({
          data: {
            name: name ? startCase(toLower(name)) : '',
            address: record['STREET ADDRESS']
              ? startCase(toLower(record['STREET ADDRESS']))
              : null,
            city: record['CITY'] ? startCase(toLower(record['CITY'])) : null,
            state: 'CA', // All restaurants are in California (Los Angeles)
            zipCode: record['ZIP CODE'] || null,
            metadata,
          },
        });

        inserted++;

        if (inserted % 100 === 0) {
          console.log(`Progress: ${inserted} restaurants inserted`);
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
    console.log(`Successfully inserted: ${inserted}`);
    console.log(`Skipped: ${skipped}`);
  } catch (error) {
    console.error('Error ingesting restaurants:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

ingestRestaurants()
  .then(() => {
    console.log('Restaurant ingestion completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Restaurant ingestion failed:', error);
    process.exit(1);
  });
