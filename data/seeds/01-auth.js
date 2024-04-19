/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: 1, username: 'coty', password: 'footlong'},
    {id: 2, username: 'sydney', password: 'footlong'},
    {id: 3, username: 'mom', password: 'footlong'}
  ]);
};
