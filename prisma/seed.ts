import { prisma } from '.';
import { upsertPermissions, upsertDefaultUser, upsertMissions } from './seeds';

const main = async () => {
  await upsertMissions();
  await upsertPermissions();
  await upsertDefaultUser();
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    // eslint-disable-next-line no-console
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
