import { Knex } from "knex";

const tableName = 'user';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.hasTable(tableName) &&
  knex.schema.createTable(
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
      table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(tableName);
}
