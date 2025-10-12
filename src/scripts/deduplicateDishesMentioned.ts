import { PrismaClient } from '@prisma/client';
import _ from 'lodash';

const prisma = new PrismaClient();

async function deduplicateDishesMentioned() {
  console.log('🔍 Fetching all RestaurantExtraction records with dishesMentioned...');

  const extractions = await prisma.restaurantExtraction.findMany({
    select: {
      id: true,
      dishesMentioned: true,
    },
  });

  console.log(`📊 Found ${extractions.length} extractions to process`);

  let updatedCount = 0;

  for (const extraction of extractions) {
    if (
      !extraction.dishesMentioned ||
      extraction.dishesMentioned === 'NONE' ||
      extraction.dishesMentioned === ''
    ) {
      continue;
    }

    // Split by comma, trim, deduplicate (case-insensitive), rejoin
    const dishes = extraction.dishesMentioned
      .split(',')
      .map((dish) => dish.trim())
      .filter((dish) => dish.length > 0);

    const dedupedDishes = _.uniqBy(dishes, (dish) => dish.toLowerCase());

    // Only update if there were duplicates
    if (dedupedDishes.length !== dishes.length) {
      const newDishesMentioned = dedupedDishes.join(', ');

      await prisma.restaurantExtraction.update({
        where: { id: extraction.id },
        data: { dishesMentioned: newDishesMentioned },
      });

      console.log(`✅ Updated extraction ${extraction.id}: ${dishes.length} → ${dedupedDishes.length} dishes`);
      updatedCount++;
    }
  }

  console.log(`\n✨ Complete! Updated ${updatedCount} extractions with duplicates`);
}

deduplicateDishesMentioned()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
