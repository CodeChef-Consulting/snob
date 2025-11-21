import { config } from '@dotenvx/dotenvx';
config({ path: ['../../.env'] });

import { PrismaClient } from '@repo/db';
const prisma = new PrismaClient();

async function deleteRestaurantGroups() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage: pnpm tsx src/scripts/one-off/deleteRestaurantGroups.ts <id1> <id2> ...');
    console.log('Example: pnpm tsx src/scripts/one-off/deleteRestaurantGroups.ts 123 456 789');
    await prisma.$disconnect();
    process.exit(1);
  }

  const groupIds = args.map(id => parseInt(id, 10)).filter(id => !isNaN(id));

  if (groupIds.length === 0) {
    console.log('❌ No valid group IDs provided');
    await prisma.$disconnect();
    process.exit(1);
  }

  console.log(`🗑️  Deleting ${groupIds.length} RestaurantGroup(s): ${groupIds.join(', ')}\n`);

  // Fetch the groups to show what will be deleted
  const groups = await prisma.restaurantGroup.findMany({
    where: {
      id: {
        in: groupIds,
      },
    },
    include: {
      locations: true,
    },
  });

  if (groups.length === 0) {
    console.log('❌ No groups found with the provided IDs');
    await prisma.$disconnect();
    return;
  }

  console.log('Found groups:');
  for (const group of groups) {
    console.log(`  [ID: ${group.id}] ${group.name} - ${group.locations.length} location(s)`);
  }

  const notFoundIds = groupIds.filter(id => !groups.some(g => g.id === id));
  if (notFoundIds.length > 0) {
    console.log(`\n⚠️  Warning: Group IDs not found: ${notFoundIds.join(', ')}`);
  }

  console.log('');

  // Delete each group (transactions will cascade delete locations and join table records)
  for (const group of groups) {
    try {
      await prisma.$transaction(async (tx) => {
        // Delete locations
        await tx.restaurantLocation.deleteMany({
          where: { groupId: group.id },
        });

        // Delete the group (this will cascade delete join table records)
        await tx.restaurantGroup.delete({
          where: { id: group.id },
        });
      });

      console.log(`✅ Deleted group [ID: ${group.id}] "${group.name}" with ${group.locations.length} location(s)`);
    } catch (error) {
      console.error(`❌ Failed to delete group [ID: ${group.id}] "${group.name}":`, error);
    }
  }

  console.log(`\n✨ Deletion complete!`);
  await prisma.$disconnect();
}

deleteRestaurantGroups();
