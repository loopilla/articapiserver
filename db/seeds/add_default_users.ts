import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    
    // await knex('user').del();

    // Inserts seed entries
    await knex('users').insert([
        {
            email: 'user1@email.com',
            password: 'password',
        },
        {
            email: 'user2@email.com',
            password: 'password',
        },
    ]);
};
