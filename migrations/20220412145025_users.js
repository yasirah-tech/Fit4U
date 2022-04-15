/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("id").primary();
    table.string("email", 255).notNullable();
    table.string("username", 255).notNullable();
    table.string("password").notNullable();
    table.string("first_name", 20);
    table.string("last_name", 20);
    table.string("location", 40);
    table.string("sports", 20);
    table.string("bio", 255);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
