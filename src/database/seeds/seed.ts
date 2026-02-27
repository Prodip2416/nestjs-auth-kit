import AppDataSource from '../data-source';
import { seedUsers } from './users.seed';

async function run() {
  await AppDataSource.initialize();
  try {
    await seedUsers(AppDataSource);

    console.log('Seeding complete');
  } finally {
    await AppDataSource.destroy();
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
