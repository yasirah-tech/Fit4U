/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: 1, first_name: 'matt', last_name: 'tan', password: 'pass', dob: '1999-05-07', sports: 'handball', weight: 210, height: 152, bio: 'Hello I am Matt'},
  ]);
};
