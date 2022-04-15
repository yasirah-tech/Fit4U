/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("comments", function (table) {
    table.increments("id").primary();
    table.string("content", 255).notNullable();
    table.integer("likes");
    table.integer("post_id").unsigned().notNullable();
    table.integer("user_id").unsigned().notNullable();
    table.foreign("post_id").references("id").inTable("posts");
    table.foreign("user_id").references("id").inTable("users");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("comments");
};
