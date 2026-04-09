import { MikroORM } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';
import 'dotenv/config';

void (async () => {
  const orm = await MikroORM.init({
    extensions: [Migrator],
    clientUrl: process.env.DATABASE_URL,
    entities: ['./dist/database/entities/*.js'],
    migrations: {
      path: './dist/database/migrations',
    },
  });

  await orm.migrator.up();
  await orm.close(true);
})();
