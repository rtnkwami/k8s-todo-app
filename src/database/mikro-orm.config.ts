import { Migrator } from '@mikro-orm/migrations';
import { defineConfig } from '@mikro-orm/postgresql';
import 'dotenv/config';

export default defineConfig({
  entities: ['./dist/database/entities'],
  entitiesTs: ['./src/database/entities'],
  migrations: {
    path: './dist/database/migrations',
    pathTs: './src/database/migrations',
  },
  clientUrl: process.env.DATABASE_URL,
  extensions: [Migrator],
});
