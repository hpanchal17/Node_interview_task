import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as process from 'process';
import * as path from 'path';

export const AppDataSource = new DataSource({
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT
    ? parseInt(process.env.DATABASE_PORT, 10)
    : 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
  dropSchema: false,
  keepConnectionAlive: true,
  entities: [
    path.join(__dirname, '/../../../shareable/src/**/*.entity{.ts,.js}'),
  ],
  migrations: [
    path.join(
      __dirname,
      '/../../../shareable/src/database/migrations/**/*{.ts,.js}',
    ),
  ],
  cli: {
    entitiesDir: 'libs',
    migrationsDir: 'libs/shareable/src/database/migrations',
  },
} as DataSourceOptions);
