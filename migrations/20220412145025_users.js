/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('users', function(table) {
        table.increments('id');
        table.string('first_name', 20 ).notNullable();
        table.string('last_name', 20).notNullable();
        table.string('password').notNullable();
        table.date('dob').notNullable();
        table.string('sports', 20)
        table.float('weight');
        table.float('height');
        table.string('bio', 255);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
