import { Knex } from 'knex';
import * as dotenv from 'dotenv';
dotenv.config()

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'mysql',
    connection: {
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT),
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './db/migration',
    },
    seeds: {
      directory: './db/seeds',
    },
  },
};

module.exports = config;
