import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function cleanupRestaurantExtractions() {
  console.log('🔍 Fetching all RestaurantExtraction records...');

  const extractions = await prisma.restaurantExtraction.findMany({
    select: {
      id: true,
      restaurantsMentioned: true,
      primaryRestaurant: true,
      dishesMentioned: true,
    },
  });

  console.log(`📊 Found ${extractions.length} extractions to process`);

  let updatedCount = 0;

  for (const extraction of extractions) {
    const updates: any = {};

    // 1. Clean restaurantsMentioned
    if (
      extraction.restaurantsMentioned === '' ||
      extraction.restaurantsMentioned === 'NONE'
    ) {
      updates.restaurantsMentioned = null;
    } else if (extraction.restaurantsMentioned?.includes(', ')) {
      // Replace ", " with ","
      updates.restaurantsMentioned = extraction.restaurantsMentioned.replace(/, /g, ',');
    }

    // 2. Clean primaryRestaurant
    if (
      extraction.primaryRestaurant === '' ||
      extraction.primaryRestaurant === 'NONE'
    ) {
      updates.primaryRestaurant = null;
    }

    // 3. Clean dishesMentioned
    if (
      extraction.dishesMentioned === '' ||
      extraction.dishesMentioned === 'NONE'
    ) {
      updates.dishesMentioned = null;
    } else if (extraction.dishesMentioned?.includes(', ')) {
      // Replace ", " with ","
      updates.dishesMentioned = extraction.dishesMentioned.replace(/, /g, ',');
    }

    // Only update if there are changes
    if (Object.keys(updates).length > 0) {
      await prisma.restaurantExtraction.update({
        where: { id: extraction.id },
        data: updates,
      });

      console.log(`✅ Updated extraction ${extraction.id}: ${Object.keys(updates).join(', ')}`);
      updatedCount++;
    }
  }

  console.log(`\n✨ Complete! Updated ${updatedCount} extractions`);
}

cleanupRestaurantExtractions()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
