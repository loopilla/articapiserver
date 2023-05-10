import { Knex } from 'knex';

export const tableName = 'purchase';

export async function up(knex: Knex): Promise<void> {
  const hasTable = await knex.schema.hasTable(tableName);

  !hasTable && await knex.schema.createTable(
    tableName,
    (table) => {
      table
        .uuid('id')
        .notNullable()
        .unique()
        .primary()
        .defaultTo(knex.raw('(UUID())'));
      table
        .uuid('user_id')
        .notNullable();
      table
        .uuid('artwork_id')
        .notNullable();

      table.timestamps(true, true);

      table
        .timestamp('deleted_at')
        .nullable();
    });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(tableName);
}

