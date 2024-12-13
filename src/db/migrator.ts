import { readdirSync } from 'fs';
import path from 'path';
import { db } from './conn';

const migrationsPath = path.join(__dirname, './migrations');

const migrations = readdirSync(migrationsPath).map((file) => ({
  name: path.basename(file, path.extname(file)),
  module: require(path.join(migrationsPath, file)),
}));

async function migrate(direction: 'up' | 'down') {
  for (const migration of migrations) {
    const name = migration.name;
    if (direction === 'up') {
      const executed = await db.selectFrom('migrations').select('name').where('name', '=', name).execute();

      if (executed.length > 0) {
        console.log(`Skipping already applied migration: ${name}`);
        continue;
      }
      await migration.module[direction](db);
      await db.insertInto('migrations').values({ name, executedAt: new Date() }).execute();
    } else {
      await migration.module[direction](db);
      await db.deleteFrom('migrations').where('name', '=', name).execute();
    }
  }
}

const direction = process.argv[2];
if (direction === 'up' || direction === 'down') {
  try {
    migrate(direction);
  } catch (error) {
    console.error(`Migration faile: ${error}`);
  }
}
