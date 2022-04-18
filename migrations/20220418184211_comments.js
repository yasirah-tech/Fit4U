/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('comments', function(table) {
        table.increments('commentId').primary();
        table.string('content', 255).notNullable();
        table.integer('post_id').references("postId").inTable("posts");
        table.integer('user_id').references('id').inTable('users');
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("comments");
};
