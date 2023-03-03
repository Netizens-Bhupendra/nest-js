// import { ConnectionOptions } from 'typeorm';
import { Logger } from '@nestjs/common';
import { join } from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

// You can load you .env file here synchronously using dotenv package (not installed here),
import * as dotenv from 'dotenv';
import * as fs from 'fs';
// const environment = process.env.NODE_ENV || 'development';
const env: any = dotenv.parse(fs.readFileSync(`.env`));
// You can also make a singleton service that load and expose the .env file content.
// ...

// Check typeORM documentation for more information.
const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: env.POSTGRES_HOST,
  port: parseInt(env.POSTGRES_PORT, 10) || 5432,
  username: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DB,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],

  // We are using migrations, synchronize should be set to false.
  synchronize: false,

  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: true,
  logging: true,
  logger: 'file',

  // Allow both start:prod and start:dev to use migrations
  // __dirname is either dist or src folder, meaning either
  // the compiled js in prod or the ts in dev.
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    // Location of migration should be inside src folder
    // to be compiled into dist/ folder.
    migrationsDir: join(__dirname, 'migrations'),
    entitiesDir: join(__dirname, '../**/*.entity{.ts,.js}'),
  },
};

// if (config) {
//   Logger.debug(config);
// }

export = config;
