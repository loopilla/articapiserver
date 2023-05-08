import { Knex } from 'knex';
import * as dotenv from 'dotenv';
import { AuthUtils } from '../../src/utils/authUtils';
dotenv.config();

export async function seed(knex: Knex): Promise<void> {
    const defaultPassword = process.env.DEFAULT_USER_PWD;
    // Inserts seed entries
    await knex('users').insert([
      {
        ...AuthUtils.getSaltAndHash(defaultPassword),
        email: 'user1@email.com',
      },
      {
        ...AuthUtils.getSaltAndHash(defaultPassword),
        email: 'user2@email.com',
        },
    ]);
};
