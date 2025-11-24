import { config } from '@dotenvx/dotenvx';
import { PrismaClient } from '@repo/db';

config({ path: ['../../.env'] });

const prisma = new PrismaClient();

/**
 * Split a RestaurantLocation from its current group and create a new group for it.
 * Usage: tsx src/scripts/splitLocationFromGroup.ts <locationId> [newGroupName]
 *
 * If newGroupName is not provided, uses the location's name as the group name.
 */
async function splitLocationFromGroup() {
  const locationId = parseInt(process.argv[2], 10);
  const newGroupName = process.argv[3];

  if (isNaN(locationId)) {
    console.error('Usage: tsx src/scripts/splitLocationFromGroup.ts <locationId> [newGroupName]');
    console.error('  locationId: ID of the RestaurantLocation to split');
    console.error('  newGroupName: Optional name for the new group (defaults to location name)');
    process.exit(1);
  }

  try {
    // Fetch the location with its current group
    const location = await prisma.restaurantLocation.findUnique({
      where: { id: locationId },
      include: {
        group: {
          include: {
            locations: true,
          },
        },
      },
    });

    if (!location) {
      console.error(`Location with ID ${locationId} not found`);
      process.exit(1);
    }

    console.log(`\nFound location: "${location.name}" (ID: ${location.id})`);
    console.log(`Current group: "${location.group.name}" (ID: ${location.group.id})`);
    console.log(`Group has ${location.group.locations.length} location(s)`);

    if (location.group.locations.length === 1) {
      console.log('\n⚠️  This location is the only one in its group. No need to split.');
      process.exit(0);
    }

    // Determine the new group name
    const groupName = newGroupName || location.name;

    // Check if a group with this name already exists
    const existingGroup = await prisma.restaurantGroup.findUnique({
      where: { name: groupName },
    });

    if (existingGroup) {
      console.error(`\n❌ A group named "${groupName}" already exists (ID: ${existingGroup.id})`);
      console.error('Please provide a different group name.');
      process.exit(1);
    }

    // Create new group
    console.log(`\nCreating new group: "${groupName}"...`);
    const newGroup = await prisma.restaurantGroup.create({
      data: {
        name: groupName,
      },
    });
    console.log(`✅ Created new group (ID: ${newGroup.id})`);

    // Update location to point to new group
    console.log(`\nMoving location to new group...`);
    await prisma.restaurantLocation.update({
      where: { id: locationId },
      data: { groupId: newGroup.id },
    });
    console.log(`✅ Location "${location.name}" moved to group "${groupName}"`);

    // Log final state
    const oldGroupUpdated = await prisma.restaurantGroup.findUnique({
      where: { id: location.group.id },
      include: { locations: true },
    });

    console.log(`\n=== Summary ===`);
    console.log(`Old group "${location.group.name}" now has ${oldGroupUpdated?.locations.length} location(s)`);
    console.log(`New group "${groupName}" (ID: ${newGroup.id}) has 1 location`);

  } catch (error) {
    console.error('Error splitting location:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

splitLocationFromGroup()
  .then(() => {
    console.log('\nDone!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Failed:', error);
    process.exit(1);
  });
