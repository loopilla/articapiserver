import { Knex } from "knex";

const tableName = 'users';

export async function up(knex: Knex): Promise<void> {
  const hasTable = await knex.schema.hasTable(tableName);

  !hasTable && await knex.schema.createTable(
    tableName,
    (table) => {
      table
        .uuid('id')
        .notNullable()
        .unique()
        .defaultTo(knex.raw('(UUID())'));
      table
        .string('email')
        .notNullable();
      table
        .string('password')
        .notNullable();
      table
        .string('salt')
        .notNullable();

      table.timestamps(true, true);

      table
        .timestamp('deletedAt')
        .nullable();
    });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(tableName);
}
